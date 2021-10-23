import { editJSON } from "./editjson.ts";
import { getJSON } from "./getjson.ts";
import { domoserver } from "./domoserver.ts";

let decoder = new TextDecoder("utf-8");

export class api {
  async traitement(req: any) {
    if (req.url.startsWith("/editjson")) {
      await this.editJSON_func(req);
    }else if(req.url.startsWith("/getjson")){
      await this.getJSON_func(req);
    }else if(req.url.startsWith("/domoserver")){
      await this.domoserver_func(req);
    }

  }
  private async editJSON_func(req: any) {
    const bodyJSON = JSON.parse(
      decoder.decode(await Deno.readAll(req.body))
    );
    let return_data_json = await editJSON(bodyJSON);
    req.respond(return_data_json);
  }
  private async getJSON_func(req: any){

    let return_data_json = await getJSON();

    req.respond(return_data_json);
  }
  private async domoserver_func(req: any){
    const bodyDomoserver = JSON.parse(
      decoder.decode(await Deno.readAll(req.body))
    );
    let return_domoserver = await domoserver(bodyDomoserver);
    req.respond(return_domoserver);
  }

}
