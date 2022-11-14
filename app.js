
const elStatus = document.getElementById("status");
const btnRestart = document.getElementById("restart");
const elWinnerMsg = document.getElementById("winner-msg");

const inputPlayerX= document.getElementById("input-player-x");
const inputPlayerO = document.getElementById("input-player-o");
const selectPlayerX = document.getElementById("select-player-x");
const selectPlayerO = document.getElementById("select-player-o");

const f00 = document.getElementById("f00");
const f01 = document.getElementById("f01");
const f02 = document.getElementById("f02");
const f10 = document.getElementById("f10");
const f11 = document.getElementById("f11");
const f12 = document.getElementById("f12");
const f20 = document.getElementById("f20");
const f21 = document.getElementById("f21");
const f22 = document.getElementById("f22");

const elWinLineContainer = document.getElementById("win-line-container");

//game state
let gameState = {};
// set settings - global variable

let settings = {
    playerXIsComputer: false,
    playerOIsComputer: false,
    playerXInputName: '',
    playerOInputName: '',
};

function buildInitialState() {
    gameState = {
        players: {
            "X":{
                name: settings.playerXInputName,
                isCopmuter: settings.playerXIsComputer
            },
            "O": {
                name: settings.playerOInputName,
                isCopmuter: settings.playerOIsComputer
            }
        },
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ],
        started: true,
        finished: false,
        winner: null, //no winner
        winCase: '', //we have couple of options to win the game
        status: '',
        currentPlayer: randomXO(),

    };
    if (gameState.players['X'].isComputer){
        gameState.players['X'].name = "Computer"
    }
    if (gameState.players['O'].isComputer){
        gameState.players['O'].name = "Computer";
}
};




//
function renderState() {
    // console.log('rendering...');
    if (gameState.finished === true) {
        elStatus.innerHTML = "Game is finished.";
    } else {
        elStatus.innerHTML = 'Player ' + gameState.currentPlayer + " make a Move";
    }

    // render winner msg
    if (gameState.finished) {
        if (gameState.winner === null) {
            elWinnerMsg.innerHTML = "Draw!";
            elWinLineContainer
        } else {
            elWinnerMsg.innerHTML = "Player " + gameState.winner + " is a winner!";
        }
    } else {
        elWinnerMsg.innerHTML = '';
    }

    let templateWinLine = '';
    if (gameState.finished) {
        if (gameState.winner === null) {
            //do nothing
        } else {
            templateWinLine ='<div class="win-line ' + gameState.winCase + '"></div>';
        }
    }
    elWinLineContainer.innerHTML = templateWinLine;

    const templateEmpty = '';

    if (gameState.board[0][0]) {
        console.log(gameState.board[0][0]);
        f00.innerHTML = gameState.board[0][0];
    } else {
        f00.innerHTML = templateEmpty;
    }
    if (gameState.board[0][1]) {
        f01.innerHTML = gameState.board[0][1];
    } else {
        f01.innerHTML = templateEmpty;
    }
    if (gameState.board[0][2]) {
        f02.innerHTML = gameState.board[0][2];
    } else {
        f02.innerHTML = templateEmpty;
    }
    if (gameState.board[1][0]) {
        f10.innerHTML = gameState.board[1][0];
    } else {
        f10.innerHTML = templateEmpty;
    }
    if (gameState.board[1][1]) {
        f11.innerHTML = gameState.board[1][1];
    } else {
        f11.innerHTML = templateEmpty;
    }
    if (gameState.board[1][2]) {
        f12.innerHTML = gameState.board[1][2];
    } else {
        f12.innerHTML = templateEmpty;
    }

    if (gameState.board[2][0]) {
        f20.innerHTML = gameState.board[2][0];
    } else {
        f20.innerHTML = templateEmpty;
    }
    if (gameState.board[2][1]) {
        f21.innerHTML = gameState.board[2][1];
    } else {
        f21.innerHTML = templateEmpty;
    }
    if (gameState.board[2][2]) {
        f22.innerHTML = gameState.board[2][2];
    } else {
        f22.innerHTML = templateEmpty;
    }

}
function tick() {
    renderState();

}

