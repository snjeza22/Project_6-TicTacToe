
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
//
function renderState(){

}

function tick (){
    renderState();

}

function clicked(row,col){
    console.log ("clicked on board field: row", row, "col", col);
}

//How to initiate

function init(){
    //adding all event listeners for each position
    f11.addEventListener("click", function(ev){
        clicked(1, 1);
    
    });
    f12.addEventListener("click", function(ev){
        clicked(1, 2);
    
    });
    f13.addEventListener("click", function(ev){
        clicked(1, 3);
    
    });
    f21.addEventListener("click", function(ev){
        clicked(2, 1);
    
    });
    f22.addEventListener("click", function(ev){
        clicked(2, 2);
    
    });
    f23.addEventListener("click", function(ev){
        clicked(2, 3);
    
    });
    f31.addEventListener("click", function(ev){
        clicked(3, 1);
    
    });
    f32.addEventListener("click", function(ev){
        clicked(3, 2);
    
    });
    f33.addEventListener("click", function(ev){
        clicked(3, 3);
    
    });
}

//setInterval(tick, 1000/30);
init();
