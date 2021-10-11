const Event = require('../../Structures/Event.js');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	run() {
		console.log([
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands!`,
			`Loaded ${this.client.events.size} events!`
		].join('\n'));

		const activities =
			`${this.client.guilds.cache.size} servers!`
			

		let i = 0;
		setInterval(() => this.client.user.setActivity(`/help | ${activities}`, { type: 'WATCHING' }), 15000);
	}

};
