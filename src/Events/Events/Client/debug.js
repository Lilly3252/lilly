const Event = require("../../Structures/Event.js");

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			once: false
		});
	}
	run(info) {
		//console.log(
		// `DEBUG: Info: ${info} websocket status: ${this.client.ws.status} `
		// );
	}
};
