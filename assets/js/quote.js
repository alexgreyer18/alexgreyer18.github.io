function showDiv(e){
	document.getElementById("residential").style.display = "none";
	document.getElementById("commercial").style.display = "none";
	document.getElementById("corporate").style.display = "none";
	document.getElementById("hybrid").style.display = "none";
	document.getElementById('serviceFeeReadonly').value = '';

    if (e.value == 1) {
		document.getElementById("residential").style.display = "block";
	}
	else if (e.value == 2) {
		document.getElementById("commercial").style.display = "block";
	}
	else if (e.value == 3) {
		document.getElementById("corporate").style.display = "block";
	}
	else if (e.value == 4) {
		document.getElementById("hybrid").style.display = "block";
	}


	/*
		Cleaner
	*/
	var inputArray = document.getElementsByClassName('cleaner');

	for (let i = 0; i < inputArray.length; i++) {
		const element = inputArray[i];
		element.value = "";
	}

	document.getElementsByClassName("cleanerSelect")[0].value = '0';
}

var noOfCages;
var serviceFeeSelected;
var installationFeeSelected;

//Residential

function calPrices() {
	let avrgApF = (document.getElementById('noApprt').value / document.getElementById('noFloors').value);
	let noShafts = Math.ceil((document.getElementById('noFloors').value / 20));
	let noCagesTemp = Math.ceil(avrgApF / 6);;
	let noRecomCages = noCagesTemp * noShafts;

	document.getElementById('noShaft').value = noShafts;
	document.getElementById('noCages3').value = noRecomCages;
	noOfCages = noRecomCages;
	serviceFee(null);

	if((document.getElementById('noApprt').value === '' || document.getElementById('noApprt').value == 0) || (document.getElementById('noFloors').value === '' || document.getElementById('noFloors').value == 0) ){
		document.getElementById('hiddenInputShaft').style.display = "none";
		document.getElementById('hiddenInputCages').style.display = "none";
	}else{
		document.getElementById('hiddenInputShaft').style.display = "block";
		document.getElementById('hiddenInputCages').style.display = "block";
	}
}

//Comercial
function showCagesCorp(e) {
	if (e.value !== '') {
		document.getElementById('hiddenInputCages2').style.display = "block";
		document.getElementById('noCages').value = e.value;
		noOfCages = e.value;
		serviceFee(null);
	}else{
		document.getElementById('hiddenInputCages2').style.display = "none";
		document.getElementById('noCages').value = '';
	}

}


//Corporate

function showOccupants(e) {
	if (e.value !== null) {
		document.getElementById('totOcc').value = e.value * (parseInt(document.getElementById('numFloors').value) + parseInt(document.getElementById('numBasements').value));
	}
	else{
		document.getElementById('totOcc').value = '';
	}

}

function showOccElev(e) {
	if (e.value !== null) {
		// console.log(e.value);
		result = Math.ceil(document.getElementById('totOcc').value / 1000);
		document.getElementById('elev').value = result
		showTotElev(result)
	}else{
		document.getElementById('elev').value = '';
	}

}

function showShaftsCorp(e) {
	if (e.value !== null) {
		document.getElementById('numShafts').value = Math.ceil( (parseInt(document.getElementById('numBasements').value) + parseInt(document.getElementById('numFloors').value)) / 20 ) ;
	}
	else{
		document.getElementById('numShafts').value = '';
	}
}

function showTotElev(nb_elev) {
	console.log("test")
	console.log(nb_elev)
	if (nb_elev !== null) {
		noOfCages = Math.ceil( nb_elev / parseInt(document.getElementById('numShafts').value));
		document.getElementById('totElev').value = noOfCages * noOfCages ;
		serviceFee(null);
	}
	else{
		document.getElementById('totElev').value = '';
	}
}

//Hybrid
function calcHybridElevatord() {
	let totalOcupants = document.getElementById("noOcupantPFHy").value * (parseInt(document.getElementById('noFloorsHy').value) + parseInt(document.getElementById('noBasementsHy').value));
	document.getElementById('elevHy').value = totalOcupants / 1000;
	document.getElementById('noShaftsHy').value = Math.ceil((parseInt(document.getElementById('noFloorsHy').value) + parseInt(document.getElementById('noBasementsHy').value)) / 20);
	noOfCages = Math.ceil(parseInt(document.getElementById("elevHy").value) / parseInt(document.getElementById("noShaftsHy").value));
	document.getElementById('totElevHy').value = noOfCages;
	serviceFee(null);
}


// Fees

function serviceFee(e){
	if(e != null){
		serviceFeeSelected = parseInt(e.value);
	}
	let prices = [7565, 12345, 15400];
	document.getElementById('serviceFeeReadonly').value = noOfCages * prices[serviceFeeSelected];
	installationFee(null);
}
function installationFee(e){
	if(e != null){
		installationFeeSelected = parseInt(e.value);
	}
	let percentages = [10, 13, 16];
	document.getElementById('percentage').innerText = percentages[installationFeeSelected];
	let percentagePrice = parseInt(document.getElementById('serviceFeeReadonly').value) * (percentages[installationFeeSelected] / 100);
	document.getElementById("installationFeeReadonly").value = parseInt(document.getElementById('serviceFeeReadonly').value) + percentagePrice;
}

//Max hours of activity
$('document').ready(
    function() {
        for (let i = 1; i < 25; i++) {
            var option = document.createElement('option');
            var text = document.createTextNode(i);
            option.appendChild(text);
            document.getElementById('selectOne').append(option);
        }
    }
);