window.onload = () => {
    // 網頁載入前動畫：
    var op = document.getElementsByClassName('openBody')
    for (let opIndex = 0; opIndex < 3; opIndex++) {
        op[opIndex].style.width = 0;
    }
    openBodyImg.style.opacity = '0'
    openBodyImg.style.visibility = 'hidden'
    // 特集介紹區 滑鼠拖曳
    // changeSlide(0)
    mouseMoveBox()
    stopImgDrag()
    stopDragLink()
};


//左右移動
// window.onbeforeunload = () => {
//     var cl = document.getElementById('closeBody')
//     cl.style.height = '100%'
//     document.body.style.marginBottom = '100px'
// }

// 網頁載入前動畫(想要用增加標籤的方式 不想寫在HTML裡面)：
// 失敗! 應該有的CSS樣式沒有出來
// function creatOp() {
//     var divIndex = 0
//     while (divIndex < 2) {
//         var openShow = document.createElement('div');
//         openShow.className = "openBody";
//         document.body.appendChild(openShow);
//         divIndex++;
//     }
//     var op = document.getElementsByClassName('openBody')
//     console.log(op)
// };

// HEADER 輪轉：
// 做不出同時淡入淡出，先用純CSS做出輪轉且淡入淡出
// var imgIndex = 0
// carousel()
// function carousel() {
//     var ss = document.getElementsByClassName('showSide')
//     for (i = 0; i < ss.length; i++) {
//         ss[i].style.visibility = "hidden";
//         // ss[i].style.animationPlayState = "paused";
//     }
//     // console.log(ss[1].style.animationPlayState)
//     imgIndex++;
//     if (imgIndex > ss.length) { imgIndex = 1 }
//     ss[imgIndex - 1].style.visibility = "visible";
//     // ss[imgIndex - 1].style.animationPlayState = "running";
//     setTimeout(carousel, 3000)
// }

// LOGO/ICON切換顏色：
// 脫離header後顏色從白轉黑
var lgNextElm = document.getElementById('keyshow')
var lg = document.getElementById('logoTokyo')
var iB = document.getElementsByClassName('iconBox')
function changIcon(CIdi) {
    if (CIdi < 100) {
        for (i = 0; i < iB.length; i++) {
            iB[i].style.backgroundColor = "black"
        }
    } else {
        for (i = 0; i < iB.length; i++) {
            iB[i].style.backgroundColor = "white"
        }
    }
}
function changLogo() {
    let CGdi = lgNextElm.offsetTop - window.scrollY
    if (CGdi < 100) {
        lg.style.backgroundImage = "url(./image/indexImg/LOGO_black.png)";
    } else {
        lg.style.backgroundImage = "url(./image/indexImg/LOGO_white.png)";
    }
    changIcon(CGdi)
}
window.addEventListener('scroll', changLogo)

// 右上角ICON
function myIconBtn(btnOne) {
    // ICON變化
    btnOne.classList.toggle("iconChange");
    // Menu變化
    var mnb = document.getElementById("myNavBox")
    if (window.getComputedStyle(mnb).getPropertyValue("height") == "0px") {
        mnb.style.height = "100%";
        for (i = 0; i < iB.length; i++) {
            iB[i].style.backgroundColor = "white"
        }
    }
    else {
        mnb.style.height = "0%";
        let CGdi = lgNextElm.offsetTop - window.scrollY
        changIcon(CGdi)
    }
}

// 特集介紹區 滑鼠拖曳
let slideIndex = 0;
let boxMove = document.getElementById('showBox');
let moveWidth = document.getElementsByClassName('sliderBox')[0].offsetWidth;
let slideLen = document.getElementsByClassName('sliderBox').length;
let currentOffset = 0;
let minMoveOffset = moveWidth / 2;
let isMouDownX = 0;
let isMouMoveX = 0;
let boxMouDown = false;
let boxMouMove = false;
let imgDraging = false;


