const label = document.getElementById("clr-label");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const infoBtn = document.getElementById("info-btn");

infoMsg = "How to Use? 🤓 <br><br> 1. Tap anywhere on screen or hit [spacebar] to see generate a fresh color. <br><br> 2. Tap on color code box or hit [Ctrl+C] to copy color code. <br><br> 3. Tap on left button or [left arrow key] to go back. <br><br> 4. Tap on right button or [right arrow key] to go forward. <br><br> Developed by <a href='https://www.linkedin.com/in/dasaradhsk/' target='_blank'>Dasaradh S K</a> | Project Sourcecode <a href='https://github.com/dsrdh/fresh-colors' target='_blank'>(Github)</a>";

const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
let clr, stkUndo = [], stkRedo = [];
firstClick = true, infoBoxOpen = false;

// -> Window Onload

window.addEventListener("load", function() {
    getNewClr();
    label.innerText = "Hi! 👋 Click anywhere.";
    document.body.style.background = clr;
});

// -> Click Navigation

document.addEventListener("click", function() {
    getNewClr();
});

rightBtn.addEventListener("click", function(ev) {
    if(stkRedo.length > 0) {
        clr = stkRedo.pop();
        stkUndo.push(clr);
        if(stkUndo.length == 0) clr = stkRedo[stkRedo.length-1];
        else clr = stkUndo[stkUndo.length-1];
        document.body.style.background = clr;
        label.innerText = clr;
        skipNextClick = false;
    }
    updateBtnVisibility();
    ev.stopPropagation();
})

leftBtn.addEventListener("click", function(ev) {
    if(stkUndo.length > 1) {
        clr = stkUndo.pop();
        stkRedo.push(clr);
        clr = stkUndo[stkUndo.length-1];
        document.body.style.background = clr;
        label.innerText = clr;
    }
    updateBtnVisibility();
    ev.stopPropagation();
})

label.addEventListener("click", function(ev) {
    if(firstClick) return;
    if(infoBoxOpen) updateBtnVisibility();
    navigator.clipboard.writeText(clr);
    label.innerText = "Copied! ✌️";
    ev.stopPropagation();
});

infoBtn.addEventListener("click", function(ev) {
    if(infoBoxOpen) {
        updateBtnVisibility();
    } else {
        label.innerHTML = infoMsg;
        infoBtn.innerHTML = '<i class="uil uil-multiply"></i>';
        rightBtn.style.visibility = "hidden";
        leftBtn.style.visibility = "hidden";
        infoBoxOpen = true;
    }
    ev.stopPropagation();
});

// -> Prevent spacebar from triggering click event

document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    })
})

// -> Key Navigation

document.addEventListener("keydown", function(ev) {
    if (ev.key == ' ') {    
        getNewClr();    // space bar
    } else if (ev.key == 'ArrowLeft') {     
        leftBtn.click();    // left arrow
    } else if (ev.key == 'ArrowRight') {
        rightBtn.click();   // right arrow
    } else if (ev.ctrlKey && ev.key == 'c') {
        label.click();
    }
});

// -> Functions

function getRandomNum() {
    return Math.floor(Math.random()*hex.length);
}

function genColor() {
    clr = "#";
    for(let i=0; i<6; i++) {
        clr += hex[getRandomNum()];
    }
}

function updateBtnVisibility() {
    leftBtn.style.opacity = stkUndo.length > 1 ? '100%' : '0';
    rightBtn.style.visibility = stkRedo.length > 0 ? 'visible' : 'hidden';
    if(infoBoxOpen) {
        label.innerText = clr;
        leftBtn.style.visibility = "visible";
        infoBtn.innerHTML = '<i class="uil uil-question-circle"></i>';
        infoBoxOpen = false;
    }
}

function getNewClr() {
    if(firstClick) {
        firstClick = false;
    }
    genColor();
    stkUndo.push(clr);
    stkRedo = [];
    document.body.style.background = clr;
    label.innerText = clr;
    updateBtnVisibility();
}