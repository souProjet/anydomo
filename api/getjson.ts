import { Response } from "https://deno.land/std@0.89.0/http/server.ts";

let retour: Response = {};

export async function getJSON() {
    let json = Deno.readTextFileSync('./json/1.json');
    retour.body = json;

    return retour;
}