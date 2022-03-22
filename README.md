# line-reader

[![version][npm-version-badge]][npm-url]
[![downloads][npm-downloads-badge]][npm-url]
[![coverage][coverage-badge]][coverage-url]
[![Continuous Integration][ci-badge]][ci-url]

Splits and Reads lines from a string or string array. 

If the argument is an array, it does not further split, just enables the functionality for reading lines.

* Class keeps track of the current index, 
* Performs string splitting using Regex or string characters
* A few of the helper methods: 
  * `readLine`, `readLines`, `readTo`, 
  * `getLines`, 
  * `skip`, `record`, `rewind`, `reset`

## Installation

```
npm i @santimir/line-reader
```

## Examples

```javascript
import { LineReader } from "@santimir/line-reader";

const myString = "hello\n world\n new string\n here";
const options = { eol:'\n', index:0 };//eol can also be regex
let lines = new LineReader(myString, options);

const example = lines.readLine() + lines.skip().readLine(); // "hello new string"
```

Or more complex..

```javascript
import { readFileSync as rfs } from "fs";
import { LineReader } from "@santimir/line-reader";

const myStuff = rfs("./path/to/file").toString("utf8");

let lines = new LineReader(myStuff);
lines.skip(10) //skip first 10 lines
     .record() //records current index
     .seek(3) //moves to index 3
     .rewind() //back to index 11
     .reset() //index 0
     .readLine() //returns first line

let switch = true;
while(switch){
  if(lines.readLine().startsWith("<body>")){
    switch=false
  }
}

const bodyFirstLine = lines.readLine();
```

* [Documentation][docs]
* [MIT Licensed][license]

[npm-version-badge]: https://img.shields.io/npm/v/@santimir/line-reader?label=main&color=blue
[npm-downloads-badge]: https://img.shields.io/npm/dm/@santimir/line-reader?logo=npm
[coverage-badge]: https://img.shields.io/codecov/c/github/santimirandarp/line-reader?color=green&logo=Codecov&logoColor=green
[ci-badge]: https://img.shields.io/github/workflow/status/santimirandarp/line-reader/Test%20and%20Release?logo=Github
[npm-url]: https://www.npmjs.com/package/@santimir/line-reader
[coverage-url]: https://app.codecov.io/gh/santimirandarp/line-reader/
[ci-url]: https://www.github.com/santimirandarp/line-reader/Test%20and%20Release
[docs]: https://santimirandarp.github.io/line-reader/docs
[license]: https://github.com/santimirandarp/line-reader/LICENSE.md
