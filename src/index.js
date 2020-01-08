const Recorder = require('./recorder'),
	SafeStorageAdapter = require('./safe-storage-adapter'),
	TimerDateAdapter = require('./timer-date-adapter');

module.exports = function configureAn2 (browserWindow, config) {
	'use strict';
	const storage = new SafeStorageAdapter(browserWindow.localStorage),
		timer = new TimerDateAdapter(browserWindow.Date),
		sender = Object(),
		recorder = new Recorder({storage, sender, config, timer});
	return recorder;
};
