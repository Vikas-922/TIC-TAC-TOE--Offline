const boxes = document.querySelectorAll(".box");
const chanceImg = document.querySelector(".chance > img");
chanceImg.src = "images/cross2.png";
const animationContainer = document.getElementById("winningAnimation");
const container = document.querySelector(".container");
const winimg = document.getElementById("winim");
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('bot').addEventListener('click', bot);

console.log(boxes);

// REMEMBER TO RESET FIELDS IN RESET function
let chancePlayerX = true;
let botPlays = false;
let playerXarr = [];
let playerOarr = [];
let checkedivArr = [];
let availableDivArr =  Array.from(boxes);  // Convert NodeList to Array
let availablePositionArr = availableDivArr.map(element => Number(element.id));


let board = [ [ '_', '_', '_' ], 
              [ '_', '_', '_' ], 
              [ '_', '_', '_' ] ]; 
console.log(board);

const winConditions = [
  [1, 2, 3], // First row
  [4, 5, 6], // Second row
  [7, 8, 9], // Third row
  [1, 4, 7], // First column
  [2, 5, 8], // Second column
  [3, 6, 9], // Third column
  [1, 5, 9], // Left diagonal
  [3, 5, 7], // Right diagonal
];

boxes.forEach((element) => {
  element.addEventListener("click", clicked);
});
// console.log(boxes);

function clicked(e) {
  if (e.target.tagName === "IMG" || e.target.querySelector("img")) {
    console.log("Image tag already present (clicked directly on the image).");
    return; // Stop further execution
  }
  //  (ele.tagName === 'IMG' && ele.src.includes("circle.png"))
    divtag = e.target;
  if (chancePlayerX) {
    insertSign(divtag,"cross");
    togglePlayer();
    checkWin(playerXarr, "cross");
  } else {
    insertSign(divtag,"circle");
    togglePlayer();
    checkWin(playerOarr, "circle");
  }

  //  console.log(" checkedivArr =>",checkedivArr);
  // console.log("p2 => " + playerOarr);
  if(botPlays && !chancePlayerX){
    setTimeout(() => {
      botAction("circle");
    }, 1300);
  }  
}

function bot(sign){
  botPlays=true;
}

function botAction(sign){
    // Generate a random index between 0 and arr.length - 1
    const randomIndex = Math.floor(Math.random() * availableDivArr.length);
    // Select the random element
    const randomDiv = availableDivArr[randomIndex];
    console.log("randomDiv  ",randomDiv);
  
    insertSign(randomDiv,sign);
    togglePlayer();
    checkWin(playerOarr, sign);
}


function updateBoardArr(position,sign){
  console.log("q  ",position,sign)
  let row = Math.floor((position - 1) / 3);
  let col = (position - 1) % 3;
  console.log("w  ",position,sign)
  board[row][col] = sign;
}

function insertSign(divtag,player){

  imgTag = document.createElement("img");
  imgTag.src = player === "cross" ? "images/cross2.png" :"images/circle.png" ; // Replace with the new image path
  // imgTag.classList.add("")

  if(player === "cross")  {
    playerXarr.push(parseInt(divtag.id));
    updateBoardArr(divtag.id,"x");
    console.log(board);
  }
  if(player === "circle")  {
    playerOarr.push(parseInt(divtag.id));
    updateBoardArr(divtag.id,"o");
    console.log(board);
  }

  divtag.appendChild(imgTag);
  checkedivArr.push(divtag);
  console.log("div=>",divtag);
  // console.log(boxes);
  // Remove the element with the same ID as divtag
  // console.log("availableDivArr",availableDivArr);
  availableDivArr = availableDivArr.filter(element => element.id !== divtag.id);
  availablePositionArr = availableDivArr.map(element => Number(element.id));
  console.log("availableDivArr",availableDivArr);
  console.log("availablePositionArr",availablePositionArr);
}

function togglePlayer() {
  chancePlayerX = chancePlayerX ? false : true;
  chanceImg.src = chancePlayerX ? "images/cross2.png" : "images/circle.png";
  //chanceImg.src = "images/circle.png" ;
  // console.log(chanceImg);
}

function cheek(){
  for (const i of board) {
    for (const j of i) {
      
    }
    
  }
}

function checkWin(playerarr, player) {
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

function showWinningAnimation(player) {

  winimg.src = player==="cross" ? "images/cross2.png" : "images/circle.png";
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
    resetGame();  // after that clears 

    setTimeout(() => {
      // fade out will take 2s for animation when removing it
      // console.log("ccc");
      container.classList.remove("no-transition");
    }, 2000);
    //container.classList.remove('no-transition');
  }, 2600); // Adjust the time as needed
}

function resetGame() {
  checkedivArr.forEach(element =>{
    element.firstElementChild.remove();
  });

  checkedivArr.length=0;
  chancePlayerX = true;
  playerXarr.length = 0;
  playerOarr.length = 0;
  board = [ 
    [ '_', '_', '_' ], 
    [ '_', '_', '_' ], 
    [ '_', '_', '_' ] 
  ];
  availableDivArr =  Array.from(boxes);  // Convert NodeList to Array
  availablePositionArr = availableDivArr.map(element => Number(element.id));
  chanceImg.src = "images/cross2.png";
}
