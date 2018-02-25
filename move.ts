import { Regexer } from "./src/models/Regexer";

export function move() {
    let r = new Regexer(/Formula\.1\.2017x(\d{2})\.([A-Za-z\w\-]+)\.(Race|Qualifying)\./);
    try{
        r.runOnDirectory("../", "../Formula 1/Season 2017/");
    }catch(e){  
        console.log(e.message);
    }
}

move();