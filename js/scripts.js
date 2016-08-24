// Business Logic
function Board(){
	this.boardArray = [["","",""],
										 ["","",""],
										 ["","",""]];

  this.lastCharacter = '';
  this.goodMove = true;
}
Board.prototype.setCharacter = function(char, row, col){
  if (char !== this.lastCharacter) {
	  this.boardArray[row][col] = char;
    this.goodMove = true;
    this.lastCharacter = char;
  }
  else {
    this.goodMove = false;
  }
}

// UI Logic
$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();
		var newBoard = new Board();

		for (var rowNumber = 0; rowNumber < 3; rowNumber++){
			for (var colNumber = 0; colNumber < 3; colNumber++){
		  	var input = $('#r'+ rowNumber + '-c' + colNumber).val();
		  	newBoard.setCharacter(input, rowNumber, colNumber);
	  	}
		}

		alert(newBoard.boardArray);
  });
});
