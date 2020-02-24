# cydom

Cypress' DOM helpers for everyone else!

## Usage

```javascript
const { isVisible } = require("cydom");
// or
import { isVisible } from "cydom";
```

Includes what Typescript definitions Cypress has as well!

Refer to https://docs.cypress.io/api/cypress-api/dom.html for documentation.

## How

A nasty build script that extracts the DOM helpers from Cypress' monorepo and fiddles a bit to get them to import fine outside that context

## Why

Cause they are fantastic! Cypress has put an immense amount of work into identifying all the little corner cases that render tests flakey. We can stand on their very high shoulders!

## Thanks

Thanks to Cypress for publishing their code at all and for MIT licensing it so this kind of thing is possible. <3
