import { PORT, status, roundResult } from "./utils.js";

export async function calc(operation, a, b) {
	const command = `http://localhost:${PORT()}/calc/${operation}/?a=${a}&b=${b}`
	status(`fetching ${command}`);
	const responses = await fetch(command);
	const results = await responses.json();
	const resultRounded = roundResult(results);
	status(`OK:${results.ok} - ${command}`);
	return resultRounded;
}
