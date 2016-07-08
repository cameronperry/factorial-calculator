//FUNCTION USED TO BINDING TO DOM NODES
const getDomNodes = (parentElement) => {
  return [
    parentElement.querySelector('.Factorial-Result-Metric-Value'),
    parentElement.querySelector('.Factorial-Result-Metric-Time'),
    parentElement.querySelector('.Factorial-Result-Output'),
    parentElement.querySelector('.Factorial-Result-Metric-Length')
  ];
}

//FUNCTION UPDATE DOM NODES
const updateDomNodes = (data, parent) => {
  const [valueNode, timeNode, outputNode, lengthNode] = getDomNodes(parent);
  valueNode.innerHTML = data.value;
  timeNode.innerHTML = data.time;
  outputNode.innerHTML = data.result;
  if (lengthNode) {
    lengthNode.innerHTML = data.length;
  }
}

//SETUP SIMPLE WORKER
const workerFactorialSimple = new Worker('factorialSimple.js');
const factorialSimpleNode = window['Factorial-Simple'];
workerFactorialSimple.onmessage = (e) => {
  updateDomNodes(e.data, factorialSimpleNode);
}

//SETUP COMPLEX WORKER
const workerFactorialComplex = new Worker('factorialComplex.js');
const factorialComplexNode = window['Factorial-Complex'];
workerFactorialComplex.onmessage = (e) => {
  button.disabled = false;
  updateDomNodes(e.data, factorialComplexNode);
}

//SETUP INPUT KEY UP BINDING
const input = window['Factorial-Input'];
const button = window['Factorial-Button'];
button.onclick = () => {
  const intValue = parseInt(input.value, 10);
  if (~~input.value === intValue) {
    const data = {value: intValue, result: 'Calculating...', time: '...', length: '...'};
    button.disabled = true;
    updateDomNodes(data, factorialSimpleNode);
    updateDomNodes(data, factorialComplexNode);
    workerFactorialSimple.postMessage(intValue);
    workerFactorialComplex.postMessage(intValue);
  }
}
