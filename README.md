# line-reader
[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Reads lines from a file or a string.

`myString.split(pattern)` may be annoying at some use cases, like tracking the index.

This class keeps track of the current index (sometimes called offset), and provides some helper methods.

## Installation
```
npm i linereader
```

## Examples

* Splitting and reading a string
```javascript
import {LineReader} from "line-reader";
const myString = "hello\n world\n new string\n here";
let lines = new LineReader(myString);//does not touch original string

const firstLine = lines.readLine(); // hello
const secondLine = lines.readLine(); // world
const nextLines = lines.readLines(2); //["new string", "here"]

const index = lines.index; //3

const getArrayBackIfNeeded = lines.data;
```

* A file
```javascript
import {readFileSync as rfs} from "fs";
const myFile =  rfs("./path/to/file")
let lines = new LineReader(myFile)
lines.skip(10)//skip first 10 lines


while(this.lines.length > this.lines.index){
  const thisLine = lines.readLine()
  if(thisLine.substring(/^BODY/)) break
}

const bodyFirstLine = lines.readLine();
```


## License

This software is licensed under MIT.

[npm-image]: https://img.shields.io/npm/v/@santimir/line-reader.svg
[npm-url]: https://www.npmjs.com/package/@santimir/line-reader
[download-image]: https://img.shields.io/npm/dm/@santimir/line-reader.svg
[download-url]: https://www.npmjs.com/package/@santimir/line-reader
