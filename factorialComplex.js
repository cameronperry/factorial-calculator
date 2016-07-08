const factorial = (value) => {
  //SETUP
  let result = [1]; //result array base 10

  //COMPUTE
  for (let iteration = 1; iteration <= value; iteration++) {

    //SETUP THE ARRAY TO STORE THE MULTIPLICATION RESULT
    const multiplyResult = [];

    //LOOP THROUGH DIGITS IN ITERATION VALUE
    for (let digitIndex = 0; digitIndex <= Math.log10(iteration); digitIndex++) {

      //GET THE DIGIT, STARTING WITH LOWEST POWER OF 10
      const digit = Math.floor((iteration % Math.pow(10,digitIndex + 1)) / Math.pow(10,digitIndex));

      //MULTIPLY THAT DIGIT WITH THE RESULT
      let carryOver = 0;
      for (let multiplyIndex = 0; multiplyIndex < result.length; multiplyIndex++) {

        //MULTIPLY THE DIGIT BY THE RESULT AND ADD ONTO THE MULTIPLY RESULT ARRAY
        const currentValue = multiplyResult[digitIndex + multiplyIndex] || 0;
        const addValue = digit * result[multiplyIndex] + carryOver;
        multiplyResult[digitIndex + multiplyIndex] = currentValue + addValue;

        //GET CARRY OVER FOR NEXT ITERATION
        if (multiplyResult[digitIndex + multiplyIndex] >= 10) {
          carryOver = Math.floor((multiplyResult[digitIndex + multiplyIndex]) / 10);
          multiplyResult[digitIndex + multiplyIndex] = multiplyResult[digitIndex + multiplyIndex] % 10;
        } else {
          carryOver = 0;
        }
      }

      //IF CARRY OVER DEFINED, ADD TO END OF ARRAY
      if (carryOver > 0) {
        multiplyResult.push(carryOver);
      }
    }

    //ASSIGN THE MULTIPLICATION RESULT TO THE RESULT ARRAY
    result = multiplyResult;
  }

  //OUTPUT
  return result.reverse().join('');
}

this.onmessage = (e) => {
  const timeStart = new Date().getTime();
  const result = factorial(e.data);
  const timeEnd = new Date().getTime();
  postMessage({
    value: e.data,
    time: (timeEnd - timeStart) / 1000,
    length: result.length,
    result: result
  });
}
