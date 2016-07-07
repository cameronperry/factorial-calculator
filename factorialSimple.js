function factorial(value) {
	//SETUP
	let result = 1;

	//COMPUTE
	for (let iteration = 1; iteration <= value; iteration++) {
		result *= iteration;
	}

	//OUTPUT
	return result;
}

this.onmessage = function(e) {
	const timeStart = new Date().getTime();
	const result = factorial(e.data);
	const timeEnd = new Date().getTime();
	postMessage({
		value: e.data,
		time: (timeEnd - timeStart) / 1000,
		result: result
	});
}
