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

// UI Logic
$(document).ready(function() {
	var newBoard = new Board();
  $('td.row0').click(function() {
		var colInput = $(this).index();
		$(this).text(newBoard.currentPlayer);
		newBoard.setCharacter(newBoard.currentPlayer,0,colInput);
		$("span#current-player").text(newBoard.currentPlayer.toUpperCase());
  });
	$('td.row1').click(function() {
		var colInput = $(this).index();
		$(this).text(newBoard.currentPlayer);
		newBoard.setCharacter(newBoard.currentPlayer,1,colInput);
		$("span#current-player").text(newBoard.currentPlayer.toUpperCase());
	});
	$('td.row2').click(function() {
		var colInput = $(this).index();
		$(this).text(newBoard.currentPlayer);
		newBoard.setCharacter(newBoard.currentPlayer,2,colInput);
		$("span#current-player").text(newBoard.currentPlayer.toUpperCase());
	});
});
