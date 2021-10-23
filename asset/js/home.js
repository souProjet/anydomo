if (window.location.pathname !== "/") {
    window.location.href = "/";
}
setTimeout(function() {
    document.body.style.opacity = 1;
}, 100);

let settingPanel = document.querySelector('.configuration');
/*  play button  */

// function getJSON() {
//     fetch("/api/getjson", {
//         method: "POST",
//         body: {}
//     }).then(function(response) {
//         response.text().then(function(text) {
//             console.log(JSON.parse(text));
//         });
//     });
// }

function circlebtn(element) {
    element.querySelector('.pause').classList.toggle('visibility');
    element.querySelector('.play').classList.toggle('visibility');
    element.classList.toggle('shadow');
    element.parentNode.querySelector('.circle__back-1').classList.toggle('paused');
    element.parentNode.querySelector('.circle__back-2').classList.toggle('paused');
}
for (var i = 0; i < 5; i++) {
    document.querySelectorAll('.add')[i].style.top = 20 * i + "%";
}

function isObjEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}

function setModule() {
    for (let i = 0; i < 10; i++) {
        let id = jsonModule[i].id;

        if (i == 9) {
            setTimeout(function() {
                document.querySelector('.loader').style.opacity = "0";

                for (let n = 0; n < 9; n++) {
                    document.querySelectorAll('.case')[n].style.opacity = "1";
                    if (n < 4) {
                        document.querySelectorAll('.panel')[n].style.opacity = "1";
                    }
                }
            }, 500);
        } else {
            document.querySelector('.case' + (i + 1)).classList.add(id);

            if (!isObjEmpty(jsonModule[i])) {
                let numberofmodule = jsonModule[i].type;
                if (numberofmodule == "switch") {
                    document.querySelector('.case' + (i + 1)).innerHTML = `
            <ion-icon onclick="setting(this)" title="Paramètre" class="settings" name="settings"></ion-icon>
            <ion-icon onclick="deleteModule(this)" title="Supprimer" class="delete" name="trash"></ion-icon>
            
            <h2>` + jsonModule[i].name + `</h2>
            <div class="switch">
                <input id="switch-` + id + `" type="checkbox">
                <label for="switch-` + id + `"></label>
            </div>`;
                } else if (numberofmodule == "button") {
                    document.querySelector('.case' + (i + 1)).innerHTML = `
            <ion-icon onclick="setting(this)" title="Paramètre" class="settings" name="settings"></ion-icon>
            <ion-icon onclick="deleteModule(this)" title="Supprimer" class="delete" name="trash"></ion-icon>
            <h2 >` + jsonModule[i].name + `</h2>
            <div class="btn btn__secondary">
                <p>Bouton</p>
            </div>`;

                } else if (numberofmodule == "slider") {
                    document.querySelector('.case' + (i + 1)).innerHTML = `
            <ion-icon onclick="setting(this)" title="Paramètre" class="settings" name="settings"></ion-icon>
            <ion-icon onclick="deleteModule(this)" title="Supprimer" class="delete" name="trash"></ion-icon>
            <h2>` + jsonModule[i].name + `</h2>
            <div class="slider">
                <input value="` + (localStorage.getItem('slider' + (i + 1)) ? localStorage.getItem('slider' + (i + 1)) : 50) + `" oninput="changeslidervalue(this)" type="range" min="0" max="100">
                <p>` + (localStorage.getItem('slider' + (i + 1)) ? localStorage.getItem('slider' + (i + 1)) : 50) + `</p>
            </div>
            `;
                } else if (numberofmodule == "circle") {
                    document.querySelector('.case' + (i + 1)).innerHTML = `
            <ion-icon onclick="setting(this)" title="Paramètre" class="settings" name="settings"></ion-icon>
            <ion-icon onclick="deleteModule(this)" title="Supprimer" class="delete" name="trash"></ion-icon>
            <h2>` + jsonModule[i].name + `</h2>
            <div class="circle" style="margin-top:-25% !important;">
                <span onclick="circlebtn(this)" class="circle__btn">
                    <ion-icon class="pause visibility" name="pause"></ion-icon>
                    <ion-icon class="play visibility" name="play"></ion-icon>
                </span>
                <span class="circle__back-1 paused"></span>
                <span class="circle__back-2 paused"></span>
            </div>
            `;
                } else if (numberofmodule == "checkbox") {
                    document.querySelector('.case' + (i + 1)).innerHTML = `
            <ion-icon onclick="setting(this)" title="Paramètre" class="settings" name="settings"></ion-icon>
            <ion-icon onclick="deleteModule(this)" title="Supprimer" class="delete" name="trash"></ion-icon>
            <h2>` + jsonModule[i].name + `</h2>
            <div class="checkbox">
                <div class="checkbox_container">
                    <input id="checkbox-` + id + `" type="checkbox">
                    <label for="checkbox-` + id + `">
                        <i class="material-icons">done</i></label>
                </div>
            </div>
            `;
                }
            }
        }
    }
}
setModule();

