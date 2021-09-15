function validate(evt,val) {
	evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }

	return true;

    	
  } 
  
  function papan_alert(nil) {
	  document.getElementById('papan').innerHTML = "( "+nil+" x "+nil+" ) ";
	  
  }
  
 function change(val) {
	 papan_alert(val)
 }
  
  
document.addEventListener('DOMContentLoaded', function() {


var optionsButton = document.getElementById("options_submit");

optionsButton.addEventListener("click", function(){
	

var boardSize = parseInt(document.getElementById("boardsize_input").value);

var minboardSize = parseInt(document.getElementById("boardsize_input").min);

if(boardSize < minboardSize){
	
	alert("Board size is smaller than "+minboardSize);
	return false;
}
	

optionsButton.innerHTML = "Reset";

function isEven(value){
    if (value % 2 == 0) {
       	return true;
    } else {
        return false;
	};
};

function isOdd(value){
	if (value % 1 == 0) {
		return true;
	} else {
		return false;
	};
};

function allSame(array) 
{ 
   
    var first = array[0];

    if (array[0] == "") {
    	return false;
    } else {
    	return array.every(function(element) {
        	return element == first;
    	});
    };
};

var customBackground = '#eeeeee';


var gameBoard = [];

var numSquares = (boardSize * boardSize);

for (var i = 0; i < numSquares; i++) {
	gameBoard.push(i);
};

document.getElementById("game").innerHTML = '<div id="board"></div>';

var board = document.getElementById("board");

board.style.margin = '0 auto';

board.style.height = (100 * boardSize) + 'px';
board.style.width = (100 * boardSize) + 'px';

board.style.border = 'solid 1px black';

for (var i = 0; i < numSquares; i++) {
	board.innerHTML += '<div class="square"></div>'; 
};

var squares = document.getElementsByClassName("square");

for (var i = 0; i < numSquares; i++) {
	squares[i].style.height = '100px';
	squares[i].style.width = '100px';
	squares[i].style.float = "left";
	squares[i].style.lineHeight = "100px";
	squares[i].setAttribute("id", i.toString());
};

if (numSquares % 2 !== 0) { 

	for (var i = 0; i < numSquares; i += 2) { 
		squares[i].style.backgroundColor = customBackground;
	};
} else { 
	for (i = 0; i < numSquares; i += 1) {
		if (isEven(i/boardSize)) { 
			for (var squareNum = i; squareNum < (i + boardSize); squareNum += 2) {
				squares[squareNum].style.backgroundColor = customBackground;	
			};
		} else if (isOdd(i/boardSize)) { // make odd rows alternate color
			for (var squareNum = i+1; squareNum < (i + boardSize); squareNum += 2) {
				squares[squareNum].style.backgroundColor = customBackground;	
			};
		} else {
		};
	};
};

var turnIndicator = document.getElementById("turnIndicator")

turnIndicator.style.color = "black";
turnIndicator.innerHTML = "X's Turn";

var boardClicks = 0;

board.addEventListener("click", function() {
if (determineWinner()) { 
	turnIndicator.style.color = "blue";
	turnIndicator.innerHTML = winningPlayer[0] + ' WINS !';
} else if (isEven(boardClicks)) {
	turnIndicator.style.color = "red";
	turnIndicator.innerHTML = "O's Turn";
} else {
	turnIndicator.style.color = "black";
	turnIndicator.innerHTML = "X's Turn";
};
boardClicks++;
}); 

var squareClicks = [];

for (var i = 0; i < numSquares; i++) {
	squareClicks[i] = 0;
};

var winningPlayer;

var determineWinner = function() {
	for (i = 0; i < numSquares; i += 1) { 
		if ((i % boardSize) == 0) {
			var rowCheck = [];
			for (var squareNum = i; squareNum < (i + boardSize); squareNum += 1) { 
				rowCheck.push(squares[squareNum].innerHTML);
			};
			console.log('Row ' + i + ' is ' + rowCheck);
			console.log(allSame(rowCheck));

			if (allSame(rowCheck)) {
				winningPlayer = rowCheck; 
				return true;
			};
		};
	};
	for (i = 0; i < numSquares; i += 1) { 
		if (i < boardSize) { 
			var colCheck = [];
			for (var squareNum = i; squareNum < numSquares; squareNum += boardSize) { 
				colCheck.push(squares[squareNum].innerHTML);
			};
			console.log('Column ' + i + 'is ' + colCheck);
			console.log(allSame(colCheck));
			
			if (allSame(colCheck)) {
				winningPlayer = colCheck; 
				return true;
			};	
		};
	};
	var diag1Check = []; 
	for (i = 0; i < numSquares; i += 1) { 
		if ((i % (boardSize + 1)) == 0) { 
			console.log(i)
			diag1Check.push(squares[i].innerHTML);
		};
	};
	console.log(diag1Check) 
	console.log(allSame(diag1Check));
	if (allSame(diag1Check)) { 
		winningPlayer = diag1Check; 
		return true;
	};
	var diag2Check = []; 
	for (i = (boardSize - 1); i < (numSquares - 1); i += 1) { 
		if ((i % (boardSize - 1)) == 0) { 
			console.log(i)
			diag2Check.push(squares[i].innerHTML);
		};
	};
	console.log(diag2Check) 
	console.log(allSame(diag2Check));
	if (allSame(diag2Check)) { 
		winningPlayer = diag2Check; 
		return true;
	};
}; 

var countClicks = function() {
	var divID = this.getAttribute("id");
	squareClicks[divID] += 1;
	if (isEven(boardClicks) && squareClicks[divID] == 1) {
		this.innerHTML = 'X';
	} else if (isOdd(boardClicks) && squareClicks[divID] == 1) {
		this.innerHTML = 'O';
		this.style.color = "red";
	} else if (!determineWinner()){
		alert('Can"t move to this block.');
		boardClicks -= 1;
	} else {
	};
	if (determineWinner()) { 
		for (var i = 0; i < numSquares; i++) {
			squareClicks[i] = 2;
		};
		document.getElementById("options_submit").innerHTML = "Play Again ?"
	};
};

for (var i = 0; i < numSquares; i++) {
	squares[i].addEventListener("click", countClicks);
};

}); 

}); 