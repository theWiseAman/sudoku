var sudoku = "";
var userSudoku = "";
var pos = [];
var timer;
var selectedNum;
var selectedTile;
var disableSelect;
var pause = false;
var time;
var ss = 0;
var mm = 0;
var hh = 0;

window.onload = function() {
    var newGameBtn = id("newGame");
    newGameBtn.addEventListener("click", startGame);
    var reloadBtn= id("reload");
    reloadBtn.addEventListener("click", reload, false);
    var submit = qs('[type="submit"]');
    submit.addEventListener("click", checkSol);

    if (localStorage.userSudoku.length > 0) {
        previousBoard();
    }
    setInterval(() => {
        timer = id("timer");
        pause = JSON.parse(localStorage.pause);
        if (!pause) 
        timer.childNodes[1].innerText = elapsedTime();
        saveUserSudoku();
    }, 1000);

    let numBtn = qs(".numBtn").children;
    for (let i = 0; i < 9; i++) {
        numBtn[i].addEventListener("click", function() {
            if(!disableSelect) {
                if (this.classList.contains("selected")) {
                    this.classList.remove("selected");
                    selectedNum = null;
                } else {
                    for (let i = 0; i < 9; i++)
                        numBtn[i].classList.remove("selected");
                    
                    this.classList.add("selected");
                    selectedNum = this;
                    updateMove();
                }
            }
        });
    }
}

function startGame() {
    let diffLevel = id("diffLevel");
    let diff = id("difficulty");
    diffLevel.textContent = diff.options[diff.selectedIndex].text;

    disableSelect = false;

    localStorage.clear();

    sudoku = "1,2,3,4,5,6,7,8,9,4,5,6,7,8,9,1,2,3,7,8,9,1,2,3,4,5,6,2,3,1,5,6,4,8,9,7,5,6,4,8,9,7,2,3,1,8,9,7,2,3,1,5,6,4,3,1,2,6,4,5,9,7,8,6,4,5,9,7,8,3,1,2,9,7,8,3,1,2,6,4,5";
    userSudoku = "";
    ss = 0, mm = 0, hh = 0;
    pause = false;
    localStorage.setItem("userSudoku", userSudoku);
    localStorage.setItem("diffLevel", diffLevel.textContent);
    localStorage.setItem("seconds", ss);
    localStorage.setItem("minutes", mm);
    localStorage.setItem("hours", hh);
    localStorage.setItem("pause", pause);

    let play = qs('[onclick="pauseTimer()"]');
    play.textContent = JSON.parse(localStorage.pause) ? play.textContent = "Play" : play.textContent = "Pause";

    generateBoard(diff.value);

    localStorage.setItem("sudoku", sudoku);

    startTime = new Date();
}

function createBoard() {
    let board = qs(".sudoku");
    for (let i = 0; i < 81; i++) {
        let p = document.createElement("p");
        board.appendChild(p);
        if (i % 9 == 2 || i % 9 == 5)
            p.classList.add("rightBorder");
        if (parseInt(i / 9) == 2 || parseInt(i / 9) == 5)
            p.classList.add("bottomBorder");
    }
}

function generateBoard(diffLevel) {
    clearPrevious();
    generateSudoku();
    createBoard();

    let fill;
    if(diffLevel == "easy") fill = 45;
    else if (diffLevel == "medium") fill = 36;
    else if (diffLevel == "hard") fill = 24;
    else if (diffLevel == "expert") fill = 17;
    let num;
    pos = [];
    for (let i = 0; i < fill; i++) {
        do {
            num = Math.floor(Math.random() * 81);
        } while(pos.includes(num));
        pos.push(num);
    }
    localStorage.setItem("fill", pos);
    let p = qsa("p");
    for (let k = 0, i = 0; k < 81; k++, i += 2) {
        if (pos.includes(k)) p[k].textContent = sudoku[i];
        else {
            p[k].classList.add("blankTile");
            p[k].addEventListener("click", function() {
                if(!disableSelect) {
                    if(this.classList.contains("selected")) {
                        this.classList.remove("selected");
                        selectedTile = null;
                    }
                    else {
                        for (let i = 0; i < 81; i++)
                            p[i].classList.remove("selected");

                        this.classList.add("selected");
                        selectedTile = this;
                        updateMove();
                    }
                }
            });
        } 
    }
    
}

