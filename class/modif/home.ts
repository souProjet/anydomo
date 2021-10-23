export class home_func {
  async modif() {
    let temp = Deno.readTextFileSync("./home.html");
    let json = Deno.readTextFileSync('./json/1.json');
    temp = temp.replace(/<%=jsonmodule%>/g, json ? json : "{0:{},1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:''}");
    return temp;
  }
}
