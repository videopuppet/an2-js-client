module.exports = function TimerDateAdapter(DateConstructor) {
	'use strict';
	const self = this;
	if (!DateConstructor) {
		throw new Error('invalid-args');
	}
	self.getDate = () => new DateConstructor().toISOString().substring(0, 10);
	self.getMonth = () => new DateConstructor().toISOString().substring(0, 7);
};