function uniqueid() {
    // always start with a letter (for DOM friendlyness)
    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode = Math.floor((Math.random() * 42) + 48);
        if (ascicode < 58 || ascicode > 64) {
            // exclude all chars between : (58) and @ (64)
            idstr += String.fromCharCode(ascicode);
        }
    } while (idstr.length < 10);

    return (idstr);
}

function addmodule(element) {

    let numberofmodule = element.parentNode.classList[1].split('module')[1];
    let id = uniqueid();
    for (var i = 0; i < 9; i++) {
        if (isObjEmpty(jsonModule[i])) {
            document.querySelector('.case' + (i + 1)).classList.add(id);

            if (numberofmodule == 1) {
                document.querySelector('.case' + (i + 1)).innerHTML = `
                    <ion-icon onclick="setting(this)" title="Paramètre" class="settings" name="settings"></ion-icon>
                    <ion-icon onclick="deleteModule(this)" title="Supprimer" class="delete" name="trash"></ion-icon>

                    <h2 >Interrupteur</h2>
                    <div class="switch">
                        <input id="switch-` + id + `" type="checkbox">
                        <label for="switch-` + id + `"></label>
                    </div>`;

                jsonModule[i] = {
                    "id": id,
                    "name": "Interrupteur",
                    "type": "switch",
                    "activator": {
                        "type": "",
                        "numType": "",
                        "active": "",
                        "unactive": ""
                    },
                    "action": {
                        "type": "",
                        "numType": "",
                        "active": "",
                        "unactive": "",
                        "operator": "",
                        "number": "",
                        "data": ""
                    },
                    "serialport": {
                        "baud": "",
                        "port": ""
                    }
                }
                sendJSON();

            } else if (numberofmodule == 2) {
                document.querySelector('.case' + (i + 1)).innerHTML = `
                <ion-icon onclick="setting(this)" title="Paramètre" class="settings" name="settings"></ion-icon>
                <ion-icon onclick="deleteModule(this)" title="Supprimer" class="delete" name="trash"></ion-icon>
                <h2 >Bouton</h2>
                <div class="btn btn__secondary">
                    <p>Bouton</p>
                </div>`;

                jsonModule[i] = {
                    "id": id,
                    "name": "Bouton",
                    "type": "button",
                    "activator": {
                        "type": "",
                        "numType": "",
                        "active": "",
                        "unactive": ""
                    },
                    "action": {
                        "type": "",
                        "numType": "",
                        "active": "",
                        "unactive": "",
                        "operator": "",
                        "number": "",
                        "data": ""
                    },
                    "serialport": {
                        "baud": "",
                        "port": ""
                    }
                }
                sendJSON();

            } else if (numberofmodule == 3) {
                document.querySelector('.case' + (i + 1)).innerHTML = `
                <ion-icon onclick="setting(this)" title="Paramètre" class="settings" name="settings"></ion-icon>
                <ion-icon onclick="deleteModule(this)" title="Supprimer" class="delete" name="trash"></ion-icon>
                <h2 >Slider</h2>
                <div class="slider">
                    <input oninput="changeslidervalue(this)" type="range" min="0" max="100">
                    <p>50</p>
                </div>
                `;
                jsonModule[i] = {
                    "id": id,
                    "name": "Slider",
                    "type": "slider",
                    "activator": {
                        "type": "",
                        "numType": "",
                        "active": "",
                        "unactive": ""
                    },
                    "action": {
                        "type": "",
                        "numType": "",
                        "active": "",
                        "unactive": "",
                        "operator": "",
                        "number": "",
                        "data": ""
                    },
                    "serialport": {
                        "baud": "",
                        "port": ""
                    }
                }
                sendJSON();

            } else if (numberofmodule == 4) {
                document.querySelector('.case' + (i + 1)).innerHTML = `
                <ion-icon onclick="setting(this)" title="Paramètre" class="settings" name="settings"></ion-icon>
                <ion-icon onclick="deleteModule(this)" title="Supprimer" class="delete" name="trash"></ion-icon>
                <h2 >ON / OFF</h2>
                <div class="circle" style="margin-top:-25% !important;">
                    <span onclick="circlebtn(this)" class="circle__btn">
                        <ion-icon class="pause visibility" name="pause"></ion-icon>
                        <ion-icon class="play visibility" name="play"></ion-icon>
                    </span>
                    <span class="circle__back-1 paused"></span>
                    <span class="circle__back-2 paused"></span>
                </div>
                `;
                jsonModule[i] = {
                    "id": id,
                    "name": "ON / OFF",
                    "type": "circle",
                    "activator": {
                        "type": "",
                        "numType": "",
                        "active": "",
                        "unactive": ""
                    },
                    "action": {
                        "type": "",
                        "numType": "",
                        "active": "",
                        "unactive": "",
                        "operator": "",
                        "number": "",
                        "data": ""
                    },
                    "serialport": {
                        "baud": "",
                        "port": ""
                    }
                }
                sendJSON();

            } else if (numberofmodule == 5) {
                document.querySelector('.case' + (i + 1)).innerHTML = `
                <ion-icon onclick="setting(this)" title="Paramètre" class="settings" name="settings"></ion-icon>
                <ion-icon onclick="deleteModule(this)" title="Supprimer" class="delete" name="trash"></ion-icon>
                <h2 >Case à cocher</h2>
                <div class="checkbox">
                    <div class="checkbox_container">
                        <input id="checkbox-` + id + `" type="checkbox">
                        <label for="checkbox-` + id + `">
                            <i class="material-icons">done</i></label>
                    </div>
                </div>
                `;
                jsonModule[i] = {
                    "id": id,
                    "name": "Case à cocher",
                    "type": "checkbox",
                    "activator": {
                        "type": "",
                        "numType": "",
                        "active": "",
                        "unactive": ""
                    },
                    "action": {
                        "type": "",
                        "numType": "",
                        "active": "",
                        "unactive": "",
                        "operator": "",
                        "number": "",
                        "data": ""
                    },
                    "serialport": {
                        "baud": "",
                        "port": ""
                    }
                }
                sendJSON();


            }
            return false;
        }

    }

}

