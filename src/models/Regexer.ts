import * as fs from "fs";

export class Regexer {
    public static INVALID_DIRECTORY_ERROR: Error = new Error("Invalid Directory");
    constructor() {

    }

    public runOnDirectory(directory: fs.PathLike): boolean {
        if (!directory){
            throw Regexer.INVALID_DIRECTORY_ERROR;
        } 
        if (!fs.existsSync(directory)){ 
            throw Regexer.INVALID_DIRECTORY_ERROR;
        }
        const folders = fs.readdirSync(directory);
        folders.forEach((f)=>console.log(f));
        return true;
    }

    public getMatchNames(): string[] {
        return [];
    }

}