/** Options for `[[LineReader]]` */
export interface LineReaderOpts {
    /** end of line. default `eol: /\r?\n/` */
    eol?: RegExp | string | null;
    /** current reader index. Initial value `index: 0`. */
    index?: number;
}

/** Split-at and read-by lines
 * It creates the lines by a specified splitting pattern or string
 * See [[`LineReaderOpts`]].
 * @param data - The file as a string or string array, etc.
 * For string array it doesn't do any further splitting,
 * but it has all the functionality.
 * @param options - Default `{ eol:'\n', index:0 }`
 */
export class LineReader {
    /** end of line as in `options.eol` */
    public eol: RegExp | string | null;
    /** array length, number of lines */
    public length: number;
    /** Current index in array. @see [[@link `options.index`]]. */
    public index: number;
    /** stores specific index to easily go back */
    private _record: number;
    /** lines splitted at `options.eol` */
    private _lines: string[];

    public constructor(data: string | string[], options: LineReaderOpts = {}) {
        /*defaults in case user doesn't pass any*/
        const { eol = /\r?\n/, index = 0 } = options;

        const isArray = Array.isArray(data);

        if (!isArray && typeof data !== 'string') {
            throw new TypeError('Data must be string or array of strings');
        }

        this.eol = isArray ? null : eol;
        this.index = index;
        this._record = 0;
        this._lines = isArray ? data : data.split(this.eol as string | RegExp);
        this.length = this._lines.length;
    }
    /**
     * @returns splitted string as an array
     */
    public getLines(): string[] {
        return this._lines;
    }

    /**
     * reads line **at** index and updates index +1
     * @returns the line at index.
     */
    public readLine(): string {
        return this._lines[this.index++];
    }

    /** Reads `n` lines.
     * Example
     * ```
     * const letters = new LineReader("abcde", {eol:""})
     * const nol = Math.floor(letters.length/2) // half -1, or half (even length)
     * const [firstHalf, secondHalf] = [letters.readLines(nol), letters.skip().readLines(nol)]
     * console.log(letters.index);//5
     * const outbound = letters.readLine() //error, there is no index 5 in letters.
     * ```
     * @param n - number of lines to read
     * @returns selectedLines - subset of lines
     * **Updates index**.
     */
    public readLines(n = 1): string[] {
        if (n === 1) return [this.readLine()];

        const total = this.length;
        const read = this.index;
        const left = total - read;

        if (n > left) {
            throw new RangeError(
                `n ${n} is outside the array's boundary ${left}`
            );
        }

        /* returns n lines from index to index+n-1 */
        const selectedLines = this._lines.slice(this.index, (this.index += n));
        return selectedLines;
    }

    /**
     * Reads lines to desired index **exclusive**
     * @param to - integer, end index exclusive.
     * If **to** is negative it reads **to** units back, and updates index to new position.
     * By default it is `this.length` (end of array).
     * @return array from current position **to** indicated.
     */
    public readTo(to: number = this.length): string[] {
        const resultArray = this._lines.slice(this.index, this.index + to);
        this.index += to;
        return resultArray;
    }

    /**
     * Skips n lines
     * @param n -  number of lines to skip.
     * If `n=1` skips current line
     * example `lines.skip(2)` will skip reading the current line and the next one.
     * @returns this
     */
    public skip(n = 1): this {
        this.index += n;
        return this;
    }

    /**
     * moves to specific index in the array
     * @returns this
     */
    public seek(newIndex: number = this.index): this {
        this.index = newIndex;
        return this;
    }

    /**
     * records index so we can come back later
     * @returns this
     */
    public record(): this {
        this._record = this.index;
        return this;
    }

    /**
     * moves to recorded index
     * @returns this
     */
    public rewind(): this {
        this.index = this._record;
        return this;
    }

    /**
     * Moves back to the beginning, `index=0`
     * @returns this
     */
    public reset(): this {
        this.index = 0;
        return this;
    }
}
