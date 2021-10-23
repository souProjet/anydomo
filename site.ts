import { home_func } from "./class/modif/home.ts";
import { anydomo_func } from "./class/modif/anydomo.ts";

const home = new home_func();
const anydomo = new anydomo_func();

var statique = ["asset"];

export class site_principal {
  async traitement(req: any) {
    var array_url = req.url.split("/");
    var array_url = array_url.slice(1, array_url.length);
    if (statique.indexOf(array_url[0]) > -1) {
      var the_data, the_status;
      try {
        the_data = Deno.readFileSync("." + req.url);
        the_status = 200;
      } catch (err) {
        the_status = 404;
      }

      req.respond({ status: the_status, body: the_data });
    } else {
      var the_data2: string, the_status;
      if (req.url == "/anydomo") {
        the_data2 = await anydomo.modif();
      } else {
        req.url = "/";
        the_data2 = await home.modif();
      }

      var head = new Headers();
      head.set("Access-Control-Allow-Origin", "*");

      req.respond({ headers: head, status: the_status, body: the_data2 });
    }
  }
}
