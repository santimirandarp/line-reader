# line-reader
[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Reads lines from a file or a string.

* Class keeps track of the current index, 
* provides some helper methods.

## Installation

```
npm i @santimir/line-reader
```

## Examples

```javascript
import { LineReader } from "@santimir/line-reader";

const myString = "hello\n world\n new string\n here";
let lines = new LineReader(myString);

const firstLine = lines.readLine(); // hello
const secondLine = lines.readLine(); // world
```

Or more complex..

```javascript
import { readFileSync as rfs } from "fs";
import { LineReader } from "@santimir/line-reader";

const myFile = rfs("./path/to/file")
let lines = new LineReader(myFile)
lines.skip(10) //skip first 10 lines

while (this.lines.length > this.lines.index) {
  const thisLine = lines.readLine()
  if (thisLine.substring(/^body/i)) break
}

const bodyFirstLine = lines.readLine();
```

## [API Documentation][docs]
## [MIT Licensed][license]

[npm-image]: https://img.shields.io/npm/v/@santimir/line-reader.svg
[npm-url]: https://www.npmjs.com/package/@santimir/line-reader
[download-image]: https://img.shields.io/npm/dm/@santimir/line-reader.svg
[download-url]: https://www.npmjs.com/package/@santimir/line-reader
[license]: https://github.com/santimirandarp/line-reader/LICENSE.md
[docs]: https://santimirandarp.github.io/line-reader/