// 特集介紹區
//showBox移動
function changeSlide(moveNumber, changtime = "0ms") {
    boxMove.style.transform = `translateX(${moveNumber}px)`
    boxMove.style.transitionDuration = changtime
    // console.log(`translateX(${moveNumber}px)`)
};

//滑鼠拖曳
function mouseMoveBox() {
    boxMove.addEventListener('mousedown', (isDown) => {
        isMouDownX = isDown.clientX;//滑鼠觸發down的位置
        boxMouDown = true;//確定滑鼠有down
        imgDraging = false;
        // console.log(`isMouseDownX=${isMouDownX}`);
        // console.log(`currentOffset=${currentOffset}`)

    });
    boxMove.addEventListener('mousemove', (isMove) => {
        if (boxMouDown) {
            isMouMoveX = isMove.clientX - isMouDownX;//滑鼠拖曳的距離
            let moveOffset = isMouMoveX - currentOffset;
            changeSlide(moveOffset);//滑鼠拖曳即時變化
            boxMouMove = true;//確定滑鼠有move (不然沒有move 光up就會變化)
            imgDraging = true;
        }
    });
    document.onmouseup = function () {
        if (boxMouMove) {
            boxMouDown = false;
            //可以跨頁
            var x = (Math.abs(Math.ceil(isMouMoveX / moveWidth)) < 1) ? 1 : Math.abs(Math.ceil(isMouMoveX / moveWidth));
            if (Math.abs(isMouMoveX) > minMoveOffset) {
                // 大於零是BOX往右移動，index減少
                if (isMouMoveX > 0) {
                    currentOffset = currentOffset - (moveWidth + 20) * x;
                    slideIndex = slideIndex - x;
                    // 判斷避免超過第一張
                    if (slideIndex < 0) {
                        currentOffset = 0
                        slideIndex = 0
                    }
                    // console.log(x)
                    // console.log(currentOffset)
                    // console.log(slideIndex)
                    slideIndex == 0 ? forLeftIcon.style.opacity = 0 : '';
                    (slideIndex < slideLen - 2) ? forRightIcon.style.opacity = 1 : '';
                } else {
                    // 小於零是BOX往左移動，index增加
                    currentOffset = currentOffset + (moveWidth + 20) * x;
                    slideIndex = slideIndex + x
                    forLeftIcon.style.opacity = 1
                    // 判斷避免超過最後一張
                    if (slideIndex >= slideLen - 2) {
                        slideIndex = slideLen - 2
                        currentOffset = (moveWidth + 20) * (slideLen - 2)
                        forRightIcon.style.opacity = 0
                    }
                    // console.log(x)
                    // console.log(currentOffset)
                    // console.log(slideIndex)
                }
            }
            changeSlide(-currentOffset, '500ms');
            boxMouMove = false;
        }
    }
}

function stopImgDrag() {
    let slideImgs = document.getElementsByClassName('sliderBox');
    for (imgNum of slideImgs) {
        imgNum.ondragstart = () => {
            return false;
        }
    }
};

function stopDragLink() {
    var linkList = document.querySelectorAll('.sliderBox > a');
    for (let i of linkList)
        i.addEventListener('click', (isLink) => {
            if (imgDraging) {
                isLink.preventDefault();
            }
        });
}

//左右移動
function forRight() {
    if (slideIndex < slideLen - 2) {
        currentOffset = currentOffset + moveWidth + 20;
        slideIndex = slideIndex + 1
        forLeftIcon.style.opacity = 1
        //     slideIndex = slideLen - 2
        //     currentOffset = (moveWidth + 20) * (slideLen - 2)
    }
    (slideIndex == slideLen - 2) ? forRightIcon.style.opacity = 0 : '';
    changeSlide(-currentOffset, '500ms');
}

function forLeft() {
    if (slideIndex > 0) {
        currentOffset = currentOffset - (moveWidth + 20);
        slideIndex = slideIndex - 1;
    }
    slideIndex == 0 ? forLeftIcon.style.opacity = 0 : '';
    (slideIndex < slideLen - 2) ? forRightIcon.style.opacity = 1 : '';
    changeSlide(-currentOffset, '500ms');
}

