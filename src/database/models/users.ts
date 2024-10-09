import type { user } from "#utils/types/database.js";
import { model, Schema } from "mongoose";
const UserSchema = new Schema<user>({
	guildID: { type: String },
	userID: { type: String },
	blacklisted: { type: Boolean, default: false },
	notes: [
		{
			note: { type: String, required: true },
			moderator: { type: String, required: true },
			date: { type: Date, default: Date.now }
		}
	],
	pet: {
		petName: { type: String, required: false },
		petType: { type: String, required: false },
		hunger: { type: Number, default: 100 },
		happiness: { type: Number, default: 100 },
		health: { type: Number, default: 100 },
		lastFed: { type: Date, default: Date.now },
		lastPlayed: { type: Date, default: Date.now },
		level: { type: Number, default: 1 },
		experience: { type: Number, default: 0 },
		skills: [{ type: String }],
		inventory: {
			medicine: [{ itemName: { type: String, required: true }, quantity: { type: Number, default: 1 } }],
			toys: [{ itemName: { type: String, required: true }, quantity: { type: Number, default: 1 } }],
			food: [{ itemName: { type: String, required: true }, quantity: { type: Number, default: 1 } }]
		}
	},
	coins: { type: Number, default: 0 },
	lastDaily: { type: Date, default: null },
	quests: [
		{
			questName: { type: String, required: true },
			completed: { type: Boolean, default: false },
			progress: { type: Number, default: 0 },
			reward: { type: String },
			expiryDate: { type: Date }
		}
	]
});

export default model<user>("user", UserSchema);
