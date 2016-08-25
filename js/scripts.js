// Business Logic
function Board(){
	this.boardArray = [["","",""],["","",""],["","",""]];
  this.currentPlayer = 'x'; // Marks who's turn it is
	this.turnCount = 0; // Counts the amount of turns that have already occurred
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
	  score = SpaceChecker(this.boardArray, i, 'col');
    if (WinCheck(score) !== "") {
    	return WinCheck(score);
    }
    score = SpaceChecker(this.boardArray, i, 'row');
    if (WinCheck(score) !== "") {
    	return WinCheck(score);
    }
		score = SpaceChecker(this.boardArray, i, 'diagRight');
    if (WinCheck(score) !== "") {
    	return WinCheck(score);
    }
		score = SpaceChecker(this.boardArray, i, 'diagLeft');
    if (WinCheck(score) !== "") {
    	return WinCheck(score);
    }
  }
  return "";
}
Board.prototype.AIMove = function() {
	// Checks for winning moves and blocks or wins!
	for (var i = 0; i < 3; i++) {
		if (SpaceChecker(this.boardArray, i, 'col') == 20)
			return MoveMaker(this, i, 'col');
		else if (SpaceChecker(this.boardArray, i, 'row') == 20)
			return MoveMaker(this, i, 'row');
		else if (SpaceChecker(this.boardArray, i, "diagRight") == 20)
			return MoveMaker(this, i, 'diagRight');
		else if (SpaceChecker(this.boardArray, i, "diagLeft") == 20)
			return MoveMaker(this, i, 'diagLeft');
		else if (SpaceChecker(this.boardArray, i, 'col') == 2)
			return MoveMaker(this, i, 'col');
		else if (SpaceChecker(this.boardArray, i, 'row') == 2)
			return MoveMaker(this, i, 'row');
		else if (SpaceChecker(this.boardArray, i, "diagRight") == 2)
			return MoveMaker(this, i, 'diagRight');
		else if (SpaceChecker(this.boardArray, i, "diagLeft") == 2)
			return MoveMaker(this, i, 'diagLeft');
		else {
			return ["", ""];
		}
	}
}
function SpaceChecker(boardArray, barIndex, barType) {
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
	} else if (barType == 'diagRight') {
		for (var i = 0; i < 3; i++) {
			if(boardArray[i][i] == "x")
				sum += 1;
			else if (boardArray[i][i] == "o")
				sum += 10;
		}
	} else if (barType == "diagLeft") {
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
function WinCheck(score) {
	if (score == 30) {
    	return 'o';
  } else if (score == 3) {
    	return 'x';
  } else {
  	return "";
  }
}
function MoveMaker(boardObject, barIndex, barType) {
	if (barType == 'col') {
		for (var i = 0; i < 3; i++) {
			console.log(boardObject.boardArray[i][barIndex] + "hey");
			if (boardObject.boardArray[i][barIndex] == '') {
				boardObject.setCharacter('o', i, barIndex);
				return [i, barIndex];
			}
		}
	} else if (barType == 'row') {
		for (var i = 0; i < 3; i++) {
			if (boardObject.boardArray[barIndex][i] == '') {
				boardObject.setCharacter('o', barIndex, i);
				return [barIndex, i];
			}
		}
	} else if (barType == "diagRight") {
		for (var i = 0; i < 3; i++) {
			if(boardObject.boardArray[i][i] == "") {
				boardObject.setCharacter('o', i, i);
				return [i, i];
			}
		}
	}	else if (barType == "diagLeft") {
		var j = 2;
		for (var i = 0; i < 3; i++) {
			if(boardObject.boardArray[i][j] == "") {
				boardObject.setCharacter('o', i, j);
				return [i, j];
			}
			j--;
		}
	}
}

// UI Logic
$(document).ready(function() {
	var newBoard = new Board();
  $('td').click(function() {
		if (false) {
			if (newBoard.winner() == "") {
				var colIndex = $(this).index();
				var rowIndex = $(this).parent().index();
				if (newBoard.boardArray[rowIndex][colIndex] == "") {
					newBoard.turnCount += 1;
					$(this).text(newBoard.currentPlayer);
					newBoard.setCharacter(newBoard.currentPlayer,rowIndex,colIndex);
					$("span#current-player").text(newBoard.currentPlayer.toUpperCase());
					if (newBoard.winner() != "") {
						$('.winner-banner').show();
						$('.btn').show();
						$('#winner').text(newBoard.winner().toUpperCase());
						$('#player-turn').hide();
					}
					else if (newBoard.turnCount == 9 && newBoard.winner() == "") {
						$('.cats-banner').show();
						$('#player-turn').hide();
						$('.btn').show();
					}
				}
			}
		}
  });
	$('td').click(function() {
		if (true) {
			if (newBoard.winner() == "") {
				var colIndex = $(this).index();
				var rowIndex = $(this).parent().index();
				if (newBoard.boardArray[rowIndex][colIndex] == "") {
					newBoard.turnCount += 1;
					$(this).text(newBoard.currentPlayer);
					newBoard.setCharacter(newBoard.currentPlayer,rowIndex,colIndex);
					console.log(newBoard.boardArray[rowIndex][colIndex]);
					if (newBoard.winner() != "") {
						$('.winner-banner').show();
						$('.btn').show();
						$('#winner').text(newBoard.winner().toUpperCase());
						$('#player-turn').hide();
					}
					else if (newBoard.turnCount == 9 && newBoard.winner() == "") {
						$('.cats-banner').show();
						$('#player-turn').hide();
						$('.btn').show();
					} else {
						var aiMove = newBoard.AIMove();
						$('#r' + aiMove[0] + '-c' + aiMove[1]).text('O');
						if (newBoard.winner() != "") {
							$('.winner-banner').show();
							$('.btn').show();
							$('#winner').text(newBoard.winner().toUpperCase());
							$('#player-turn').hide();
						}
						else if (newBoard.turnCount == 9 && newBoard.winner() == "") {
							$('.cats-banner').show();
							$('#player-turn').hide();
							$('.btn').show();
						}
					}
				}
			}
		}
  });
	$('.btn').click(function(){
		document.location.reload();
	});
});
