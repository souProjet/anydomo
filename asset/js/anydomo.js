window.addEventListener('load', function() {
    setTimeout(function() {
        document.body.style.opacity = 1;
    }, 100);
});

function circlebtn(element) {
    element.querySelector('.pause').classList.toggle('visibility');
    element.querySelector('.play').classList.toggle('visibility');
    element.classList.toggle('shadow');
    element.parentNode.querySelector('.circle__back-1').classList.toggle('paused');
    element.parentNode.querySelector('.circle__back-2').classList.toggle('paused');
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
                document.querySelector('.container').style.opacity = "1";
            }, 500);
        } else {
            document.querySelector('.case' + (i + 1)).classList.add(id);

            if (!isObjEmpty(jsonModule[i])) {
                let numberofmodule = jsonModule[i].type;
                if (numberofmodule == "switch") {
                    document.querySelector('.case' + (i + 1)).innerHTML = `
            <h2>` + jsonModule[i].name + `</h2>
            <div class="switch">
                <input id="switch-` + id + `" type="checkbox" oninput="switchModule(this)">
                <label for="switch-` + id + `"></label>
            </div>`;
                } else if (numberofmodule == "button") {
                    document.querySelector('.case' + (i + 1)).innerHTML = `
            <h2 >` + jsonModule[i].name + `</h2>
            <div class="btn btn__secondary" onclick="buttonModule(this)">
                <p>Bouton</p>
            </div>`;

                } else if (numberofmodule == "slider") {
                    document.querySelector('.case' + (i + 1)).innerHTML = `
            <h2>` + jsonModule[i].name + `</h2>
            <div class="slider">
                <input value="` + (localStorage.getItem('slider' + (i + 1)) ? localStorage.getItem('slider' + (i + 1)) : 50) + `" oninput="changeslidervalue(this); sliderModule(this);" type="range" min="0" max="100">
                <p>` + (localStorage.getItem('slider' + (i + 1)) ? localStorage.getItem('slider' + (i + 1)) : 50) + `</p>
            </div>
            `;
                } else if (numberofmodule == "circle") {
                    document.querySelector('.case' + (i + 1)).innerHTML = `
            <h2>` + jsonModule[i].name + `</h2>
            <div class="circle" style="margin-top:-25% !important;">
                <span onclick="circlebtn(this); circleModule(this)" class="circle__btn">
                    <ion-icon class="pause visibility" name="pause"></ion-icon>
                    <ion-icon class="play visibility" name="play"></ion-icon>
                </span>
                <span class="circle__back-1 paused"></span>
                <span class="circle__back-2 paused"></span>
            </div>
            `;
                } else if (numberofmodule == "checkbox") {
                    document.querySelector('.case' + (i + 1)).innerHTML = `
            <h2>` + jsonModule[i].name + `</h2>
            <div class="checkbox">
                <div class="checkbox_container">
                    <input oninput="checkboxModule(this)" id="checkbox-` + id + `" type="checkbox">
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

function changeslidervalue(element) {
    element.parentNode.querySelector('p').innerText = element.value;
    localStorage.setItem('slider' + element.parentNode.parentNode.classList[1].split('case')[1], element.value);
}

document.querySelector('.stop').addEventListener('click', function() {
    document.body.style.opacity = ".1";
    window.location = "/";
});
// for (let i = 0; i < 9; i++) {
//     if (!isObjEmpty(jsonModule[i])) {
//         if (jsonModule[i].type == "switch") {
//             console.log(document.querySelector('.' + jsonModule[i].id));
//         }
//     }
// }
function switchModule(element) {

    let state = element.parentNode.querySelector('input:checked') ? 1 : 0;
    let numOfModule = element.parentNode.parentNode.classList[1].split('case')[1];
    sendValueModule(numOfModule, state);

}

function buttonModule(element) {
    let state = 1;
    let numOfModule = element.parentNode.classList[1].split('case')[1];
    sendValueModule(numOfModule, state);

}

function sliderModule(element) {
    let numOfModule = element.parentNode.parentNode.classList[1].split('case')[1];
    let value = element.value;
    let state = 0;
    if (jsonModule[numOfModule - 1].action.operator == ">") {
        state = (value > jsonModule[numOfModule - 1].action.number) ? 1 : 0;
    } else if (jsonModule[numOfModule - 1].action.operator == "=") {
        state = (value == jsonModule[numOfModule - 1].action.number) ? 1 : 0;
    } else if (jsonModule[numOfModule - 1].action.operator == "<") {
        state = (value < jsonModule[numOfModule - 1].action.number) ? 1 : 0;
    }
    sendValueModule(numOfModule, state);


}

function circleModule(element) {
    let numOfModule = element.parentNode.parentNode.classList[1].split('case')[1];
    let state = element.classList.contains('shadow') ? 1 : 0;
    sendValueModule(numOfModule, state);

}

function checkboxModule(element) {
    let numOfModule = element.parentNode.parentNode.parentNode.classList[1].split('case')[1];
    let state = element.checked ? 1 : 0;
    sendValueModule(numOfModule, state);
}

function sendValueModule(numOfModule, state) {
    fetch("/api/domoserver", {
        method: "POST",
        body: JSON.stringify({
            numOfModule: parseInt(numOfModule),
            state: state
        })
    }).then(function(response) {
        response.text().then(function(text) {})
    });
}