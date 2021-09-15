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
 
 function doReload(){
	 document.getElementById('ukuran_data').value = 3;
	 location.reload()
 }
  
document.addEventListener('DOMContentLoaded', function() {


var optionsButton = document.getElementById("submit_play");

optionsButton.addEventListener("click", function(){
	

var boardSize = parseInt(document.getElementById("ukuran_data").value);

var minboardSize = parseInt(document.getElementById("ukuran_data").min);

var maxboardSize = parseInt(document.getElementById("ukuran_data").max);

if(boardSize < minboardSize || boardSize > maxboardSize){
	
	alert("Board Type size must be larger than "+minboardSize+" and smaller than "+maxboardSize);
	return false;
}
	

optionsButton.innerHTML = "Reset";

function CekGenap(value){
    if (value % 2 == 0) {
       	return true;
    } else {
        return false;
	};
};

function cekSatu(value){
	if (value % 1 == 0) {
		return true;
	} else {
		return false;
	};
};

function cekMirip(array) 
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


var gimBoard = [];

var numkotakDatas = (boardSize * boardSize);

for (var i = 0; i < numkotakDatas; i++) {
	gimBoard.push(i);
};

document.getElementById("gim").innerHTML = '<div id="tic-tac"></div>';

var board = document.getElementById("tic-tac");

board.style.margin = '0 auto';

board.style.height = (100 * boardSize) + 'px';
board.style.width = (100 * boardSize) + 'px';

board.style.border = 'solid 1px black';

for (var i = 0; i < numkotakDatas; i++) {
	board.innerHTML += '<div class="kotakData"></div>'; 
};

var kotakDatas = document.getElementsByClassName("kotakData");

for (var i = 0; i < numkotakDatas; i++) {
	kotakDatas[i].style.height = '100px';
	kotakDatas[i].style.width = '100px';
	kotakDatas[i].style.float = "left";
	kotakDatas[i].style.lineHeight = "100px";
	kotakDatas[i].setAttribute("id", i.toString());
};

if (numkotakDatas % 2 !== 0) { 

	for (var i = 0; i < numkotakDatas; i += 2) { 
		kotakDatas[i].style.backgroundColor = customBackground;
	};
} else { 
	for (i = 0; i < numkotakDatas; i += 1) {
		if (CekGenap(i/boardSize)) { 
			for (var kotakDataNum = i; kotakDataNum < (i + boardSize); kotakDataNum += 2) {
				kotakDatas[kotakDataNum].style.backgroundColor = customBackground;	
			};
		} else if (cekSatu(i/boardSize)) { // make odd rows alternate color
			for (var kotakDataNum = i+1; kotakDataNum < (i + boardSize); kotakDataNum += 2) {
				kotakDatas[kotakDataNum].style.backgroundColor = customBackground;	
			};
		} else {
		};
	};
};

var indikatorGanti = document.getElementById("indikatorGanti")

indikatorGanti.style.color = "black";
indikatorGanti.innerHTML = "X's Turn";

var boardClicks = 0;

board.addEventListener("click", function() {
if (determineWinner()) { 
	indikatorGanti.style.color = "blue";
	indikatorGanti.innerHTML = winningPlayer[0] + ' WINS !';
} else if (CekGenap(boardClicks)) {
	indikatorGanti.style.color = "red";
	indikatorGanti.innerHTML = "O's Turn";
} else {
	indikatorGanti.style.color = "black";
	indikatorGanti.innerHTML = "X's Turn";
};
boardClicks++;
}); 

var kotakDataClicks = [];

for (var i = 0; i < numkotakDatas; i++) {
	kotakDataClicks[i] = 0;
};

var winningPlayer;

var determineWinner = function() {
	for (i = 0; i < numkotakDatas; i += 1) { 
		if ((i % boardSize) == 0) {
			var rowCheck = [];
			for (var kotakDataNum = i; kotakDataNum < (i + boardSize); kotakDataNum += 1) { 
				rowCheck.push(kotakDatas[kotakDataNum].innerHTML);
			};
			console.log('Row ' + i + ' is ' + rowCheck);
			console.log(cekMirip(rowCheck));

			if (cekMirip(rowCheck)) {
				winningPlayer = rowCheck; 
				return true;
			};
		};
	};
	for (i = 0; i < numkotakDatas; i += 1) { 
		if (i < boardSize) { 
			var colCheck = [];
			for (var kotakDataNum = i; kotakDataNum < numkotakDatas; kotakDataNum += boardSize) { 
				colCheck.push(kotakDatas[kotakDataNum].innerHTML);
			};
			console.log('Column ' + i + 'is ' + colCheck);
			console.log(cekMirip(colCheck));
			
			if (cekMirip(colCheck)) {
				winningPlayer = colCheck; 
				return true;
			};	
		};
	};
	var diag1Check = []; 
	for (i = 0; i < numkotakDatas; i += 1) { 
		if ((i % (boardSize + 1)) == 0) { 
			console.log(i)
			diag1Check.push(kotakDatas[i].innerHTML);
		};
	};
	console.log(diag1Check) 
	console.log(cekMirip(diag1Check));
	if (cekMirip(diag1Check)) { 
		winningPlayer = diag1Check; 
		return true;
	};
	var diag2Check = []; 
	for (i = (boardSize - 1); i < (numkotakDatas - 1); i += 1) { 
		if ((i % (boardSize - 1)) == 0) { 
			console.log(i)
			diag2Check.push(kotakDatas[i].innerHTML);
		};
	};
	console.log(diag2Check) 
	console.log(cekMirip(diag2Check));
	if (cekMirip(diag2Check)) { 
		winningPlayer = diag2Check; 
		return true;
	};
}; 

var countClicks = function() {
	var divID = this.getAttribute("id");
	kotakDataClicks[divID] += 1;
	if (CekGenap(boardClicks) && kotakDataClicks[divID] == 1) {
		this.innerHTML = 'X';
	} else if (cekSatu(boardClicks) && kotakDataClicks[divID] == 1) {
		this.innerHTML = 'O';
		this.style.color = "red";
	} else if (!determineWinner()){
		alert('Can"t move to this block.');
		boardClicks -= 1;
	} else {
	};
	if (determineWinner()) { 
		for (var i = 0; i < numkotakDatas; i++) {
			kotakDataClicks[i] = 2;
		};
		document.getElementById("submit_play").innerHTML = "Play Again ?"
	};
};

for (var i = 0; i < numkotakDatas; i++) {
	kotakDatas[i].addEventListener("click", countClicks);
};

}); 

}); 