function deleteModule(element) {

    if (document.querySelector('.configuration').querySelector('h2').id == element.parentNode.classList[1].split('case')[1] - 1) {

        document.querySelector('.configuration').innerHTML = `
        <div class="panel panel1" >
            <h2>Configuration</h2>
        </div>
        <div class="panel panel2"></div>
        <div class="panel panel3"></div>
        <div class="panel panel4"></div>`;
        for (let n = 0; n < 4; n++) {
            document.querySelectorAll('.panel')[n].style.opacity = "1";
        }
        jsonModule[9] = '';
    }
    if (jsonModule[element.parentNode.classList[1].split('case')[1] - 1].type == "slider") {
        localStorage.removeItem('slider' + element.parentNode.classList[1].split('case')[1]);
    }
    element.parentNode.classList.remove(jsonModule[element.parentNode.classList[1].split('case')[1] - 1].id);
    delete jsonModule[element.parentNode.classList[1].split('case')[1] - 1];
    jsonModule[element.parentNode.classList[1].split('case')[1] - 1] = {};
    element.parentNode.innerHTML = '';



    sendJSON();

}

function changetitle(element) {
    jsonModule[document.querySelector('.' + element.parentNode.parentNode.id).classList[1].split('case')[1] - 1].name = element.innerText;
    document.querySelector('.' + element.parentNode.parentNode.id).querySelector('h2').innerText = element.innerText;
    sendJSON();
}

