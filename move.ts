import { Regexer } from "./src/models/Regexer";

export function move() {
    let r = new Regexer();
    try{
        r.runOnDirectory("../");
    }catch(e){
        console.log(e.Message);
    }
}

move();