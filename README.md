# Overview

This is a vanilla JavaScript example showing how to compute a factorial beyond the browsers limits. Factorial 171 would return `Infinity` in most JavaScript implementations, but using a few tricks it is possible to compute beyond factorial 10,000 accurately.

The following core technologies are used:

* Array of Digits for Large Math Computations
* Web Workers for Asynchronous Calculations
* ES2015 so use a modern browser!

Since this uses Web Workers you will not be able to launch this with the file:// approach in a browser without editing browser configuration. It is recommended you host this through localhost or upload to a server. This was only tested on Chrome.

To view a live example, go to the following URL: <http://cameronperry.com/examples/factorial-calculator/>

# Methodology

There are two ideas behind the computation of large factorials, and handling large numbers in any programming language.

1. The main concept used is an array of digits. Each digit of the number is broken into an element in an array, kind of like representing the number as a string rather than a 32 bit or 64 bit integer. This allows us to go beyond the maximum supported value of those integers. This makes doing math more difficult though, using techniques from grade school to do long multiplication which is cumbersome to code.

2. The way the digits are implemented in the array are in reverse order. This makes the calculation simpler in the case of arrays being different lengths. If the least significant digit is the last item in the array, then you have to do weird computations to either normalize the array lengths for numbers with different amounts of digits, or have extra logic to compute this difference.

 It is much easier to have the least significant digit as the first item in the array, and then any digits added from multiplication or addition can be pushed onto the end of the array. 

 This is a really simple example without worrying about carrying, but try adding the numbers 1000 and 21 together.

 ```
A = [1,0,0,0]
B = [2,1]
A + B = [A[0], A[1], A[2] + B[0], A[3] + B[1]]
```

 Versus


 ```
A = [0,0,0,1]
B = [1,2]
A + B = [A[0] + B[0], A[1] + B[1], A[2], A[3]]
```

 One of them has indexes that match, and the other has an offset based on the differences in lengths of digits.

# Conclusion

I am sure my factorial algorithm is not optimized to its full potential, but this is a great example of how one can bypass limitations of a 32 or 64 bit integer in pretty much any programming language to push algorithms to their limits. I hope this was useful!
