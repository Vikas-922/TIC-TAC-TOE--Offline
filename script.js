const boxes = document.querySelectorAll(".box");
const chanceImg = document.querySelector(".chance > img");
chanceImg.src = "images/cross2.png";
const animationContainer = document.getElementById("winningAnimation");
const tieAnimationCont = document.querySelector(".tieAnimation");
const container = document.querySelector(".container");
const winimg = document.getElementById("winim");
document.getElementById("resetButton").addEventListener("click", resetGame);
const botBtn = document.getElementById("bot");
botBtn.addEventListener("click", bot);

console.log(boxes);

// REMEMBER TO RESET FIELDS IN RESET function
let chancePlayerX = true;
let botPlays = false;
let goingToReset = false;
let playerXarr = [];
let playerOarr = [];
let checkedivArr = [];
let availableDivArr = Array.from(boxes); // Convert NodeList to Array
let availablePositionArr = availableDivArr.map((element) => Number(element.id));  // i think not in use

let board = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];
console.log(board);

const winConditions = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6]  // Diagonal 2
];

boxes.forEach((element) => {
  element.addEventListener("click", clicked);
});
// console.log(boxes);

function clicked(e) {
  if (botPlays && !chancePlayerX && !goingToReset) {
    return; // Prevent user from clicking while bot is playing
  }

  if (e.target.tagName === "IMG" || e.target.querySelector("img")) {
    console.log("Image tag already present (clicked directly on the image).");
    return; // Stop further execution
  }
  //  (ele.tagName === 'IMG' && ele.src.includes("circle.png"))
  divtag = e.target;
  if (chancePlayerX) {
    insertSign(divtag, "cross");
    togglePlayer();
    checkWin(board, "cross");
  } else {
    insertSign(divtag, "circle");
    togglePlayer();
    checkWin(board, "circle");
  }

  //  console.log(" checkedivArr =>",checkedivArr);
  // console.log("p2 => " + playerOarr);
  if (botPlays && !chancePlayerX && availableDivArr.length!==0 && !goingToReset) {
    setTimeout(() => {
      botAction("circle");
    }, 700);
  }
}

function bot(sign) {
  botPlays = botPlays ? false : true;
  if (botPlays) {
    botBtn.style.backgroundColor="#14db3ab3";
  } else {
    botBtn.style.backgroundColor="#ff4747";
  }
  resetGame();
}

function strSignToChar(str){
  return ((str==="circle") ? 'o' : 'x');
}



function botAction(sign) {
  dictBotMove = findBestMove(board,strSignToChar(sign));
  bestPos = convertDictToPosition(dictBotMove);
  botDivMove = getDivByPosition(availableDivArr,bestPos);

  console.log("randomDiv  ", botDivMove);

  insertSign(botDivMove, sign);
  togglePlayer();
  checkWin(board, sign);
}

/*
function botAction(sign) {
  // Generate a random index between 0 and arr.length - 1
  const randomIndex = Math.floor(Math.random() * availableDivArr.length);
  // Select the random element
  const randomDiv = availableDivArr[randomIndex];
  console.log("randomDiv  ", randomDiv);

  insertSign(randomDiv, sign);
  togglePlayer();
  checkWin(board, sign);
}
*/


function updateBoardArr(position, sign) {
  // console.log("q  ", position, sign);
  let row = Math.floor((position - 1) / 3);
  let col = (position - 1) % 3;
  // console.log("w  ", position, sign);
  board[row][col] = sign;
}

function insertSign(divtag, player) {
  imgTag = document.createElement("img");
  imgTag.src = player === "cross" ? "images/cross2.png" : "images/circle.png"; // Replace with the new image path
  // imgTag.classList.add("")

  if (player === "cross") {
    playerXarr.push(parseInt(divtag.id));
    updateBoardArr(divtag.id, "x");
    console.log(board);
  }
  if (player === "circle") {
    playerOarr.push(parseInt(divtag.id));
    updateBoardArr(divtag.id, "o");
    console.log(board);
  }

  divtag.appendChild(imgTag);
  checkedivArr.push(divtag);
  // console.log("div=>", divtag);
  // console.log(boxes);
  // Remove the element with the same ID as divtag
  // console.log("availableDivArr",availableDivArr);
  availableDivArr = availableDivArr.filter(
    (element) => element.id !== divtag.id   //REMOVE divtag from availableDivArr
  );
  availablePositionArr = availableDivArr.map((element) => Number(element.id));
  // console.log("availableDivArr", availableDivArr);
  console.log("availablePositionArr", availablePositionArr);
}

function togglePlayer() {
  chancePlayerX = chancePlayerX ? false : true;
  chanceImg.src = chancePlayerX ? "images/cross2.png" : "images/circle.png";
  //chanceImg.src = "images/circle.png" ;
  // console.log(chanceImg);
}

function convertTo1DArray(board) {
  let result = [];
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
          result.push(board[i][j]);
      }
  }
  return result;
}


