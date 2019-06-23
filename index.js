#!/usr/bin/env node
'use strict';
const meow = require('meow');
const blameMyNetwork = require('./lib/index');

const helpText = `
Usage
  $ blamemynetwork <website>

Options
  --informative, -i  Include additional information for network
  --output-json, -j Log details in JSON format
Examples
  $ blamemynetwork http://theanubhav.com
`;
const cli = meow(helpText, {
	flags: {
		informative: {
			type: 'boolean',
			alias: 'i'
		},
		'output-json': {
			type: 'boolean',
			alias: 'j'
		}
	}
});

if (cli.input.length === 0) {
	console.error('Error: Please specify website to check');
	console.log(helpText);
	process.exit(1);
}

(async () => {
	let result = await blameMyNetwork(cli.input[0], { showMeta: cli.flags['i'] });
	if (cli.flags['j']) {
		console.log(result);
	} else {
		console.log(result.reason);
		if (cli.flags['i']) {
			console.log(`Additional Details : ${JSON.stringify(result.meta, null, 4)}`);
		}
	}
	process.exit(result.status ? 0 : 2);
})();
