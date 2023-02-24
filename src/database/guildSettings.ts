import { model, Schema } from 'mongoose';
import type { guildSetting, links } from '#type/database.js';

const settingSchema = new Schema<guildSetting>({
	guildID: { type: String },
	name: { type: String },
	logChannelID: { type: String, default: null },
	welcomeChannelID: { type: String, default: null },
	antiRaidMode: { type: Boolean, default: false },
	messageDeleteMode: { type: Boolean, default: false },
	messageBulkDeleteMode: { type: Boolean, default: false },
	messageUpdateMode: { type: Boolean, default: false },
	urlLinkDetection: { type: Boolean, default: false },
	urlLinks: { type: Map<String, links> },
});
export default model<guildSetting>('guild', settingSchema);
