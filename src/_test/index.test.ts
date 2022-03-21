import { readFileSync as rfs } from "fs";
import { join } from "path";

import { LineReader } from "../index";

describe("Check functionality", ()=>{

    it("line read random file from program", () => {

        const testFileAsString = rfs(join(__dirname, "_data", "test.mpt")).toString("utf8");

        const lines = new LineReader(testFileAsString)

        const firstLine = lines.readLine()
        
        //return "this" functions
        // record
        expect(lines.record().index).toBe(1)//index 1
        //skip
        expect(lines.skip().index).toBe(2)//index 2
        expect(lines.skip(3).index).toBe(5)//index 2
        //rewind
        expect(lines.rewind().index).toBe(1)//index 2
        //seek
        expect(lines.seek(5).index).toBe(5)
        expect(lines.seek().index).toBe(5)
        //reset
        expect(lines.reset().readLines(1)).toStrictEqual([firstLine])
        
        //readLine()
        expect(firstLine).toBe("EC-Lab ASCII FILE");
        //read several lines
        const readFiveLines = lines.reset().readLines(5)
        expect(readFiveLines).toHaveLength(5)
        lines.readLines();
        expect(lines.index).toBe(6)
        const read5Lines = lines.reset().readTo(5) 
        expect(read5Lines).toHaveLength(5)
        expect(lines.reset().readTo().length).toBe(lines.length)

        // @ts-expect-error 
        expect(()=>new LineReader(5)).toThrow("Data must be string");
        })
    //second test
    it("read a <name>:<surname> pairs", () => {

        const names = "linda:nuen\njake:black";

        const lines = new LineReader(names, {index:0, eol:"\n"})

        expect(lines.readLine().split(":")).toStrictEqual(["linda","nuen"])        
        expect(()=>lines.readLines(100)).toThrow("n 100 is outside the")
        expect(lines.getLines()).toHaveLength(2)
        })
    //pass array
    it("read an array", () => {

        const names = ["linda", "nuen","jake:black"];

        const lines = new LineReader(names, {eol:null})
        
        expect(lines.length).toBe(3)

        })
    
})