function randomXO() {
    if (Math.random() > 0.5) {
        return 'X';
    } else {
        return 'O';
    }
}
//randomly 
function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)+ min); //max is inclusive and min is inclusive
}

//get random row and col coordinates
function randomCoordinate(){
    return getRandomIntInclusive(0, 2);
}

function getPlayerData(player){
    return gameState.players[player];
}

function isComputerOnTheMove(){
        const currentPlayer = gameState.currentPlayer;
        if (getPlayerData(currentPlayer).isComputer){
            return true; //current player is computer
        } else {
            return false;
        }
    }

function isGameRunning() {
    if (gameState.started === true && gameState.finished === false) {
        return true; // game is running
    } else {
        return false;
    }
}
//need to create function that will check is fields are empty

function isFieldEmpty(row, col) {
    if (gameState.board[row][col] === null) {
        return true
    } else {
        return false
    }
}

// to assure there are no more moves to be made I eneed to create function which will check is there any field empty

function isAnyFieldEmpty() {
    let anyFieldEmpty = false;
    for (let row = 0; row <= 2; row++) {
        for (let col = 0; col <= 2; col++) {
            if (isFieldEmpty(row, col)) {
                anyFieldEmpty = true
            }
        }
    }
    return anyFieldEmpty;
}


// couple of win options: no empty fields first condition;1.any row, 2. any column, 3. two diagonals

//1. rows

function isWinnerInRow(board) {
    let win = false;
    let winner = null;
    let winCase = '';
    for (let row = 0; row <= 2; row++) {
        const firstField = board[row][0];
        const secondField = board[row][1];
        const thirdField = board[row][2];
        if (firstField === null) {

        } else {
            if (firstField === secondField && firstField === thirdField) {
                win = true;
                winner = firstField;
                winCase = 'row' + row;
            }
        }
    }
    const answer = {
        win: win,
        winner: winner,
        winCase: winCase,
    }
    return answer;
}

function isWinnerInCol(board) {
    let win = false;
    let winner = null;
    let winCase = '';
    for (let col = 0; col <= 2; col++) {
        const firstField = board[0][col];
        const secondField = board[1][col];
        const thirdField = board[2][col];
        if (firstField === null) {

        } else {
            if (firstField === secondField && firstField === thirdField) {
                win = true;
                winner = firstField;
                winCase = 'col' + col;
            }
        }
    }
    const answer = {
        win: win,
        winner: winner,
        winCase: winCase,
    };
    return answer;
}

function isWinFirstDiag(board) {
    let win = false;
    let winner = null;
    let winCase = "";
    const firstField = board[0][0];
    const secondField = board[1][1];
    const thirdField = board[2][2];

    if (firstField === null) {

    } else {
        if (firstField === secondField && firstField === thirdField) {
            win = true;
            winner = firstField;
            winCase = 'diagonal1';
        }
    }
    const answer = {
        win: win,
        winner: winner,
        winCase: winCase,
    };
    return answer;
}

function isWinSecondDiag(board) {
    let win = false;
    let winner = null;
    let winCase = "";
    const firstField = board[0][2];
    const secondField = board[1][1];
    const thirdField = board[2][0];

    if (firstField === null) {

    } else {
        if (firstField === secondField && firstField === thirdField) {
            win = true;
            winner = firstField;
            winCase = 'diagonal2';
        }
    }
    const answer = {
        win: win,
        winner: winner,
        winCase: winCase,
    };
    return answer;
}
//test with function 



function isWin(board) {
    let win = false;
    let answer = isWinnerInRow(board);
    if (answer.win === true) {
        win = true;
        gameState.finished = true;
        gameState.winner = answer.winner;
        gameState.wincase = answer.winCase
    } else {
        let answer = isWinnerInCol(board);
        if (answer.win === true) {
            win = true;
            gameState.finished = true;
            gameState.winner = answer.winner;
            gameState.wincase = answer.winCase
        } else {
            let answer = isWinFirstDiag(board);
            if (answer.win === true) {
                win = true;
                gameState.finished = true;
                gameState.winner = answer.winner;
                gameState.wincase = answer.winCase
            } else {
                let answer = isWinSecondDiag(board);
                if (answer.win === true) {
                    win = true;
                    gameState.finished = true;
                    gameState.winner = answer.winner;
                    gameState.wincase = answer.winCase;
                }
            }
        }
    }
    return win;
}
function isMovePossible (row, col){
    if (isGameRunning() && isFieldEmpty(row, col)){
        return true;

    } else {
        return false;
    }
}