function setting(element) {
    let numModule = element.parentNode.classList[1].split('case')[1] - 1;
    jsonModule[9] = numModule + 1;
    let jsonElement = jsonModule[numModule]
    settingPanel.id = jsonElement.id;
    settingPanel.querySelector('.panel1').innerHTML = `<h2 id="` + numModule + `" oninput="changetitle(this)" contenteditable="true" >` + jsonElement.name + `</h2>`;
    if (jsonElement.type == "slider") {
        settingPanel.querySelector('.panel2').innerHTML = `
        <h2>Actionneur :</h2>
        <div  style="margin-top:15% !important; transform:translateY(-15%);" class="segmented-control">
        
        <input onclick="changetype(this);" type="radio" name="radio2" value="1" id="tab-1" ` + ((jsonModule[numModule].activator.type == "HTTP") ? "checked" : "") + `/>
        <label for="tab-1" class= "segmented-control__1">
            <p>HTTP</p></label>
        
        <input onclick="changetype(this);" type="radio" name="radio2" value="2" id="tab-2" ` + ((jsonModule[numModule].activator.type == "HTTP") ? "" : "checked") + `/>
        <label for="tab-2" class= "segmented-control__2">
            <p>Port série</p></label>
        
        
        <div class="segmented-control__color"></div>
        </div>
        `;
        settingPanel.querySelector('.panel3').innerHTML = `
        <h2>Action :</h2>
        <div class="segmented-control">
        
        <input onclick="changetype(this);" type="radio" name="radio3" value="3" id="tab-3" ` + ((jsonModule[numModule].action.type == "HTTP") ? "checked" : "") + `/>
        <label for="tab-3" class= "segmented-control__3">
            <p>HTTP</p></label>
        
        <input onclick="changetype(this);" type="radio" name="radio3" value="4" id="tab-4" ` + ((jsonModule[numModule].action.type == "HTTP") ? "" : "checked") + `/>
        <label for="tab-4" class= "segmented-control__4">
            <p>Port série</p></label>
        
        
        <div class="segmented-control__color"></div>
        </div>
        <h3>Si valeur 
            <select oninput="editjson(this)" class="select" >
                <option ` + ((jsonModule[numModule].action.operator == ">") ? "selected" : "") + `>></option>
                <option ` + ((jsonModule[numModule].action.operator == "=") ? "selected" : "") + `>=</option>
                <option ` + ((jsonModule[numModule].action.operator == "<") ? "selected" : "") + `><</option>
            </select> 
            <input oninput="editjson(this)" type="number" value="` + jsonModule[numModule].action.number + `" class="number" min="0" max="100" step="1">
            envoyé :<br><br><input oninput="editjson(this)" placeholder="/..." type="text" class="input" value="` + jsonModule[numModule].action.data + `">
        </h3>
        `;
        settingPanel.querySelector('.panel4').innerHTML = `
        <h2>Port série :</h2>

        <h3>Baudrat : <input placeholder="ex: 9600" oninput="editjson(this)" value="` + jsonModule[numModule].serialport.baud + `" type="text" class="input"></h3>
        <h3>Port : <input placeholder="ex: /dev/ttyUSB0" oninput="editjson(this)" value="` + jsonModule[numModule].serialport.port + `" type="text" class="input"></h3>
        `;
    } else {
        settingPanel.querySelector('.panel2').innerHTML = `
        <h2>Actionneur :</h2>
        <div class="segmented-control">
        
        <input onclick="changetype(this);" type="radio" name="radio2" value="1" id="tab-1" ` + ((jsonModule[numModule].activator.type == "HTTP") ? "checked" : "") + `/>
        <label for="tab-1" class= "segmented-control__1">
            <p>HTTP</p></label>
        
        <input onclick="changetype(this);" type="radio" name="radio2" value="2" id="tab-2" ` + ((jsonModule[numModule].activator.type == "HTTP") ? "" : "checked") + `/>
        <label for="tab-2" class= "segmented-control__2">
            <p>Port série</p></label>
        
        
        <div class="segmented-control__color"></div>
        </div>
        <h3>Activé : <input placeholder="/..." value="` + jsonModule[numModule].activator.active + `" oninput="editjson(this)" type="text" class="input"></h3>
        <h3>Non activé : <input placeholder="/..." value="` + jsonModule[numModule].activator.unactive + `" oninput="editjson(this)" type="text" class="input"></h3>
        `;
        settingPanel.querySelector('.panel3').innerHTML = `
        <h2>Action :</h2>
        <div class="segmented-control">
        
        <input onclick="changetype(this);" type="radio" name="radio3" value="3" id="tab-3" ` + ((jsonModule[numModule].action.type == "HTTP") ? "checked" : "") + `/>
        <label for="tab-3" class= "segmented-control__3">
            <p>HTTP</p></label>
        
        <input onclick="changetype(this);" type="radio" name="radio3" value="4" id="tab-4" ` + ((jsonModule[numModule].action.type == "HTTP") ? "" : "checked") + `/>
        <label for="tab-4" class= "segmented-control__4">
            <p>Port série</p></label>
        
        
        <div class="segmented-control__color"></div>
        </div>
        <h3>Activé : <input placeholder="/..." value="` + jsonModule[numModule].action.active + `" oninput="editjson(this)"type="text" class="input"></h3>
        <h3>Non activé : <input placeholder="/..." value="` + jsonModule[numModule].action.unactive + `" oninput="editjson(this)" type="text" class="input"></h3>
        `;
        settingPanel.querySelector('.panel4').innerHTML = `
        <h2>Port série :</h2>

        <h3>Baudrat : <input placeholder="ex: 9600" oninput="editjson(this)" value="` + jsonModule[numModule].serialport.baud + `" type="text" class="input"></h3>
        <h3>Port : <input placeholder="ex: /dev/ttyUSB0" oninput="editjson(this)" value="` + jsonModule[numModule].serialport.port + `" type="text" class="input"></h3>
        `;
    }
    sendJSON();
}

