const safeSerialize = require('./safe-serialize');
module.exports = function FetchSender(params) {
	'use strict';
	const {targetUrl, browserContext} = params,
		self = this;
	self.send = function (dataObject) {
		const headers = new browserContext.Headers();
		headers.append('Content-Type', 'text/plain'); // avoid CORS if possible
		return browserContext.fetch(targetUrl, {
			method: 'POST',
			body: safeSerialize(dataObject),
			headers: headers
		});
	};
};
