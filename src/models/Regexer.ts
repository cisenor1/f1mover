import * as fs from "fs-extra";
import { Promise } from "bluebird";

export class Regexer {
    public static INVALID_DIRECTORY_ERROR: Error = new Error("Invalid Directory");
    private _regexp: RegExp;
    constructor(regex: RegExp) {
        this._regexp = regex;
    }

    public runOnDirectory(sourceDirectory: fs.PathLike, destDirectory:fs.PathLike): Promise<boolean> {
        if (!sourceDirectory) {
            throw Regexer.INVALID_DIRECTORY_ERROR;
        }
        if (!fs.existsSync(sourceDirectory)) {
            throw Regexer.INVALID_DIRECTORY_ERROR;
        }
        const folders = fs.readdirSync(sourceDirectory);
        return Promise.mapSeries(folders.filter((folder)=>!!folder.match(this._regexp)), (f: string, i, total) => {
            console.log("Processing folder " + f + " (folder " + (i + 1).toString() + " of " + total.toString() + ")");
            const results = f.match(this._regexp)
            if (!results) {
                return;
            }
            let number = results[1];
            let country = results[2];
            // Great Britain is spelled Great.Britain. Replace the . with a space.
            country = country.replace("."," ");
            const folderName = number + " - " + country;
            const category = results[3];

            let roundDir = destDirectory + folderName;
            if (!fs.existsSync(roundDir)) {
                fs.mkdirSync(roundDir);
            }

            let catDir = roundDir + "\\" + category;
            if (!fs.existsSync(catDir)) {
                fs.mkdirSync(catDir);
            }

            let files = fs.readdirSync(sourceDirectory + f);
            return Promise.mapSeries(files, (file, index, length) => {
                const src = sourceDirectory + f + "\\" + file;
                const dest = catDir + "\\" + file;
                console.log("Copying " + file + " to " + dest + " (" + (index + 1).toString() + " of " + length.toString() + ")");
                return fs.copy(src, dest);

            });
        }).return(true);
    }

    public getMatchNames(): string[] {
        return [];
    }

}