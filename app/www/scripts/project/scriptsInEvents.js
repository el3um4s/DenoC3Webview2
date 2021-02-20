"use strict";

import { PORT, log, status, getRandomIntInclusive, randomOperation, operator, roundResult } from "./utils.js";


{
	const scriptsInEvents = {

		async EventSheet1_Event1_Act2(runtime, localVars)
		{
			window.addEventListener('beforeunload', async (e) => {
				e.preventDefault();
			 	const command = `http://localhost:${PORT()}/close`;
			 	status(`fetching ${command}`);
				await fetch(command);
			});
		},

		async EventSheet1_Event2_Act1(runtime, localVars)
		{
			const first = "Hello";
			const second = "World!"
			const command = `http://localhost:${PORT()}/?first=${first}&second=${second}`
			
			status(`fetching ${command}`);
			
			fetch(command)
			  .then((responses) => responses.json())
			  .then((results) => {
			  	log("ResultTestA", results.results);
				status(`OK:${results.ok} - ${command}`);
			});
		},

		async EventSheet1_Event3_Act1(runtime, localVars)
		{
			const operation = randomOperation();
			const min = 1;
			const max = operation != "exponent" ? 1000 : 10
			const randomA = getRandomIntInclusive(min,max);
			const randomB = getRandomIntInclusive(min,max);
			const command = `http://localhost:${PORT()}/${operation}/?a=${randomA}&b=${randomB}`
			
			log("Operation", operator[operation]);
			log("RandomA", randomA);
			log("RandomB", randomB);
			status(`fetching ${command}`);
			
			const responses = await fetch(command);
			const results = await responses.json();
			const resultRounded = roundResult(results);
			
			log("OperationResult", resultRounded);
			log("ResultTestB", `${results.operation}(${results.a}; ${results.b}) = ${resultRounded}`);
			status(`OK:${results.ok} - ${command}`);
		},

		async EventSheet1_Event4_Act1(runtime, localVars)
		{
			const min = 1;
			const max = 100;
			const randomA = getRandomIntInclusive(min,max);
			const randomB = getRandomIntInclusive(min,max);
			const command = `http://localhost:${PORT()}/random-operation?a=${randomA}&b=${randomB}`
			
			status(`fetching ${command}`);
			
			const responses = await fetch(command);
			const results = await responses.json();
			const resultRounded = roundResult(results);
			
			log("ResultTestC", `${results.operation}(${results.a}; ${results.b}) = ${resultRounded}`);
			status(`OK:${results.ok} - ${command}`);
		},

		async EventSheet1_Event5_Act1(runtime, localVars)
		{
			const command = `http://localhost:${PORT()}/`;
			
			status(`fetching ${command}`);
			
			const responses = await fetch(command);
			const results = await responses.json();
			
			log("ResultTestD", results.results);
			status(`OK:${results.ok} - ${command}`);
		},

		async EventSheet1_Event6_Act1(runtime, localVars)
		{
			const operation = randomOperation();
			const min = 1;
			const max = operation != "exponent" ? 1000 : 10
			const randomA = getRandomIntInclusive(min,max);
			const randomB = getRandomIntInclusive(min,max);
			const command = `http://localhost:${PORT()}/calc/${operation}/?a=${randomA}&b=${randomB}`
			
			log("Operation2", operator[operation]);
			log("RandomA2", randomA);
			log("RandomB2", randomB);
			status(`fetching ${command}`);
			
			const responses = await fetch(command);
			const results = await responses.json();
			const resultRounded = roundResult(results);
			
			log("OperationResult2", resultRounded);
			log("ResultTestB2", `${results.operation}(${results.a}; ${results.b}) = ${resultRounded}`);
			status(`OK:${results.ok} - ${command}`);
		},

		async EventSheet1_Event7_Act1(runtime, localVars)
		{
			const command = `http://localhost:${PORT()}/close`
			status(`fetching ${command}`);
			
			await fetch(command);
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
