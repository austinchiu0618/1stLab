window.onload = () => {
    var op = document.getElementsByClassName('openBody')
    for (let opIndex = 0; opIndex < 3; opIndex++) {
        op[opIndex].style.width = 0;
    }
    openBodyImg.style.opacity = '0'
    openBodyImg.style.visibility = 'hidden'
}

// 右上角ICON
function myIconBtn(btnOne) {
    // ICON變化
    btnOne.classList.toggle("iconChange");
    // Menu變化
    var mnb = document.getElementById("myNavBox")
    if (window.getComputedStyle(mnb).getPropertyValue("height") == "0px") {
        mnb.style.height = "100%";
    }
    else {
        mnb.style.height = "0%";
    }
}

var peopleJS = document.getElementById('people')
var moneyJS = document.getElementById('money')
var coinJS = document.getElementById('coin')

people.onclick = () => {
    // peopleJS.style.top = '150px';
    // peopleJS.style.opacity = 0.9
    moneyJS.style.width = '200px';
    coinJS.style.opacity = 1;
    coinJS.style.transform = 'translateY(0px)';
}

function drag(myEvent) {
    myEvent.dataTransfer.setData("text/plain", myEvent.target.id);
}

function allowDrop(myEvent) {
    myEvent.preventDefault();
}

function drop(myEvent) {
    myEvent.preventDefault();
    var data = myEvent.dataTransfer.getData("text");
    myEvent.target.appendChild(document.getElementById(data));
}

var boxJS = document.getElementById('putMoneyBox')
var mikujiBoxJS = document.getElementById('mikujiBox')
boxJS.addEventListener('drop', () => {
    moneyJS.style.width = '0px';
    peopleJS.style.transform = "rotateX(35deg)"
    window, setTimeout(() => {
        rep()
        mikujiBoxJS.style.opacity = 1;
        mikujiBoxJS.style.transform = 'translateY(0px)';
    }, 3000)
});

var ig = document.getElementById('animeImg')
// console.log(ig.offsetWidth)
var index = 1
function rep() {
    if (index < 7) {
        var move = -(ig.offsetWidth) * index
        imgani.style.objectPosition = `${move}px`
        index++
        window.setTimeout(rep, 180)
    } else {
        imgani.style.objectPosition = `0px`;
        index = 1
    }
}

mikujiBox.onclick = function () {
    var showMikujiJs = document.getElementById('showMikuji')
    showMikujiJs.style.display = "flex"
    showMikujiJs.style.opacity = 1

    var closeBtn = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    closeBtn.className = "closeBtn";
    closeBtn.appendChild(txt);
    showMikujiJs.appendChild(closeBtn);
    closeBtn.onclick = () => {
        showMikujiJs.style.display = "none"
        location.reload()
    }
    var Answer01 = document.getElementById('finalAnswer01')
    var Answer02 = document.getElementById('finalAnswer02')
    var myRandomX = Math.floor(Math.random() * 9)
    var myRandomY = Math.floor(Math.random() * 9)

    Answer01.src = `./image/omikujiImg/100/${myRandomX}${myRandomY}a.jpg`
    Answer02.src = `./image/omikujiImg/100/${myRandomX}${myRandomY}b.jpg`
}
console.log()



