function swap(index1, index2, c) {
    if(c == 'c')
    {
        for(let i = 0; i < 9; i++)
        {
            sudoku[i][index1] = sudoku[i][index2] + sudoku[i][index1];
            sudoku[i][index2] = sudoku[i][index1] - sudoku[i][index2];
            sudoku[i][index1] = sudoku[i][index1] - sudoku[i][index2];
        }
    }
    else if (c == 'r')
    {
        for(let i = 0; i < 9; i++)
        {
            sudoku[index1][i] = sudoku[index2][i] + sudoku[index1][i];
            sudoku[index2][i] = sudoku[index1][i] - sudoku[index2][i];
            sudoku[index1][i] = sudoku[index1][i] - sudoku[index2][i];
        }
    }
}

function generateSudoku() {
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
    console.log(sudoku);
}

var sudoku = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 1, 5, 6, 4, 8, 9, 7],
        [5, 6, 4, 8, 9, 7, 2, 3, 1],
        [8, 9, 7, 2, 3, 1, 5, 6, 4],
        [3, 1, 2, 6, 4, 5, 9, 7, 8],
        [6, 4, 5, 9, 7, 8, 3, 1, 2],
        [9, 7, 8, 3, 1, 2, 6, 4, 5]
    ];

var timer;
var selectedNum;
var selectedTile;
var disableSelect;
var startTime = new Date();
var pause = false;
var time;

window.onload = function() {
    let board = qs(".sudoku");
    for (let i = 0; i < 81; i++) {
        let p = document.createElement("p");
        board.appendChild(p);
    }
    var newGameBtn = id("newGame");
    newGameBtn.addEventListener("click", startGame());
    var reloadBtn= id("reload");
    reloadBtn.addEventListener("click", reload, false);
    var submit = qs('[type="submit"]');
    submit.addEventListener("click", checkSol);

    setInterval(() => {
        timer = id("timer");
        if (!pause) 
        timer.childNodes[1].innerText = elapsedTime(startTime);
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
    reload = location.reload();
}

function pauseTimer() {
    pause = !pause;
    let play = qs('[onclick="pauseTimer()"]');
    if(pause) {
        play.textContent = "Play";
        time = timer.childNodes[1].innerText;
    }
    else {
        play.textContent = "Pause";
        timer.childNodes[1].innerText = time;
    }
} 
function startGame() {
    let diffLevel = id("diffLevel");
    let diff = id("difficulty");
    diffLevel.textContent = diff.options[diff.selectedIndex].text;

    disableSelect = false;

    generateBoard(diff.value);

    startTime = new Date();
}

function generateBoard(diffLevel) {
    clearPrevious();
    generateSudoku();
    let fill;
    if(diffLevel == "easy") fill = 45;
    else if (diffLevel == "medium") fill = 36;
    else if (diffLevel == "hard") fill = 24;
    else if (diffLevel == "expert") fill = 17;
    let pos = [], num;
    for (let i = 0; i < fill; i++) {
        do {
            num = Math.floor(Math.random() * 81);
        } while(pos.includes(num));
        pos.push(num);
    }
    console.log(pos);
    let p = qsa("p");
    let k = 0;
    for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++, k++) {
        if (pos.includes(k)) p[k].textContent = sudoku[i][j];
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
function updateMove() {
    if(selectedTile && selectedNum) {
        selectedTile.textContent = selectedNum.textContent;
        selectedNum = null;
    }
}

function clearPrevious() {
    let p = qsa("p");
    for (let i = 0; i < p.length; i++) {
        p[i].classList.remove(...p[i].classList);
        p[i].textContent = null;
    }
    
    if(timer) clearTimeout(timer);

    selectedTile = null;
    selectedNum = null;
}

function elapsedTime(startTime) {
    let endTime = new Date();
    let timeDiff = endTime.getTime() - startTime.getTime();
    timeDiff /= 1000;
    let ss = Math.floor(timeDiff % 60);
    ss = ss < 10 ? "0" + ss : ss;
    timeDiff = Math.floor(timeDiff / 60);
    let mm = timeDiff % 60;
    mm = mm < 10 ? "0" + mm : mm;
    timeDiff = Math.floor(timeDiff / 60);
    let hh = timeDiff;
    hh = hh < 10 ? "0" + hh : hh;
    if (hh === "00") {
        return mm + ":" + ss;
    } else {
        return hh + ":" + mm + ":" + ss;
    }
}
function checkSol () {
    let p = qsa("p");
    for (let i = 0, k = 0; i < 9; i++)
    for(let j = 0; j < 9; j++, k++)
    if(parseInt(p[k].textContent) !== sudoku[i][j]) {
        return alert("Wrong Solution!! Continue solving the cryptic...");
    }
    return alert("You cracked the cryptic!!");
}