function checkWin(temp2DBoard,playrConvsn) {
  let tempBoard=convertTo1DArray(temp2DBoard);
  console.log("tempBoard  ",tempBoard,temp2DBoard);
  console.log("playrConvsn  ",playrConvsn);
  let playerWins=false;
  let tie = false;
  let player=(playrConvsn==="cross") ? 'x' : 'o';
  // console.log("check win", player, playerarr);
  // Check each winning combination
    for (let combination of winConditions) {
        const [a, b, c] = combination;
        
        // If all positions in a winning combination are occupied by the player, return true
        if (tempBoard[a] === player && tempBoard[b] === player && tempBoard[c] === player) {
          playerWins=true;
          console.log(" ------  ",a,b,c);
        console.log("xxxxxx  ",tempBoard[a],tempBoard[b],tempBoard[c],player);
        console.log("qwert  ",tempBoard[a] === player,tempBoard[b] === player,tempBoard[c] === player);
          break;
          //return true;
        }
    }
    // return false;
    tie = tempBoard.every(cell => cell !== '_');
    if (playerWins) {
      console.log(player + "  wins");
      showWinningAnimation(playrConvsn); // Trigger the winning animation
    }
    else if(tie) {
      console.log( "------TTIIEEEE -------");
      tieAnimation();
      
    }

}


// function checkWin(temp2DBoard,playrConvsn) {
//   let tempBoard=convertTo1DArray(temp2DBoard);
//   console.log("tempBoard  ",tempBoard,temp2DBoard);
//   console.log("playrConvsn  ",playrConvsn);
//   let playerWins=false;
//   let tie = false;
//   let player=(playrConvsn==="cross") ? 'x' : 'o';
//   // console.log("check win", player, playerarr);
//   // Check each winning combination
//     for (let combination of winConditions) {
//         const [a, b, c] = combination;
        
//         // If all positions in a winning combination are occupied by the player, return true
//         if (tempBoard[a] === player && tempBoard[b] === player && tempBoard[c] === player) {
//           playerWins=true;
//           console.log(" ------  ",a,b,c);
//         console.log("xxxxxx  ",tempBoard[a],tempBoard[b],tempBoard[c],player);
//         console.log("qwert  ",tempBoard[a] === player,tempBoard[b] === player,tempBoard[c] === player);
//           break;
//           //return true;
//         }
//     }
//     // return false;
//     tie = tempBoard.every(cell => cell !== '_');
//     if (playerWins) {
//       console.log(player + "  wins");
//       showWinningAnimation(playrConvsn); // Trigger the winning animation
//     }
//     else if(tie) {
//       console.log( "------TTIIEEEE -------");
//       tieAnimation();
      
//     }

// }


function chn(playerarr, player) {
  // console.log("check win", player, playerarr);
  let times3 = 0;
  for (const i of winConditions) {
    times3 = 0;
    for (const j of i) {
      if (playerarr.includes(j)) {
        times3++;
      } else {
        break;
      }
    }
    if (times3 === 3) {
      console.log(player + "  wins");
      showWinningAnimation(player); // Trigger the winning animation

      break;
    }
  }
}

function tieAnimation(){
  goingToReset = true;
  container.classList.add("fade-out");
  tieAnimationCont.style.display = "grid";

  setTimeout(() => {
    // console.log("edd");
    tieAnimationCont.style.display = "none";
    container.classList.add("no-transition"); // prevent fadeout animation when removing fadeout
    container.classList.remove("fade-out");   //beacuse reverse animation comes when uremove class
    resetGame(); // after that clears

    setTimeout(() => {
      container.classList.remove("no-transition");
    }, 2000);
  }, 2600); // Adjust the time as needed

  
}

function showWinningAnimation(player) {
  goingToReset = true;
  winimg.src = player === "cross" ? "images/cross2.png" : "images/circle.png";
  // Add the fade-out class to start the transition
  container.classList.add("fade-out");

  // Show the container
  animationContainer.style.display = "block";

  // Optionally, hide the animation after some time
  setTimeout(() => {
    // console.log("edd");
    animationContainer.style.display = "none";
    container.classList.add("no-transition"); // prevent fadeout animation when removing fadeout
    container.classList.remove("fade-out");
    resetGame(); // after that clears

    setTimeout(() => {
      // fade out will take 2s for animation when removing it
      // console.log("ccc");
      container.classList.remove("no-transition");
    }, 2000);
    //container.classList.remove('no-transition');
  }, 2600); // Adjust the time as needed
}

function resetGame() {
  checkedivArr.forEach((element) => {
    element.firstElementChild.remove();
  });

  checkedivArr.length = 0;
  chancePlayerX = true;
  goingToReset = false;
  playerXarr.length = 0;
  playerOarr.length = 0;
  board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];
  availableDivArr = Array.from(boxes); // Convert NodeList to Array
  availablePositionArr = availableDivArr.map((element) => Number(element.id));
  chanceImg.src = "images/cross2.png";
}
