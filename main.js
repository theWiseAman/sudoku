function displayDiff() {
    const difficulty = document.getElementsByName("difficulty");
}

const reloadBtn= document.querySelector("#reload");
function reload() {
    reload = location.reload();
}
reloadBtn.addEventListener("click", reload, false);

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
    let p = document.getElementsByTagName("p");
    console.log(p);
    let k = 0;
    for(let i = 0; i < 9; i++)
    for(let j = 0; j < 9; j++)
        p[k++].innerText = sudoku[i][j];
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
window.generateSudoku();

var timer;
var selectedNum;
var selectedTile;

window.onload = function() {
    document.get
}
