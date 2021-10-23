import { serve } from "https://deno.land/std@0.88.0/http/server.ts";
import { site_principal } from "./site.ts";
import { api } from "./api/api.ts";
import { domoserver } from "./api/domoserver.ts";

let port = 8787;
const server = serve({ hostname: "0.0.0.0", port: port });
const traitement_site_principal = new site_principal();
const traitement_api = new api();

function isObjEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}
async function main(req: any) {
  try {
    if (req.method === "GET" || req.method === "POST") {
      var host = req.headers.get("host") || "Null";
      if (req.url.startsWith("/api/")) {
        req.url = req.url.replace('/api', '')
        host = "api.sou.local:8787";
      }
      switch (host) {
        case "sou.local:8787":
          let json = JSON.parse(Deno.readTextFileSync('./json/1.json'));
          if (req.url.indexOf("/server/") !== -1) {
            for (let i = 0; i < 9; i++) {
              if (!isObjEmpty(json[i])) {
                if (json[i].activator.type == "HTTP") {
                  if (json[i].type == "slider") {
                    if (json[i].action.operator == "<") {
                      if (parseInt(req.url.split("/server/")[1]) < json[i].action.number) {
                        await domoserver({ numOfModule: i + 1, state: 1 });
                      }
                    } else if (json[i].action.operator == "=") {
                      if (parseInt(req.url.split("/server/")[1]) == json[i].action.number) {
                        await domoserver({ numOfModule: i + 1, state: 1 });
                      }
                    } else if (json[i].action.operator == ">") {
                      if (parseInt(req.url.split("/server/")[1]) > json[i].action.number) {
                        await domoserver({ numOfModule: i + 1, state: 1 });
                      }
                    }
                  } else {
                    if (json[i].activator.active == req.url.split("/server/")[1]) {
                      await domoserver({ numOfModule: i + 1, state: 1 });
                    }
                    if (json[i].activator.unactive == req.url.split("/server/")[1]) {
                      await domoserver({ numOfModule: i + 1, state: 0 });
                    }
                  }
                }

              }
            }
            req.respond({ status: 200, body:Deno.readFileSync('./req.html') });
          } else {
            await traitement_site_principal.traitement(req);
          }
          break;

        case "api.sou.local:8787":
          await traitement_api.traitement(req);
          break;
        default:
          req.respond({ status: 418 });
      }
    } else {
      req.respond({ status: 418 });
    }
  } catch (err) {
    console.log(err);
  }
}

console.log(
  "[DIVERTIX] - Online -  Access at:  http://localhost On port " + port + "",
);

for await (const req of server) main(req);
