// Business Logic
function Board(){
	this.boardArray = [["","",""],["","",""],["","",""]];
  this.currentPlayer = 'x';
}
Board.prototype.setCharacter = function(char, row, col){
  this.boardArray[row][col] = char;
	if (char == 'x') {
		this.currentPlayer = 'o';
	} else {
		this.currentPlayer = 'x';
	}
}
Board.prototype.winner = function() {
	var score = 0;
	for (var i = 0; i < 3; i++) {
	  score = ColumnChecker(this.boardArray, i);
    if (ScoreCheck(score) !== "") {
			console.log(ScoreCheck(score));
    	return ScoreCheck(score);
    }
    score = RowChecker(this.boardArray, i);
    if (ScoreCheck(score) !== "") {
			console.log(ScoreCheck(score));
    	return ScoreCheck(score);
    }
		score = DiagonalChecker(this.boardArray, i);
    if (ScoreCheck(score) !== "") {
			console.log(ScoreCheck(score));
    	return ScoreCheck(score);
    }
  }
  return "";
}
function DiagonalChecker(boardArray, direction) {
	var sum = 0;
	if (direction == 0) {
		for (var i = 0; i < 3; i++) {
			if(boardArray[i][i] == "x")
				sum += 1;
			else if (boardArray[i][i] == "o")
				sum += 10;
		}
	} else if (direction == 1) {
		var j = 2;
		for (var i = 0; i < 3; i++) {
			if(boardArray[i][j] == "x")
				sum += 1;
			else if (boardArray[i][j] == "o")
				sum += 10;
			j--;
		}
	}
	return sum;
}
function ColumnChecker(boardArray, col) {
	var sum = 0;
  for (var i = 0; i < 3; i++) {
  	if (boardArray[i][col] == 'x')
    	sum += 1;
    else if(boardArray[i][col] == 'o')
    	sum += 10;
  }
  return sum;
}
function RowChecker(boardArray, row) {
	var sum = 0;
  for (var i = 0; i < 3; i++) {
  	if (boardArray[row][i] == 'x')
    	sum += 1;
    else if(boardArray[row][i] == 'o')
    	sum += 10;
  }
  return sum;
}
function ScoreCheck(score) {
	if (score == 30) {
    	return 'o';
  } else if (score == 3) {
    	return 'x';
  } else {
  	return "";
  }
}


// UI Logic
$(document).ready(function() {
	var newBoard = new Board();
  $('td.row0').click(function() {
		var colInput = $(this).index();
		$(this).text(newBoard.currentPlayer);
		newBoard.setCharacter(newBoard.currentPlayer,0,colInput);
		$("span#current-player").text(newBoard.currentPlayer.toUpperCase());
		newBoard.winner();
  });
	$('td.row1').click(function() {
		var colInput = $(this).index();
		$(this).text(newBoard.currentPlayer);
		newBoard.setCharacter(newBoard.currentPlayer,1,colInput);
		$("span#current-player").text(newBoard.currentPlayer.toUpperCase());
		newBoard.winner();
	});
	$('td.row2').click(function() {
		var colInput = $(this).index();
		$(this).text(newBoard.currentPlayer);
		newBoard.setCharacter(newBoard.currentPlayer,2,colInput);
		$("span#current-player").text(newBoard.currentPlayer.toUpperCase());
		newBoard.winner();
	});
});
