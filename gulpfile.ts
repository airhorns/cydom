import gulp from "gulp";
import replace from "gulp-replace";
import typescript from "gulp-typescript";
import merge from "merge2";
import { spawn } from "promisify-child-process";
const CYPRESS_TAG = "v4.0.2";

const system = async (command: string) => {
  return await spawn(command, { stdio: "inherit", shell: true });
};

export async function clone() {
  await system(
    `rm -rf stage && mkdir stage && git clone --branch ${CYPRESS_TAG} --depth 1 https://github.com/cypress-io/cypress.git stage/cypress`
  );

  await system(`rm -rf src/imported && mv stage/cypress/packages/driver/src/dom src/imported`);
}

export function compile() {
  const tsResult = gulp
    .src(["src/**/*"])
    .pipe(replace("../config/lodash", "lodash"))
    .pipe(replace("../cypress/utils.coffee", "../cypress_utils"))
    .pipe(replace("return $.contains(doc, el)", "return $.contains(doc as any, el)"))
    .pipe(replace("Cypress.browser.family", "String('chrome')"))
    .pipe(replace('Cypress.isBrowser("firefox")', "!!false"))
    .pipe(
      typescript({
        target: "es5",
        module: "commonjs",
        allowJs: true,
        noImplicitAny: false,
        noImplicitThis: false,
        strictFunctionTypes: true,
        preserveWatchOutput: true,
        sourceMap: true,
        importHelpers: true,
        strictNullChecks: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        skipLibCheck: true,
        noImplicitReturns: true,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        noErrorTruncation: true,
        declaration: true
      })
    );

  return merge([tsResult.dts.pipe(gulp.dest("dist/")), tsResult.js.pipe(gulp.dest("dist/"))]);
}

exports.default = gulp.series(clone, compile);
