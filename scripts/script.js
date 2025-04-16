let playerID = 0;
let gameNo = 0;
let game;
// Tile elements with the listeners
let tiles = [];
for (let i = 0; i < 9; i++) {
  tiles[i]= document.getElementById(1+i);
  addListenerToTile(tiles[i]);
}

document.addEventListener("DOMContentLoaded", () => {
// Handle the pop up form after loading the html to not have conflitcts with null elements
  const popup = document.querySelector(".pop-up");
  const enterButton = document.getElementById("enter-names");
  const closeButton = document.getElementById("close-button");
  const form = document.getElementById("pop-up-form");

  // Show popup
  enterButton.addEventListener("click", () => {
    popup.style.display = "block";
  });

  // Close popup when clicking "x"
  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close popup when clicking outside the form
  window.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });

  // Handle the form submition
  //Get the elements of the form and the players' name fields
  const formPlayers =  document.getElementById("pop-up-form");
  const fieldPlayer1 = document.getElementById("name-player1");
  const fieldPlayer2 = document.getElementById("name-player2");
  const interactions = document.querySelector(".game-interactions");

  formPlayers.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let player1Name = fieldPlayer1.value;
    let player2Name = fieldPlayer2.value;
    document.getElementById("player1-name").innerText = player1Name + " (x)";
    document.getElementById("player2-name").innerText = player2Name + " (o)";
    game = Game(player1Name, player2Name);
    popup.style.display = "none";
    enterButton.style.display = "none";
    interactions.style.display = "flex";
    
  })


  




});





  function player(name, mark) {
    // Factory for players with a unique ID and initial properties as undefined or 0
    playerID += 1;
    let result = null;
    let score = 0;
    const id = playerID;
    return { id, name, result, score, mark };
  }

  function Game(name1, name2) {
    // Factory for boards and initializing the name of the players
    gameNo += 1;
    const gameNumber = gameNo;
    let player1 = player(name1, "x");
    let player2 = player(name2, "o");
    let board = Board();
    let grid = board.grid;
    let turn = 0;
    let gameFinished = false;


    // Start game
    let play = (tile, noTile) => {
      if (!gameFinished) {
        let move = findCoordinates(noTile);
      let xcoordinate = move[0];
      let ycoordinate = move[1];
            if (turn % 2 == 0) {
              tile.innerText = "x";
              grid[ycoordinate][xcoordinate]="x";
              gameFinished = evaluateGame(ycoordinate, xcoordinate, grid, player1);
              
            } else {
              tile.innerText = "o";
              grid[ycoordinate][xcoordinate]="o";
               gameFinished = evaluateGame(ycoordinate, xcoordinate, grid, player2);
            }
            turn += 1;
          
          
          if (turn == 9) {
            alert("The game is over; it is a draw!")
        }
  
    }else {
      alert("The game is already over")
    }
      }
    return { player1, player2, board, turn, gameNumber, gameFinished, play };
  }

  // Given a tile, gives the coordinates for the determinateWinner func
  function findCoordinates(tile) {
    if (tile ==1) {
      return [0,0];
    }
    if (tile == 2) {
      return [0,1]
    }
    if (tile == 3) {
      return [0,2]
    }
    if (tile == 4) {
      return [1,0]
    }
    if (tile == 5) {
      return [1,1]
    }
    if (tile == 6) {
      return [1,2]
    }
    if (tile == 7) {
      return [2,0]
    }
    if (tile == 8) {
      return [2,1]
    }
    if (tile == 9) {
      return [2,2]
    }
  }

  function evaluateGame(ycoordinate, xcoordinate, grid, player) {
    let gameFinished = false;
    // Check for a win in a row for the last move of the last player that played
    for (let index = 0; index < 3; index++) {
      if (grid[ycoordinate][index] !== player.mark) {
        break;
      }
      if (index == 2) {
        gameFinished = true;
        alert(`It is ${player.name} the one that takes the glory!`);
      }
    }

    // Check for a win in a column for the last move of the last player that moved
    for (let index = 0; index < 3; index++) {
      if (grid[index][xcoordinate] !== player.mark) {
        break;
      }
      if (index == 2) {
        gameFinished = true;
        alert(`It is ${player.name} the one that takes the glory!`);
      }
    }

    // Checking if there is a win on the diagonal
    for (let index = 0; index < 3; index++) {
      if (grid[index][index] !== player.mark) {
        break;
      }
      if (index == 2) {
        gameFinished = true;
        alert(`It is ${player.name} the one that takes the glory!`);
      }
    }

    // Looking for game on the other diagonal
    if (xcoordinate + ycoordinate == 2) {
      for (let i = 0; i < 3; i++) {
        if (grid[i][2 - i] !== player.mark) {
          break;
        }
        if (i == 2) {
          gameFinished = true;
          alert(`It is ${player.name} the one that takes the glory!`);
        }
      }
    }
    return gameFinished;
  }

  function Board() {
    let grid = [[], [], []];
    return { grid };
  }

  function newGame() {
    tiles.forEach((element)=>{
      element.innerText = "";
    });
    grid.forEach((element)=>{
      element = null;
    });
  }

  function addListenerToTile(tile) {
    tile.addEventListener("click", ()=>{
      if (tile.innerText == "") {
        game.play(tile, parseInt(tile.id));      
      }
    });
  }