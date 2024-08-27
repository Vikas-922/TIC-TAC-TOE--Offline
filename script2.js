
// Function to check if there are moves left on the board
function isMovesLeft(board) {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[i][j] === '_')
                return true;
    return false;
}

let boarddd = [
    ["x", "x", "x"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];

// console.log("++++++++++++++",checkWinnig(boarddd,'x'));

function convertTo1DArrayV2(board) {
    let result = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            result.push(board[i][j]);
        }
    }
    return result;
  }

function checkWinnig(temp2DBoard,player) {
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

    let tempBoard=convertTo1DArrayV2(temp2DBoard);
    
    // console.log("tempBoard  ",tempBoard,temp2DBoard);
    // console.log("playrConvsn  ",playrConvsn);
    let playerWins=false;

    // Check each winning combination
      for (let combination of winConditions) {
          const [a, b, c] = combination;
          
          // If all positions in a winning combination are occupied by the player, return true
          if (tempBoard[a] === player && tempBoard[b] === player && tempBoard[c] === player) {
            playerWins=true;
        //     console.log(" ------  ",a,b,c);
            return true;
          }
      }

      return false;
      
    //   tie = tempBoard.every(cell => cell !== '_');
    //   if(tie) {
    //     // console.log( "------TTIIEEEE -------");
    //      return "tie";
    //   }
        
  }

function evaluate(board) {
    //IF X [MAXIMIZER] WON +10 
    // Check rows for a win
    if(checkWinnig(board,'x')){
        return +10;
    }  
    else if(checkWinnig(board,'o')){
        return -10;
    }
    // No one has won
    return 0;
}
  
/*
// Function to evaluate the board
function evaluate(board) {
    // Check rows for a win
    for (let row = 0; row < 3; row++) {
        if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            if (board[row][0] === 'X')
                return +10;
            else if (board[row][0] === 'O')
                return -10;
        }
    }

    // Check columns for a win
    for (let col = 0; col < 3; col++) {
        if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            if (board[0][col] === 'X')
                return +10;
            else if (board[0][col] === 'O')
                return -10;
        }
    }

    // Check diagonals for a win
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if (board[0][0] === 'X')
            return +10;
        else if (board[0][0] === 'O')
            return -10;
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        if (board[0][2] === 'X')
            return +10;
        else if (board[0][2] === 'O')
            return -10;
    }

    // No one has won
    return 0;
}
*/


// Minimax function
function minimax(board, depth, alpha, beta, isMax, maxDepth) {
    let score = evaluate(board);

    // If the Maximizer (X) has won the game
    if (score === 10)
        return score - depth;

    // If the Minimizer (O) has won the game
    if (score === -10)
        return score + depth;

    // If there are no more moves and no winner
    if (!isMovesLeft(board))
        return 0;
    /*
    if(depth<=1){
        Maxdepth=5;
    }else if(depth<=2){
        Maxdepth=4;
    }else if(depth<=3) {
        Maxdepth=1;
    }   */

    if (depth >=maxDepth) {
            console.log("+++++   depth >=11   +++++");
        return -10 + depth;
    }

    // If this is the maximizer's move BOT
    if (isMax) {
        let best = -1000;

        // Traverse all cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Check if cell is empty
                if (board[i][j] === '_') {
                    // Make the move
                    board[i][j] = 'x';      // X BOT 
                    // Call minimax recursively and choose the maximum value
                    best = Math.max(best, minimax(board, depth + 1, alpha, beta, false,maxDepth));
                    // Undo the move
                    board[i][j] = '_';

                    alpha = Math.max(alpha, best);
                    if (beta <= alpha) break; // Beta cut-off
                }
            }
        }
        return best;
    } else {
        // Minimizer's move
        let best = 1000;

        // Traverse all cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Check if cell is empty
                if (board[i][j] === '_') {
                    // Make the move
                    board[i][j] = 'o';
                    // Call minimax recursively and choose the minimum value
                    best = Math.min(best, minimax(board, depth + 1, alpha, beta, true, maxDepth));
                    // Undo the move
                    board[i][j] = '_';
                    beta = Math.min(beta, best);
                    if (beta <= alpha) break; // Alpha cut-off
                }
            }
        }
        return best;
    }
}


function convertBoardForBotO(board) {
    let convertedBoard = [];

    for (let i = 0; i < board.length; i++) {
        convertedBoard[i] = [];
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 'x') {
                convertedBoard[i][j] = 'o';
            } else if (board[i][j] === 'o') {
                convertedBoard[i][j] = 'x';
            } else {
                convertedBoard[i][j] = board[i][j];
            }
        }
    }
    return convertedBoard;
}

function getDivByPosition(availableDivArr, position) {
    const div = availableDivArr.find(div => div.id === position.toString());
    if (!div) {
        throw new Error(`No div found with id: ${position}`);
    }
    return div;
}

function convertDictToPosition(MoveDictOject) {
    // Define a mapping from (row, col) to 1-9 position
    const positionMap = {
        "0,0": 1, "0,1": 2, "0,2": 3,
        "1,0": 4, "1,1": 5, "1,2": 6,
        "2,0": 7, "2,1": 8, "2,2": 9
    };

    // Create a key from the bestMove's row and col
    let key = `${MoveDictOject.row},${MoveDictOject.col}`;
    // Return the corresponding position
    return positionMap[key];
}

//  X  IS BOT
function findBestMove(board,botSign,maxDepth) {
    if(botSign==='o'){
        console.log("BOT SIGN  WILL CHANGE",board);
        board=convertBoardForBotO(board);
        console.log("BOT SIGN CHANGED TO 'X' FROM 'O'  ",board);
    }
    let bestVal = -1000;
    let bestMove = { row: -1, col: -1 };

    // X IS MAXIMIZER OR AI BOT
    // Traverse all cells, evaluate minimax for each empty cell
    // and return the cell with optimal value.
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Check if cell is empty
            if (board[i][j] === '_') {
                // Make the move
                board[i][j] = 'x';

                // Compute evaluation function for this move
                let moveVal = minimax(board, 0, -Infinity, Infinity, false,maxDepth);
                // let moveVal = minimax(board, 1, false);

                // Undo the move
                board[i][j] = '_';

                // If the value of the current move is more than the best value, update best
                if (moveVal > bestVal) {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }

    return bestMove;
}