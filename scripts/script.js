let playerID = 0;

function player(name, mark) {
  // Factory for players with a unique ID and initial properties as undefined or 0
  playerID += 1;
  let result = null;
  let score = 0;
  const id = playerID;
  return { id, name, result, score, mark };
}

function Game() {
  // Factory for boards and initializing the name of the players
  let name1 = "Heisenberg";
  let name2 = "Jessie";
  let player1 = player(name1, 'x');
  let player2 = player(name2, 'o');
  let board = Board();
  let grid = board.grid;
  let turn = 0;
  let gameFinished = false;   
  let play = ()=>{
    let move;
    let xcoordinate;
    let ycoordinate;
    while (!gameFinished) {
      if (turn % 2 == 0) {
        move = prompt(`${player1.name} enter your move as coordinates`);
        
      }else {
        move = prompt(`${player2.name} enter your move as coordinates`);
      }
      ycoordinate = parseInt(move.charAt(0));
      xcoordinate = parseInt(move.charAt(1));
      if (grid[ycoordinate][xcoordinate] != null) {
        console.log("Already filled with an" + grid[ycoordinate][xcoordinate]);
      } else {
        if (turn % 2 == 0) {
          grid[ycoordinate][xcoordinate] = player1.mark;
        } else {
          grid[ycoordinate][xcoordinate] = player2.mark;
        }
        turn += 1;
      }
      evaluateGame(ycoordinate, xcoordinate, grid, player1);
      if (turn > 9) {
        console.log('Game is a draw')
      }
      console.log(grid[0][0] + grid[0][1] + grid[0][2]);
      console.log(grid[1][0] + grid[1][1] + grid[1][2]);
      console.log(grid[2][0] + grid[2][1] + grid[2][2]);
      

    }
  };
  return {player1, player2, board, turn, gameFinished,play}
  }

  function evaluateGame(ycoordinate, xcoordinate,grid, player) {
    // Check for a win in a row for the last move of the last player that played
    for (let index = 0; index < 3; index++) {
      if (grid[ycoordinate][index] !== player.mark) {
        break;
      }if (index == 2) {
        console.log(player.name);
      }
    }

    // Check for a win in a column for the last move of the last player that moved
    for (let index = 0; index < 3; index++) {
      if (grid[index][xcoordinate] !== player.mark) {
        break;
      }if (index == 2) {
        console.log(player.name);
      }
    }

    // Checking if there is a win on the diagonal
    for (let index = 0; index < 3; index++) {
      if (grid[index][index] !== player.mark) {
        break
      }if (index == 2) {
        console.log(player.name);
      } 
    }

    // Looking for game on the other diagonal
    if(xcoordinate + ycoordinate == 2){
      for(let i = 0; i < 3; i++){
          if(grid[i][(2)-i] !== player.mark){
              break;
          }
          if(i ==2){
              console.log(player.name);
          }
      }
  }
  }
  
function Board() {
    let grid = [[], [], []];
    let evaluate = ()=>{

    } 
    return {grid}
}

let newGame = new Game();
newGame.play();