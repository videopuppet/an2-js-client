const Recorder = require('./recorder'),
	SafeStorageAdapter = require('./safe-storage-adapter'),
	FetchSender = require('./fetch-sender'),
	TimerDateAdapter = require('./timer-date-adapter');

module.exports = function configureAn2 (browserContext, config) {
	'use strict';
	const storage = new SafeStorageAdapter(browserContext.localStorage),
		timer = new TimerDateAdapter(browserContext.Date),
		sender = new FetchSender({config, browserContext}),
		recorder = new Recorder({storage, sender, config, timer});
	return recorder;
};
