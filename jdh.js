let currentPlayer = "X";
let roundwon = true;
let gameActive = true;
function printCurrentPlayerTurn(){
    return `It's ${currentPlayer}'s turn`;
}
function printwinningPlayer(){
    return `Player ${currentPlayer} is winner!`;
}
const statusPanel = document.getElementById('game--status');
statusPanel.innerHTML = printCurrentPlayerTurn();

document.getElementById("game--restart").addEventListener('click',handleRestartClick);

function handleRestartClick(){
    gameActive = true;
    currentPlayer = "X";
    statusPanel.innerHTML = printCurrentPlayerTurn();
    Array.prototype.forEach.call(document.getElementsByClassName('cell'),
   (item) => item.innerHTML = '');
}
const winningConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
let cellbuttons = document.getElementsByClassName('cell');
for(cellbutton of cellbuttons){
    cellbutton.addEventListener(`click`,handleCellClick);
}
function handlePlayerChange(){
    if(gameActive == false)
       return;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusPanel.innerHTML = printCurrentPlayerTurn();
}
function handleGameWinnerCheck(){ 
   let winnerFound = true;
   for (let i = 0; i < 8; ++i){
        const wincon = winningConditions[i];
        let cell1 = document.getElementById(wincon[0].toString()).innerHTML;
        let cell2 = document.getElementById(wincon[1].toString()).innerHTML;
        let cell3 = document.getElementById(wincon[2].toString()).innerHTML;
        console.log(cell1,cell2,cell3);
        if(cell1 === ''|| cell2 === '' || cell3 === ''){
            continue;
        }
        if(cell1 === cell2 && cell2 === cell3){
            winnerFound = false;
            // console.log("winner is player " + currentPlayer);
            statusPanel.innerHTML = printwinningPlayer();
            gameActive = false;
            return;
        }
   }  
   let roundDraw = Array.prototype.filter.call(document.getElementsByClassName('cell'),
   (item) => item.innerHTML === '').length === 0;
   if(roundDraw){
    statusPanel.innerHTML='game out';
    gameActive = false;
   }

}
function handleCellClick(event){
    let clickedCell = event.target;
    if ((clickedCell.innerHTML !== "") || (gameActive == false)){
        return;
    }
    clickedCell.innerHTML = currentPlayer;
    handleGameWinnerCheck();
    handlePlayerChange();
}