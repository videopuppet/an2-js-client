module.exports = function Recorder(params) {
	'use strict';
	const {storage, sender, config, timer} = params,
		self = this;
	self.event = function (eventName, eventData) {
		const monthProperty = `${config.propertyPrefix}-month`,
			dateProperty = `${config.propertyPrefix}-date`,
			month = timer.getMonth(),
			date = timer.getDate(),
			storedMonth = storage.getItem(monthProperty),
			storedDate = storage.getItem(dateProperty),
			toSend = {
				event: eventName
			};
		if (storedMonth !== month) {
			toSend.uniqueMonth = 1;
			storage.setItem(monthProperty, month);
		}
		if (storedDate !== date) {
			toSend.uniqueDate = 1;
			storage.setItem(dateProperty, date);
		}
		return sender.send(Object.assign(toSend, eventData));
	};
};
