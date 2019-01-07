//test file for jsdoc

/**
 * comp function with no return
 */
function compFunc() {
	console.log("comp func called");
}

/**
 * function with param
 * @param {int} val the value
 */
function paramFunc(val) {
	console.log("param func given: " + val);
}

/**
 * function with return
 * @returns {int}
 */
function retFunc() {
	console.log("return func called");
	return 5
}
