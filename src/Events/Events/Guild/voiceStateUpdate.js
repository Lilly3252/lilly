const Event = require("../../Structures/Event.js");
module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			once: false
		});
	}
	run(oldState, newState) {
		console.log(
			`${oldState.member.id} (${oldState.member.user.tag}) on ${oldState.channelID} Named : ${
				oldState.channel ? oldState.channel.name : null
			} been moved to ${newState.channelID} Named : ${newState.channel ? newState.channel.name : null}`
		);

		//get a message on a specific channel on connection V

		/*if(newState.channelID === '751501408213401655'){
		if(newState.channelID === null){return}
		else{
			let channel = newState.guild.channels.cache.get("830567001394642954")
			channel.send("it's working!")}
}*/
	}
};
