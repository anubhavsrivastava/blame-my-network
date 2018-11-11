const isUp = require('is-up');
const got = require('got');
const defaultOptions = {
	showMeta: false
};

const blameMyNetwork = async (site, opts = {}) => {
	if (!site) {
		return new Error('Please specify site URL');
	}
	opts = Object.assign({}, defaultOptions, opts);
	const requestStack = {};
	const _generateResponse = (status, reason) => {
		if (opts.showMeta) {
			return Object.assign({}, { meta: requestStack }, { status, reason });
		} else {
			return Object.assign({}, { status, reason });
		}
	};

	try {
		requestStack.externalConnection = false;
		let foreignNetworkResult = await isUp(site);
		requestStack.externalConnection = foreignNetworkResult;
		requestStack.externalConnectionReason = foreignNetworkResult ? 'Success' : 'Failure';
	} catch (error) {
		if (error.code === 'ENOTFOUND') {
			requestStack.externalConnectionReason = "Either site doesn't exists or you are not connected to internet";
		} else if (error.message === 'Invalid domain') {
			return _generateResponse(false, 'You have entered Invalid domain');
		} else {
		}
		requestStack.externalConnectionReason = `${error.code ? error.code : error.name} : ${error.message}`;
	}

	try {
		requestStack.internalConnection = false;
		let internalNetworkResult = await got(site, { timeout: 5000 });
		requestStack.internalConnection = true;
		requestStack.internalConnectionTimings = internalNetworkResult.timings;
		requestStack.internalConnectionReason = internalNetworkResult ? 'Success' : 'Failue';
	} catch (error) {
		if (error.code === 'ENOTFOUND') {
			requestStack.internalConnectionReason = "Either site doesn't exists or you are not connected to internet";
		} else {
			requestStack.internalConnectionReason = `${error.code ? error.code : error.name} : ${error.message}`;
		}
	}

	//should only let the user know that his network could not access the website
	if (requestStack.externalConnection) {
		if (requestStack.internalConnection) {
			return _generateResponse(true, 'Connection successful from both, internal and external network.');
		} else {
			return _generateResponse(false, 'Blame you network. The external network can acess the site.');
		}
	} else {
		if (requestStack.internalConnection) {
			return _generateResponse(false, 'Only internal network could access the site.');
		} else {
			return _generateResponse(false, 'Connection failure from both, internal and external network');
		}
	}
};

module.exports = blameMyNetwork;
