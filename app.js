
const elStatus = document.getElementById("status");
const btnRestart = document.getElementById("restart");
const elWinnerMsg = document.getElementById("winner-msg");
const f00 = document.getElementById("f00");
const f01 = document.getElementById("f01");
const f02 = document.getElementById("f02");
const f10 = document.getElementById("f10");
const f11 = document.getElementById("f11");
const f12 = document.getElementById("f12");
const f20 = document.getElementById("f20");
const f21 = document.getElementById("f21");
const f22 = document.getElementById("f22");

//game state
let gameState = {};

function buildInitialState(){
    gameState = {
        players: ["X", "O"],
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ],
        started: true,
        finished: false,
        winner: null, //no winner
        winCase:'', //we have couple of options to win the game
        status: '',
        currentPlayer: randomXO(),
        
    };
}

// we need to randomly choose which player goes first (x or o)

function randomXO() {
    if (Math.random() > 0.5){
        return "X";
    } else {
        return "O"
    }
}

//
function renderState(){
   // console.log('rendering...');
    if (gameState.finished === true){
        elStatus.innerHTML = "Game is finished.";
    } else {
    elStatus.innerHTML = 'Player ' + gameState.currentPlayer +" "+ "make a Move";
    }

// render winner msg
if (gameState.finished){
  if  (gameState.winner === null){
    elWinnerMsg.innerHTML = "Draw!";
} else {
    elWinnerMsg.innerHTML = "Player " + gameState.winner + " is a winner!";
} 
} else {
    elWinnerMsg.innerHTML ='';
}
    const templateEmpty = '';

    if(gameState.board[0][0]){
        console.log(gameState.board[0][0]);
        f00.innerHTML = gameState.board[0][0];
    }else {
        f00.innerHTML = templateEmpty;
    }
    if(gameState.board[0][1]){
        f01.innerHTML = gameState.board[0][1];
    } else {
        f01.innerHTML = templateEmpty;
    }
    if(gameState.board[0][2]){
        f02.innerHTML = gameState.board[0][2];
    } else {
        f02.innerHTML = templateEmpty;
    }
    if(gameState.board[1][0]){
        f10.innerHTML = gameState.board[1][0];
    } else {
        f10.innerHTML = templateEmpty;
    }
    if(gameState.board[1][1]){
        f11.innerHTML = gameState.board[1][1];
    } else {
        f11.innerHTML = templateEmpty;
    }
    if(gameState.board[1][2]){
        f12.innerHTML = gameState.board[1][2];
    } else {
        f12.innerHTML = templateEmpty;
    }

    if(gameState.board[2][0]){
        f20.innerHTML = gameState.board[2][0];
    } else {
        f20.innerHTML = templateEmpty;
    }
    if(gameState.board[2][1]){
        f21.innerHTML = gameState.board[2][1];
    }else {
        f21.innerHTML = templateEmpty;
    }
    if(gameState.board[2][2]){
        f22.innerHTML = gameState.board[2][2];
    } else {
        f22.innerHTML = templateEmpty;
    }

}
function tick (){
    renderState();

}

function isGameRunning(){
    if (gameState.started === true && gameState.finished === false){
        return true; // game is running
    } else {
        return false
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

 function isAnyFieldEmpty(){
    let anyFieldEmpty = false;
    for (let row = 0; row <=2; row++){
        for (let col = 0; col <=2; col++){
            if (isFieldEmpty (row, col)){
                anyFieldEmpty = true
            }
        }
    }
    return anyFieldEmpty;
 }


 // couple of win options: no empty fields first condition;1.any row, 2. any column, 3. two diagonals

 //1. rows

 function isWinnerInRow(){
    for (let row=0; row <=2; row++){
        const firstField= board [row][0];
        const secondField = board [row][1];
        const thirdField = board[row][2];
        if (firstField === null){

        }else {
            if (firstField === secondField && firstField=== thirdField){
                return "Row Winner" + firstField;
            }
        }
    }
 }

 //test with function 




 function isGameFinished (){

if (isAnyFieldEmpty()){
    return false;
} else {
    return true;
}
 }

function updateStatus(){

    if(isGameFinished()){
        gameState.finished = true;

    } else {

    }
}
function tryMakeAMove(row, col){

    const currentPlayer = gameState.currentPlayer;
    if (isGameRunning() && isFieldEmpty(row, col)){
    gameState.board[row][col] = currentPlayer;
    //CHANGE player?
    if(gameState.currentPlayer === 'X'){
        gameState.currentPlayer = 'O';
    } else {
        gameState.currentPlayer = 'X';
    } 
    afterMove();
} else {

    }
}

function afterMove() {
    updateStatus();
    tick()
}

function restart () {
    buildInitialState();
    tick();
}

function clicked(row,col){
    console.log ("clicked on board field: row", row, "col", col);
    tryMakeAMove(row, col);
}

//How to initiate

function init(){
    //adding all event listeners for each position
    btnRestart.addEventListener("click", function(e){
        restart();
    });

    f00.addEventListener("click", function(e){
        clicked(0, 0);
    
    });
    f01.addEventListener("click", function(e){
        clicked(0, 1);
    
    });
    f02.addEventListener("click", function(e){
        clicked(0, 2);
    
    });
    f10.addEventListener("click", function(e){
        clicked(1, 0);
    
    });
    f11.addEventListener("click", function(e){
        clicked(1, 1);
    
    });
    f12.addEventListener("click", function(e){
        clicked(1, 2);
    
    });
    f20.addEventListener("click", function(e){
        clicked(2, 0);
    
    });
    f21.addEventListener("click", function(ev){
        clicked(2, 1);
    
    });
    f22.addEventListener("click", function(e){
        clicked(2, 2);
    
    });
    buildInitialState();
}

//setInterval(tick, 1000/30);
init();
