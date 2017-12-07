/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var solution = new Board({'n': n}); 
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solution.togglePiece(i, j);
      if (solution.hasAnyColConflicts(j)) {
        solution.togglePiece(i, j);
      } else {
        break;
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0;
  var board = new Board({'n': n});
  var makeABoard = function(board, indexRow) {
    for (var i = 0; i < n; i++) {
      if (board.rows()[indexRow][i - 1] === 1) {
        tempBoard.togglePiece(indexRow, i - 1);
      }
      var tempBoard = new Board(board.rows());
      tempBoard.togglePiece(indexRow, i);
      if (!tempBoard.hasAnyColConflicts(i)) {
        if (indexRow + 1 === n) {
          solutionCount++;          
        } else {
          makeABoard(tempBoard, indexRow + 1);
        }
      }
      tempBoard.togglePiece(indexRow, i);
        if ( i === n ) {
        if (tempBoard._isInBounds(indexRow - 1, i)) {
          if (tempBoard.rows()[indexRow - 1][i] === 1) {
            tempBoard.togglePiece(indexRow, i - 1);
          }
        }
      }
    }       
  };
  makeABoard(board, 0);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var makeIndependentBoard = function(board) {
    var arrayOfArrays = [];
    for (var i = 0; i < board.get('n'); i++) {
      arrayOfArrays.push(board.get(i).slice());
    }
    return arrayOfArrays;
  };

  var solutionCount = 0;
  var board = new Board({'n': n});

  if (n === 0) {
    return board.rows();
  }
  var validBoard;
  var makeABoard = (boardArg, indexRow) => {
    for (var i = 0; i < n; i++) {
      var tempBoard = new Board(makeIndependentBoard(boardArg));
      tempBoard.togglePiece(indexRow, i);
      if (!tempBoard.hasAnyColConflicts(i) && !tempBoard.hasAnyMajorDiagonalConflicts() && !tempBoard.hasAnyMinorDiagonalConflicts()) {
        if (indexRow + 1 === n) {
          validBoard = tempBoard.rows();
        } else {
          makeABoard(tempBoard, indexRow + 1);
          if (validBoard !== undefined) {
            return;
          }
        }
      }
    }       
  };
  makeABoard(board, 0);
  if (validBoard === undefined) {
    validBoard = new Board({'n': n});
    validBoard = validBoard.rows();
  }
  return validBoard;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  
  var solutionCount = 0;
  var board = new Board({'n': n});
  var makeABoard = function(board, indexRow) {
    for (var i = 0; i < n; i++) {
      if (board.rows()[indexRow][i - 1] === 1) {
        tempBoard.togglePiece(indexRow, i - 1);
      }
      var tempBoard = new Board(board.rows());
      tempBoard.togglePiece(indexRow, i);
      if (!tempBoard.hasAnyColConflicts(i) && !tempBoard.hasAnyMajorDiagonalConflicts() && !tempBoard.hasAnyMinorDiagonalConflicts()) {
        if (indexRow + 1 === n) {
          solutionCount++;          
        } else {
          makeABoard(tempBoard, indexRow + 1);
        }
      }
      tempBoard.togglePiece(indexRow, i);
        if ( i === n ) {
        if (tempBoard._isInBounds(indexRow - 1, i)) {
          if (tempBoard.rows()[indexRow - 1][i] === 1) {
            tempBoard.togglePiece(indexRow, i - 1);
          }
        }
      }
    }       
  };

  if (n === 0) {
    return 1;
  }
  makeABoard(board, 0);

  return solutionCount;
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
};


















