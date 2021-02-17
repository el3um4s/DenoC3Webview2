"use strict";



{
	const scriptsInEvents = {

		async EventSheet1_Event2_Act1(runtime, localVars)
		{
			console.log("Button clicked");
			let result = "fetching http://localhost:8081/?id=hello&message=world"
			runtime.objects.Status.getFirstInstance().text = result;
			runtime.objects.ResultTestA.getFirstInstance().text = result;
			fetch(`http://localhost:8081/?id=hello&message=world`)
			  .then((responses) => responses.json())
			  .then((results) => {
			    console.log(results);
				result = results.results;
				runtime.objects.ResultTestA.getFirstInstance().text = result;
				runtime.objects.Status.getFirstInstance().text = `OK:${results.ok} - http://localhost:8081/?id=hello&message=world`;
			});
		},

		async EventSheet1_Event3_Act1(runtime, localVars)
		{
			console.log("Button clicked");
			
			const operation = choose("addition","subtraction","multiplication","division","remainder","exponent");
			const operator = {
				addition: '+',
				subtraction: '-',
				multiplication: '*',
				division: '/',
				remainder: '%',
				exponent: '**'
			};
			runtime.objects.Operation.getFirstInstance().text = operator[operation];
			
			const min = 1;
			const max = operation != "exponent" ? 1000 : 10
			
			const randomA = getRandomIntInclusive(min,max);
			runtime.objects.RandomA.getFirstInstance().text = `${randomA}`;
			
			const randomB = getRandomIntInclusive(min,max);
			runtime.objects.RandomB.getFirstInstance().text =  `${randomB}`;
			
			const command = `http://localhost:8081/${operation}/?a=${randomA}&b=${randomB}`
			runtime.objects.Status.getFirstInstance().text = `fetching ${command}`;
			
			
			const responses = await fetch(command);
			const results = await responses.json();
			console.log(results);
			const resultRounded = operation === "division" ? parseFloat(results.results).toFixed(2) : results.results;
			runtime.objects.OperationResult.getFirstInstance().text = `${resultRounded}`;
			runtime.objects.ResultTestB.getFirstInstance().text = `${results.operation}(${results.a}; ${results.b}) = ${resultRounded}`;
			runtime.objects.Status.getFirstInstance().text = `OK: ${results.ok} - ${command}`;
			
			
			function getRandomIntInclusive(min, max) {
			  min = Math.ceil(min);
			  max = Math.floor(max);
			  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
			}
			
			function choose(...args) {
			    const index = Math.floor(Math.random() * args.length);
			    return args[index]
			}
			
		},

		async EventSheet1_Event4_Act1(runtime, localVars)
		{
			console.log("Button clicked");
			
			const min = 1;
			const max = 100;
			
			const randomA = getRandomIntInclusive(min,max);
			const randomB = getRandomIntInclusive(min,max);
			
			const command = `http://localhost:8081/random-operation?a=${randomA}&b=${randomB}`
			runtime.objects.Status.getFirstInstance().text = `fetching ${command}`;
			
			
			const responses = await fetch(command);
			const results = await responses.json();
			console.log(results);
			const resultRounded = results.operation === "division" ? parseFloat(results.results).toFixed(2) : results.results;
			runtime.objects.OperationResult.getFirstInstance().text = `${resultRounded}`;
			runtime.objects.ResultTestC.getFirstInstance().text = `${results.operation}(${results.a}; ${results.b}) = ${resultRounded}`;
			runtime.objects.Status.getFirstInstance().text = `OK: ${results.ok} - ${command}`;
			
			
			function getRandomIntInclusive(min, max) {
			  min = Math.ceil(min);
			  max = Math.floor(max);
			  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
			}
		},

		async EventSheet1_Event5_Act1(runtime, localVars)
		{
			console.log("Button clicked");
			const command = `http://localhost:8081/?id=Ciao&message=Mondo`
			runtime.objects.Status.getFirstInstance().text = `fetching ${command}`;
			
			const responses = await fetch(command);
			const results = await responses.json();
			console.log(results);
			runtime.objects.ResultTestD.getFirstInstance().text = results.results;
			runtime.objects.Status.getFirstInstance().text = `OK:${results.ok} - ${command}`;
		},

		async EventSheet1_Event6_Act1(runtime, localVars)
		{
			console.log("Button clicked");
			const command = `http://localhost:8081/close`
			runtime.objects.Status.getFirstInstance().text = `fetching ${command}`;
			
			const responses = await fetch(command);
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
