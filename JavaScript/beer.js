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


var boxJS = document.getElementById('box');
var gameDiffValue = document.getElementsByClassName('gameDiff')
var boolLoseLimit = document.getElementsByClassName('loseLimit')
var boolTimeLimit = document.getElementsByClassName('timeLimit')
var imgArr = [];
var cardArr = [];
var cardValue = 0; //遊戲張數,
var imgValue = 11; //目前資料夾圖片總數量
var clearTime = 0
var putImg = '';
var cardTune = '';
var once = false;
var twice = false;
var loseLimitJS = false;
var timeLimitJS = false;
var sec = 0;
var loseCard;

function gameSetJS() {
    for (let i = 0; i < gameDiffValue.length; i++) {
        if (gameDiffValue[i].checked) {
            cardValue = parseInt(gameDiffValue[i].value) * 2
            console.log(cardValue)
        }
    }
    for (let i = 0; i < boolLoseLimit.length; i++) {
        if (boolLoseLimit[i].checked) {
            loseLimitJS = boolLoseLimit[i].value
            console.log(loseLimitJS)
        }
    }
    for (let i = 0; i < boolTimeLimit.length; i++) {
        if (boolTimeLimit[i].checked) {
            timeLimitJS = boolTimeLimit[i].value
            console.log(timeLimitJS)
        }
    }
    if (timeLimitJS == "true") {
        switch (cardValue) {
            case 8:
                sec = 30
                break;
            case 12:
                sec = 60
                break;
            case 18:
                sec = 100
                break;
            default:
                break;
        }
        timeFun()
    } else { clearInterval(x); document.getElementById("showLimitTime").innerText = `` }
    loseLimitJS == "true" ? loseCard = 3 : '';
    loseLimitJS == "true" ? showLimitlose.innerText = `${loseCard}次` : showLimitlose.innerText = '';
    // console.log(loseLimitJS)
    // console.log(timeLimitJS)
}

gameStart.onclick = () => {
    boxImg.style.opacity = '0.2'
    boxImg.style.backgroundImage = 'url(./image/beerImg/beer_female.png)'
    kanpai.style.display = 'none'
    kanpai.style.opacity = '0'
    // 先重設遊戲設定
    gameSetJS();
    boxJS.innerHTML = ''
    imgArr = [];
    cardArr = [];
    clearCard = cardValue / 2
    putImg = '';
    cardTune = '';
    once = false;
    twice = false;
    switch (cardValue) {
        case 8:
            boxJS.style.width = '600px'
            break;
        case 12:
            boxJS.style.width = '600px'
            break;
        case 18:
            boxJS.style.width = '900px'
            break;
        default:
            break;
    }
    makeCardArr()
    imgInCard() 
}

// 產生卡片,製作陣列
function makeCardArr() {
    for (let i = 0; i < cardValue; i++) {
        var cardJS = document.createElement('div')
        var cardFrontJs = document.createElement('div')
        var imgFrontJs = document.createElement('img')
        var cardBackJs = document.createElement('div')
        var imgBackJs = document.createElement('img')
        cardJS.className = 'card'
        cardFrontJs.className = 'cardFront'
        cardBackJs.className = 'cardBack'
        imgFrontJs.className = 'imgFront'
        cardJS.setAttribute('onclick', 'openCard(this,event)')
        imgBackJs.setAttribute('src', './image/beerImg/beer_can.png')
        cardFrontJs.appendChild(imgFrontJs)
        cardBackJs.appendChild(imgBackJs)
        cardJS.appendChild(cardFrontJs)
        cardJS.appendChild(cardBackJs)
        boxJS.appendChild(cardJS)
        cardArr[i] = `${i}`
    }
    for (let i = 0; i < imgValue; i++) {
        imgArr[i] = `${i + 1}`
    }
    putImg = document.getElementsByClassName('imgFront')
    cardTune = document.getElementsByClassName('card')
    // cardTune.style.transform = 'rotateY(180deg)'
    console.log(cardTune)
    console.log(boxJS)
    console.log(imgArr)
    console.log(cardArr)
    console.log(boxJS.innerHTML == '')
};

