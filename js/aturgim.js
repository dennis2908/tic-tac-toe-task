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
	 document.getElementById('ukuran_data').value = 2;
	 location.reload()
 }
  
document.addEventListener('DOMContentLoaded', function() {


var optionsButton = document.getElementById("submit_play");

optionsButton.addEventListener("click", function(){
	

var papanKOSize = parseInt(document.getElementById("ukuran_data").value);

var minpapanKOSize = parseInt(document.getElementById("ukuran_data").min);

var maxpapanKOSize = parseInt(document.getElementById("ukuran_data").max);

if(papanKOSize < minpapanKOSize || papanKOSize > maxpapanKOSize){
	
	alert("papanKO Type size must be larger than "+minpapanKOSize+" and smaller than "+maxpapanKOSize);
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
    } 
	else 
	{
    	return array.every(function(element) {
        	return element == first;
    	});
    };
};

var backdasar = '#eeeeee';


var gimpapanKO = [];

var numkotakDatas = (papanKOSize * papanKOSize);

for (var i = 0; i < numkotakDatas; i++) {
	gimpapanKO.push(i);
};

document.getElementById("gim").innerHTML = '<div id="tic-tac"></div>';

var papanKO = document.getElementById("tic-tac");

papanKO.style.margin = '0 auto';

papanKO.style.height = (100 * papanKOSize) + 'px';
papanKO.style.width = (100 * papanKOSize) + 'px';

papanKO.style.border = 'solid 1px black';

for (var i = 0; i < numkotakDatas; i++) {
	papanKO.innerHTML += '<div class="kotakData"></div>'; 
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
		kotakDatas[i].style.backgroundColor = backdasar;
	};
} else { 
	for (i = 0; i < numkotakDatas; i += 1) {
		if (CekGenap(i/papanKOSize)) { 
			for (var kotakDataNum = i; kotakDataNum < (i + papanKOSize); kotakDataNum += 2) {
				kotakDatas[kotakDataNum].style.backgroundColor = backdasar;	
			};
		} else if (cekSatu(i/papanKOSize)) {
			for (var kotakDataNum = i+1; kotakDataNum < (i + papanKOSize); kotakDataNum += 2) {
				kotakDatas[kotakDataNum].style.backgroundColor = backdasar;	
			};
		} else {
		};
	};
};

var indikatorGanti = document.getElementById("indikatorGanti")

indikatorGanti.style.color = "black";
indikatorGanti.innerHTML = "X's Turn";

var klikGG = 0;

papanKO.addEventListener("click", function() {
if (pemenang()) { 
	indikatorGanti.style.color = "blue";
	indikatorGanti.innerHTML = pemainW[0] + ' WINS !';
} else if (CekGenap(klikGG)) {
	indikatorGanti.style.color = "red";
	indikatorGanti.innerHTML = "O's Turn";
} else {
	indikatorGanti.style.color = "black";
	indikatorGanti.innerHTML = "X's Turn";
};
klikGG++;
}); 

var kotakDataClicks = [];

for (var i = 0; i < numkotakDatas; i++) {
	kotakDataClicks[i] = 0;
};

var pemainW;

var pemenang = function() {
	for (i = 0; i < numkotakDatas; i += 1) { 
		if ((i % papanKOSize) == 0) {
			var cekCR = [];
			for (var kotakDataNum = i; kotakDataNum < (i + papanKOSize); kotakDataNum += 1) { 
				cekCR.push(kotakDatas[kotakDataNum].innerHTML);
			};
		
			if (cekMirip(cekCR)) {
				pemainW = cekCR; 
				return true;
			};
		};
	};
	for (i = 0; i < numkotakDatas; i += 1) { 
		if (i < papanKOSize) { 
			var cekCL = [];
			for (var kotakDataNum = i; kotakDataNum < numkotakDatas; kotakDataNum += papanKOSize) { 
				cekCL.push(kotakDatas[kotakDataNum].innerHTML);
			};
			
			if (cekMirip(cekCL)) {
				pemainW = cekCL; 
				return true;
			};	
		};
	};
	var diag1Check = []; 
	for (i = 0; i < numkotakDatas; i += 1) { 
		if ((i % (papanKOSize + 1)) == 0) { 
			diag1Check.push(kotakDatas[i].innerHTML);
		};
	};
	if (cekMirip(diag1Check)) { 
		pemainW = diag1Check; 
		return true;
	};
	var cekGT = []; 
	for (i = (papanKOSize - 1); i < (numkotakDatas - 1); i += 1) { 
		if ((i % (papanKOSize - 1)) == 0) { 
			cekGT.push(kotakDatas[i].innerHTML);
		};
	};
	if (cekMirip(cekGT)) { 
		pemainW = cekGT; 
		return true;
	};
}; 

var countClicks = function() {
	var divID = this.getAttribute("id");
	kotakDataClicks[divID] += 1;
	if (CekGenap(klikGG) && kotakDataClicks[divID] == 1) {
		this.innerHTML = 'X';
	} else if (cekSatu(klikGG) && kotakDataClicks[divID] == 1) {
		this.innerHTML = 'O';
		this.style.color = "red";
	} else if (!pemenang()){
		alert('Can"t move to this block.');
		klikGG -= 1;
	} else {
	};
	if (pemenang()) { 
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