function generateSudoku() {
    sudoku = sudoku.split(",");
    for (let i = 0; i <= 6; i += 3)
    {
        let num1 = Math.floor(Math.random()*3), num2;
        do {
            num2 = Math.floor(Math.random()*3);
        } while(num2 == num1);
        swap(i + num1, i + num2, 'c');
    }
    for (let i = 0; i <= 6; i += 3)
    {
        let num1 = Math.floor(Math.random()*3), num2;
        do {
            num2 = Math.floor(Math.random()*3);
        } while(num2 == num1);
        swap(i + num1, i + num2, 'r');
    }
    let num1 = Math.floor(Math.random()*3), num2;
        do {
            num2 = Math.floor(Math.random()*3);
        } while(num2 == num1);
    for (let i = 0; i < 3; i++)
        swap(i + 3 * num1, i + 3 * num2, 'c');
    num1 = Math.floor(Math.random()*3), num2;
        do {
            num2 = Math.floor(Math.random()*3);
        } while(num2 == num1);
    for (let i = 0; i < 3; i++)
        swap(i + 3 * num1, i + 3 * num2, 'r');
    for (let i = 0; i < 81; i++)
        sudoku[i] = parseInt(sudoku[i]);
    sudoku = sudoku.toString();
    console.log(sudoku);
}

function swap(index1, index2, c) {
    let temp;
    if (c == 'c') {
        for (let j = 0; j < 81; j += 9) {
            temp = sudoku[j + index2];
            sudoku[j + index2] = sudoku[j + index1];
            sudoku[j + index1] = temp;
        }
    }
    else if (c == 'r') {
        for (let j = 0; j < 9; j++) {
            temp = sudoku[j + 9 * index2];
            sudoku[j + 9 * index2] = sudoku[j + 9 * index1];
            sudoku[j + 9 * index1] = temp;
        }
    }
}

function id(id) {
    return document.getElementById(id);
}
function qs(selector) {
    return document.querySelector(selector);
}
function qsa(selector) {
    return document.querySelectorAll(selector);
}
function reload() {
    location.reload();
}

function saveUserSudoku() {
    userSudoku = "";
    let p = qsa("p");
    for (let i = 0, k = 0; k < 81; i += 2, k++) {
        if (p[k].textContent !== '')
            userSudoku += p[k].textContent;
        else
            userSudoku += "0";
        if (i != 161)
            userSudoku += ",";
    }
    localStorage.setItem("userSudoku", userSudoku);
}

function previousBoard() {
    createBoard();

    let diffLevel = id("diffLevel");
    diffLevel.textContent = localStorage.diffLevel;

    let play = qs('[onclick="pauseTimer()"]');
    play.textContent = JSON.parse(localStorage.pause) ? play.textContent = "Play" : play.textContent = "Pause";

    ss = localStorage.seconds;
    mm = localStorage.minutes;
    hh = localStorage.hours;
    timer = id("timer");
    timer.childNodes[1].textContent = localStorage.time;

    let fill = localStorage.fill.split(",");
    let p = qsa("p");
    for (let i = 0, k = 0; k < 81; i += 2, k++) {
        if(localStorage.userSudoku[i] !== "0")
            p[k].textContent = localStorage.userSudoku[i];
        if (!fill.includes(JSON.stringify(k))) {
            p[k].classList.add("blankTile");
            p[k].addEventListener("click", function() {
                if(!disableSelect) {
                    if(this.classList.contains("selected")) {
                        this.classList.remove("selected");
                        selectedTile = null;
                    }
                    else {
                        for (let i = 0; i < 81; i++)
                            p[i].classList.remove("selected");

                        this.classList.add("selected");
                        selectedTile = this;
                        updateMove();
                    }
                }
            });
        }
    }
}

function checkSol () {
    let p = qsa("p");
    for (let i = 0, k = 0; k < 81; i += 2, k++)
    if(parseInt(p[k].textContent) !== parseInt(sudoku[i])) {
        return alert("Wrong Solution!! Continue solving the cryptic...");
    }
    return alert("You cracked the cryptic!!");
}

function pauseTimer() {
    pause = !pause;
    let play = qs('[onclick="pauseTimer()"]');
    if(pause) {
        play.textContent = "Play";
    }
    else {
        play.textContent = "Pause";
        timer.childNodes[1].innerText = localStorage.time;
    }
    localStorage.setItem("pause", pause);
} 

function updateMove() {
    if(selectedTile && selectedNum) {
        selectedTile.textContent = selectedNum.textContent;
        selectedNum = null;
    }
}

function clearPrevious() {
    let p = qsa("p");
    for (let i = 0; i < p.length; i++)
        p[i].remove();
    
    if(timer) clearTimeout(timer);

    selectedTile = null;
    selectedNum = null;
}

function elapsedTime() {
    ss++;
    if (ss / 60 === 1) {
        ss = 0;
        mm++;
        if (mm / 60 === 1) {
            mm = 0;
            hh++;
        }
    }
    let ds, dm, dh;
    ds = ss < 10 ? "0" + ss : ss;
    dm = mm < 10 ? "0" + mm : mm;
    dh = hh < 10 ? "0" + hh : hh;
    if (dh === "00") {
        time = dm + ":" + ds;
    } else {
        time = dh + ":" + dm + ":" + ds;
    }
    localStorage.setItem("time", time);
    localStorage.setItem("seconds", ss);
    localStorage.setItem("minutes", mm);
    localStorage.setItem("hours", hh);
    return time;
}