// 圖片放進卡片
function imgInCard() {
    var x = imgValue
    var y = cardValue
    for (let i = 0; i < cardValue / 2; i++) {
        var myRandomImg = Math.floor(Math.random() * --x);
        var myRandomcard01 = Math.floor(Math.random() * --y);
        var myRandomcard02 = Math.floor(Math.random() * --y);
        putImg[cardArr[myRandomcard01]].setAttribute('src', `./image/beerImg/${imgArr[myRandomImg]}.jpg`);
        cardArr.splice(myRandomcard01, 1,);
        // console.log(imgArr)
        // console.log(cardArr)
        putImg[cardArr[myRandomcard02]].setAttribute('src', `./image/beerImg/${imgArr[myRandomImg]}.jpg`);
        imgArr.splice(myRandomImg, 1,);
        cardArr.splice(myRandomcard02, 1,);
        // console.log(cardArr)
    }
}

//翻牌
var valueTest = 0
// 備份 寫法一
var activeJS
function openCard(isOpening, pram) {
    activeJS = document.getElementsByClassName('active')
    if (activeJS.length < 2) {
        console.log(isOpening)
        isOpening.style.transform = 'rotateY(180deg)'
        isOpening.style.transitionDuration = '1s'
        isOpening.className += ' active'
        if (once == true && twice == false) {
            twice = true
        } else { once = true; }
        activeJS = document.getElementsByClassName('active')
        if (once == true && twice == true) {
            var compImg = document.querySelectorAll('.active img.imgFront')
            console.log(compImg.src)
            if (compImg[0].src == compImg[1].src) {
                activeJS[1].style.visibility = "hidden";
                activeJS[0].style.visibility = "hidden";
                clearCard--;
            } else {
                loseLimitJS == "true" ? loseCard-- : '';
                loseLimitJS == "true" ? showLimitlose.innerText = `${loseCard}次` : '';
                loseCard == 0 ? gameFail() : '';
            }
            setTimeout(() => {
                for (let i of cardTune) { i.style.transform = 'rotateY(0deg)' }
                activeJS[1].className = 'card';
                activeJS[0].className = 'card';
            }, 1500)
            twice = false;
            once = false;
        }
        clearCard == 0 ? gameFinish() : '';
        // console.log(activeJS)
        // console.log(once)
        // console.log(twice)
    }
}

var x
function timeFun() {
    x = setInterval(() => {
        document.getElementById("showLimitTime").innerText = `${sec}s`;
        sec--;
        if (sec < 0 && timeLimitJS == 'true') { clearInterval(x); gameFail(); document.getElementById("showLimitTime").innerText = `` }
    }, 1000);
}

cheat.addEventListener('click', () => {
    for (let i of cardTune) { i.style.transform = 'rotateY(180deg)' }
    setTimeout(() => {
        for (let i of cardTune) { i.style.transform = 'rotateY(0deg)' }
    }, 5000)
})

function gameFail() {
    for (let i of cardTune) { i.style.opacity = '0' }
    setTimeout(() => {
        boxImg.style.backgroundImage = 'url(./image/beerImg/nayami.png)'
        boxImg.style.opacity = '1'
    }, 1000)
}

function gameFinish() {
    clearInterval(x)
    boxJS.innerHTML = ''
    boxImg.style.opacity = '0'
    setTimeout(() => {
        finish.style.opacity = '1'
        fullbeer.style.transform = 'translateY(0px)'
        fullbeer.style.opacity = '1'
    }, 1000)
    setTimeout(() => {
        finish.style.opacity = '0'
        boxImg.style.opacity = '1'
        kanpai.style.display = 'block'
    }, 9000)
    setTimeout(() => {
        kanpai.style.opacity = '1'
        boxImg.style.opacity = '.2'
    }, 11000)
}

// boxJS.addEventListener('click',gameFinish())