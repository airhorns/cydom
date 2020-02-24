import { has, result, keys } from "lodash";
const quotesRe = /('|")/g;

export default {
  escapeQuotes(text: string) {
    ("" + text).replace(quotesRe, "\\$1");
  },
  switchCase(value: any, casesObj: { [key: string]: any }, defaultKey = "default") {
    if (has(casesObj, value)) {
      return result(casesObj, value);
    }

    if (has(casesObj, defaultKey)) {
      return result(casesObj, defaultKey);
    }

    throw new Error(`The switch/case value: '${value}' did not match any cases: ${keys(casesObj).join(", ")}.`);
  }
};
