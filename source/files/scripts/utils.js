export function PORT() {
	return g_runtime.globalVars.PORT;
}

export function log(objName, message) {
	const inst = g_runtime.objects[objName];
	inst.getFirstInstance().text = `${message}`;
}

export function status(message) {
	log("Status", message);
}

export function roundResult(results) {
	return results.operation === "division" ? parseFloat(results.results).toFixed(2) : results.results;
}

export function choose(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index]
}

export function getRandomIntInclusive(min, max) {
 	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomOperation() {
	return choose(
			"addition",
			"subtraction",
			"multiplication",
			"division",
			"remainder",
			"exponent"
			);

}

export const operator = {
	addition: '+',
	subtraction: '-',
	multiplication: '*',
	division: '/',
	remainder: '%',
	exponent: '**'
};