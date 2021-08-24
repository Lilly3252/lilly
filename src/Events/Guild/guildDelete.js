const Event = require('../../Structures/Event.js');
const mongoose = require('mongoose');
const Guild = require('../../Database/models/Guild');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: false
		});
    }
    run(guild){
        /*Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if(err) console.error(err)*/
        console.log('I have been removed from a server!');
    };
}



