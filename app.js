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