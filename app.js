
const elStatus = document.getElementById("status");
const f11 = document.getElementById("f11");
const f12 = document.getElementById("f12");
const f13 = document.getElementById("f13");
const f21 = document.getElementById("f21");
const f22 = document.getElementById("f22");
const f23 = document.getElementById("f23");
const f31 = document.getElementById("f31");
const f32 = document.getElementById("f32");
const f33 = document.getElementById("f33");

//game state
let gameState = {};

function buildInitialState(){
    let newState = {
        players: ["X", "0"],
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ],
        started: true,
        finished: false,
        
    }
}