function editjson(element) {
    let part = (element.parentNode.parentNode.querySelector('h2').innerText == "Actionneur :") ? 0 : (element.parentNode.parentNode.querySelector('h2').innerText == "Action :") ? 1 : 2;
    let data = element.value;
    let input = element.parentNode == element.parentNode.parentNode.querySelectorAll('h3')[0] ? 0 : 1;
    let numElementModule = element.parentNode.parentNode.parentNode.querySelector('h2').id;
    if (part == 0 || part == 1) {
        let type = (document.querySelector('#tab-' + (part + 1) * 2 + ':checked~.segmented-control__color') == null) ? 0 : 1;
        jsonModule[numElementModule][(part == 0) ? "activator" : "action"].numType = type;
        jsonModule[numElementModule][(part == 0) ? "activator" : "action"].type = (type == 0) ? "HTTP" : "Port série";
        if (jsonModule[numElementModule].type == "slider") {
            jsonModule[numElementModule][(part == 0) ? "activator" : "action"]["operator"] = element.parentNode.querySelector('.select').value;
            jsonModule[numElementModule][(part == 0) ? "activator" : "action"]["number"] = element.parentNode.querySelectorAll('input')[0].value;
            jsonModule[numElementModule][(part == 0) ? "activator" : "action"]["data"] = element.parentNode.querySelectorAll('input')[1].value;;
        } else {
            jsonModule[numElementModule][(part == 0) ? "activator" : "action"][(input == 0) ? "active" : "unactive"] = data;
        }
    } else {
        jsonModule[numElementModule].serialport[(input == 0) ? "baud" : "port"] = data;

    }
    sendJSON();
}

function sendJSON() {
    fetch("/api/editjson", {
        method: "POST",
        body: JSON.stringify(jsonModule)
    }).then(function(response) {
        response.text().then(function(text) {})
    });
}
if (jsonModule[9] !== '') {
    setting(document.querySelector('.case' + jsonModule[9]).querySelector('ion-icon'))
}

function changeslidervalue(element) {
    element.parentNode.querySelector('p').innerText = element.value;
    localStorage.setItem('slider' + element.parentNode.parentNode.classList[1].split('case')[1], element.value);
}

function changetype(element) {
    let part = (element.parentNode.parentNode.querySelector('h2').innerText == "Actionneur :") ? 0 : (element.parentNode.parentNode.querySelector('h2').innerText == "Action :") ? 1 : 2;
    let numElementModule = element.parentNode.parentNode.parentNode.querySelector('h2').id;
    let type = (document.querySelector('#tab-' + (part + 1) * 2 + ':checked~.segmented-control__color') == null) ? 0 : 1;
    jsonModule[numElementModule][(part == 0) ? "activator" : "action"].numType = type;
    jsonModule[numElementModule][(part == 0) ? "activator" : "action"].type = (type == 0) ? "HTTP" : "Port série";
    sendJSON();
}

document.querySelector('.start').addEventListener('click', function() {
    document.body.style.opacity = ".1";
    window.location = "/anydomo";
});