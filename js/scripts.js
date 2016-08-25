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
	  score = ColumnRowChecker(this.boardArray, i, 'col');
    if (WinCheck(score) !== "") {
    	return WinCheck(score);
    }
    score = ColumnRowChecker(this.boardArray, i, 'row');
    if (WinCheck(score) !== "") {
    	return WinCheck(score);
    }
		score = DiagonalChecker(this.boardArray, i);
    if (WinCheck(score) !== "") {
    	return WinCheck(score);
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
function ColumnRowChecker(boardArray, barIndex, barType) {
	var sum = 0;
	if (barType == "col") {
	  for (var i = 0; i < 3; i++) {
	  	if (boardArray[i][barIndex] == 'x')
	    	sum += 1;
	    else if(boardArray[i][barIndex] == 'o')
	    	sum += 10;
	  }
	} else if (barType == "row") {
		for (var i = 0; i < 3; i++) {
	  	if (boardArray[barIndex][i] == 'x')
	    	sum += 1;
	    else if(boardArray[barIndex][i] == 'o')
	    	sum += 10;
	  }
	}
  return sum;
}
function WinCheck(score) {
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
 	var turnCount = 0;
  $('td').click(function() {
		$(this).parent().index();
		if (newBoard.winner() == "") {
			var colIndex = $(this).index();
			var rowIndex = $(this).parent().index();
			if (newBoard.boardArray[rowIndex][colIndex] == "") {
				turnCount += 1;
				$(this).text(newBoard.currentPlayer);
				newBoard.setCharacter(newBoard.currentPlayer,rowIndex,colIndex);
				$("span#current-player").text(newBoard.currentPlayer.toUpperCase());
				if (newBoard.winner() != "") {
					$('.winner-banner').show();
					$('.btn').show();
					$('#winner').text(newBoard.winner().toUpperCase());
					$('#player-turn').hide();
				}
				else if (turnCount == 9 && newBoard.winner() == "") {
					$('.cats-banner').show();
					$('#player-turn').hide();
					$('.btn').show();
				}
			}
		}
  });
	$('.btn').click(function(){
		document.location.reload();
	});
});
