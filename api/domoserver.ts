import { Response } from "https://deno.land/std@0.89.0/http/server.ts";

let retour: Response = {};

export function domoserver(data: any) {

    let json = JSON.parse(Deno.readTextFileSync('./json/1.json'));
    let i = data.numOfModule - 1;
    if (json[i].activator.type == "HTTP") {
        if (json[i].type == "slider") {
            if (data.state) {
                console.log("Activé " + json[i].name + " lancer " + json[i].action.data + " sur " + json[i].action.type);
                fetch(json[i].action.data, { method: "GET" });
            }
        } else {
            if (data.state) {
                console.log("Activé " + json[i].name + " lancer " + json[i].action.active + " sur " + json[i].action.type);
                fetch(json[i].action.active, { method: "GET" })
            } else {
                console.log("Désactivé " + json[i].name + " lancer " + json[i].action.unactive + " sur " + json[i].action.type)
                fetch(json[i].action.unactive, { method: "GET" })
            }
        }
    }

    retour.body = '';

    return retour;
}