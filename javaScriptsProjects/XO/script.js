const cells = document.querySelectorAll('.cell');
const reset = document.querySelector('.reset')
const currntTurn = document.querySelector('.current-turn');
const player1Score = document.querySelector('.score1');
const player2Score = document.querySelector('.score2');
const draw = document.querySelector('.draws');
const messageContent = document.querySelector('.content');
const overlay = document.getElementById('#overlay');
const closeBtn = document.getElementById('#close');
let player1 = {
    symbol: '<i class="fa fa-close"></i>',
    played: [],
    score: 0
}
let player2 = {
    symbol: '<i class="fa fa-circle-0"></i>',
    played: [],
    score: 0
}
let turn = true;
let usedCells = [];
let winner = false;
let ties = 0;
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6]];

checkTurn();
for (let i = 0; i < 9; i++) {
    cells[i].addEventListener('click', () => {
        if (isEmpty(i)) {
            if (turn) {
                addSymbol(player1, i);
                turn = false;
                checkwin(player1);
                checkTurn();
            } else {
                addSymbol(player2, i);
                turn = true;
                checkwin(player2);
                checkTurn();
            }
        } else {
            alert('choose an empty cell');
        }
    })
}
function addSymbol(player, i) {
    cells[i].innerHTML = player.symbol;
    player.played.push(i);
    usedCells.push(i);
}

function checkwin(player) {
    if (!winner) {
        winCombos.some(combo => {
            if (combo.every(index => player.played.includes(index))) {
                winner = true;
                player.score++;
                showScore();
                setTimeout(showMessage, 500, player, winner);

            }
        })
    }
    if (!winner && usedCells.length == 9) {
        ties++;
        showScore();
        setTimeout(showMessage, 500);

    }
}
function isEmpty(i) {
    if (usedCells.includes(i)) {
        return false;
    }
    return true;
}
function reset() {
    cells.forEach(cell => {
        cell.innerHTML = '';
    })
    winner = false;
    usedCells = [];
    player1.played = [];
    player2.played = [];
    turn = true;
    checkTurn();
}
reset.addEventListener('click', reset);
function checkTurn() {
    if (turn) {
        currntTurn.innerHTML = player1.symbol;
    } else {
        currntTurn.innerHTML = player2.symbol;
    }
}
function showScore() {
    player1Score.innerHTML = player1.score;
    player1Score.innerHTML = player2.score;
    draw.innerHTML = ties;
}

closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
})

function showMessage(player, winner) {
    if (winner) {
        overlay.style.display = 'flex';
        messageContent.innerHTML = player.symbol + 'is the <h2> Winner</h2>';
    } else {
        messageContent.innerHTML = draw + ' It is a <h2> Draw</h2>';
    }
    reset();
}

