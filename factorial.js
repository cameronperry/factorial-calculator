//SETUP SIMPLE WORKER
const workerFactorialSimple = new Worker('factorialSimple.js');
const [simpleValue, simpleTime, simpleOutput] = getDomNodes(document.getElementById('Factorial-Simple'));
workerFactorialSimple.onmessage = function(e) {
	simpleValue.innerHTML = e.data.value;
	simpleTime.innerHTML = e.data.time;
	simpleOutput.innerHTML = e.data.result;
}

//SETUP COMPLEX WORKER
const workerFactorialComplex = new Worker('factorialComplex.js');
const [complexValue, complexTime, complexOutput, complexLength] = getDomNodes(document.getElementById('Factorial-Complex'));
workerFactorialComplex.onmessage = function(e) {
	complexValue.innerHTML = e.data.value;
	complexTime.innerHTML = e.data.time;
	complexLength.innerHTML = e.data.length;
	complexOutput.innerHTML = e.data.result;
}

//SETUP INPUT KEY UP BINDING
const input = document.getElementById('Factorial-Input');
input.onkeyup = function() {
	const value = input.value;
	const intValue = parseInt(value, 10);
	if (String(intValue) === value) {
		const reset = {data: {value: value, result: 'Calculating...', time: '...', length: '...'}};
		workerFactorialSimple.onmessage(reset);
	  	workerFactorialSimple.postMessage(intValue);
		workerFactorialComplex.onmessage(reset);
	  	workerFactorialComplex.postMessage(intValue);
	}
}

//FUNCTION USED TO BINDING TO DOM NODES
function getDomNodes(parentElement) {
	return [
		parentElement.getElementsByClassName('Factorial-Result-Metric-Value')[0],
		parentElement.getElementsByClassName('Factorial-Result-Metric-Time')[0],
		parentElement.getElementsByClassName('Factorial-Result-Output')[0],
		parentElement.getElementsByClassName('Factorial-Result-Metric-Length')[0]
	];
}
