import { model, Schema } from 'mongoose';
import type { guildSetting } from 'src/structures/@types/database.js';

const settingSchema = new Schema<guildSetting>({
	guildID: { type: String },
	name: { type: String },
	logChannelID: { type: String, default: null },
	welcomeChannelID: { type: String, default: null },
	antiRaidMode: { type: Boolean, default: false },
	messageDeleteMode: { type: Boolean, default: false },
	messageBulkDeleteMode: { type: Boolean, default: false },
	messageUpdateMode: { type: Boolean, default: false },
});
export default model<guildSetting>('guild', settingSchema);
