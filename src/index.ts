import { ensureString } from "ensure-string";
/** @module
 */

/** data input values for the LineReader. 
 * You get ArrayBuffer from `fs.readFileSync` for example. 
 */
export type TextData = ArrayBuffer|Buffer|string;

/** Options for the LineReader class */
export interface LineReaderOpts {
 /** end of line, @default /\r?\n/ */
  eol?: RegExp | string;
 /** buffer index, @default 0 */
  index?: number;
  /** specify encoding when it is not utf8 */
  encoding?:string;
}
/** Splits strings at specified eol. 
 * @param data - The file as a string,  ArrayBuffer, etc.
 * @param [options] - As an object. @default `{eol:'\n', offset:0}`
 * @param [options.eol] - End of line as string. @default `'\n'`
 * @param [options.index] - Array's index where to start reading. @default `0`
 * @param [options.encoding] - text encoding
 */
export class LineReader {
  /** Array of lines splitted at `options.eol` */
  public lines: string[];
  /** Number of lines */
  public length: number;
  /** where to start reading lines. See `options.index`. */
  public index: number;
  /** end of line as in `options.eol` */
  public eol: RegExp|string;

  public constructor(data: TextData, options: LineReaderOpts = {}) {
    /* defaults */
    const { eol = /\r?\n/, index = 0, encoding } = options;
    this.eol = eol;
    this.index = index;
    if(encoding) {
      this.lines = ensureString(data, {encoding:encoding}).split(this.eol);
    } else{
      this.lines = ensureString(data).split(this.eol); 
    }
    this.length = this.lines.length;
  }

  /**
   * returns line at index and updates index +1 
   */
  public readLine(): string {
    if (this.index >= this.length) {
      /* check index isn't off the possible indexs */
      throw new Error(
        `Last index is ${this.length - 1}. Current index ${this.index}.`,
      );
    }
    return this.lines[this.index++];
  }

  /**
   * returns current line + n-1 lines, updates index (+n)
   * `['line1','line2','line3']` at index 0, 
   * readLines(2) reads line1 & line2
   * @returns string array or (if n=0) a string. Internally it also **updates index**
   */
  public readLines(n: number): string[] | string {
    if(!Number.isInteger(n)){throw new Error(`expected argument n as an integer. 
      received: none|string|float.`)}
    const slots = this.lines.length - this.index - 1;
    if(n>slots){ throw new RangeError(`n ${n} is outside the array's scope ${slots}`) }
    if(n===0) return this.readLine();
    /* returns n lines from index to index+n-1 */
    const selectedLines = this.lines.slice(this.index, this.index + n);
    this.index += n;
    return selectedLines;
  }
  public skip(n:number):void{
    this.index+=n
  }
}