function computerMakeAMove(){
    let exit = false;
    while(exit === false){
        //try random field
        let row = randomCoordinate();
        let col = randomCoordinate();
        if(isMovePossible(row, col)){
            tryMakeAMove(row, col);
            exit = true;

        }
    }
}


function computerMakeAMoveOrWait(){
    if (isComputerOnTheMove()){
        computerMakeAMove();
    } else {
        //if human is playing , player will initiate move by click
    }
}

function tryMakeAMove(row, col) {

    const currentPlayer = gameState.currentPlayer;
    gameState.board[row][col] = currentPlayer;
        if (gameState.currentPlayer === 'X') {
            gameState.currentPlayer = 'O';
        } else {
            gameState.currentPlayer = 'X';
        }
        //after each move we check is there a win
        const board = gameState.board;
        if(isWin(board)) {
            //refresh screen after state updates
            tick();
        } else {
            if (isAnyFieldEmpty() === false) {
                gameState.finished = true;
                gameState.winner = null; 
            tick ();
            } else {
                tick(); //game will continue if no win or draw
                computerMakeAMoveOrWait();
            }
    }
}

function clicked(row, col) {
    console.log("clicked on board field: row", row, "col", col);
    if (isComputerOnTheMove()){
        //if computer is playing click will be ignored
    }else {
        if (isMovePossible(row, col)){
            tryMakeAMove(row, col);
        } else {
            //nothing - move is not possible
        }
    }
}



function restart() {
    buildInitialState(); // state resets to initial values
    tick(); //render initial state

    computerMakeAMoveOrWait(); //computer is on the move - first move now
}


//How to initiate

function init() {
    //adding all event listeners for each position
    btnRestart.addEventListener("click", function (e) {
        restart();
    });

    f00.addEventListener("click", function (e) {
        clicked(0, 0);

    });
    f01.addEventListener("click", function (e) {
        clicked(0, 1);

    });
    f02.addEventListener("click", function (e) {
        clicked(0, 2);

    });
    f10.addEventListener("click", function (e) {
        clicked(1, 0);

    });
    f11.addEventListener("click", function (e) {
        clicked(1, 1);

    });
    f12.addEventListener("click", function (e) {
        clicked(1, 2);

    });
    f20.addEventListener("click", function (e) {
        clicked(2, 0);

    });
    f21.addEventListener("click", function (e) {
        clicked(2, 1);

    });
    f22.addEventListener("click", function (e) {
        clicked(2, 2);

    });
    inputPlayerX.addEventListener('change', function (e){
        const value = e.target.value; //value changet on input, enter name for player X
        settings.playerXInputName = value
    });
    inputPlayerO.addEventListener('change', function (e){
        const value = e.target.value; //value changet on input, enter name for player X
        settings.playerOInputName = value
    });
    selectPlayerX.addEventListener('change', function(e){
        const value = e.target.value;
        if (value === 'Computer'){
            settings.playerXIsComputer = true;
            document.body.classList.add ('player-x-is-computer');
        } else {
            settings.playerXIsComputer = false;
            document.body.classList.remove ('player-x-is-computer');
        }
    });
    selectPlayerO.addEventListener('change', function(e){
        const value = e.target.value;
        if (value === 'Computer'){
            settings.playerOIsComputer = true;
            document.body.classList.add ('player-o-is-computer');
        } else {
            settings.playerOIsComputer = false;
            document.body.classList.remove ('player-o-is-computer');
        }
    });


    buildInitialState();

    tick ();
}

//setInterval(tick, 1000/30);
init();
