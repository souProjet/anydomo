import { Response } from "https://deno.land/std@0.89.0/http/server.ts";

let retour: Response = {};

export async function editJSON(data: any) {
    Deno.writeTextFileSync('./json/1.json', JSON.stringify(data))

    retour.body = "ok";
    return retour;
}