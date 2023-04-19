import type { guildSetting, links } from '#type/database.js';
import { model, Schema } from 'mongoose';

const settingSchema = new Schema<guildSetting>({
	name: { type: String },
	guildID: { type: String },
	urlLinks: { type: Map<String, links> },
	antiRaid: { type: Boolean, default: false },
	botUpdate: { type: Boolean, default: false },
	auditLogEvent: { type: Boolean, default: false },
	roleUpdate: { type: Boolean, default: false },
	threadUpdate: { type: Boolean, default: false },
	logChannelID: { type: String, default: null },
	guildUpdate: { type: Boolean, default: false },
	emojiUpdate: { type: Boolean, default: false },
	memberUpdate: { type: Boolean, default: false },
	inviteUpdate: { type: Boolean, default: false },
	messageUpdate: { type: Boolean, default: false },
	channelUpdate: { type: Boolean, default: false },
	stickerUpdate: { type: Boolean, default: false },
	webhookUpdate: { type: Boolean, default: false },
	autoModeration: { type: Boolean, default: false },
	welcomeChannelID: { type: String, default: null },
	integrationUpdate: { type: Boolean, default: false },
	urlLinkDetection: { type: Boolean, default: false },
	commandPermission: { type: Boolean, default: false },
	stageInstanceUpdate: { type: Boolean, default: false },
	guildScheduledUpdate: { type: Boolean, default: false },
});
export default model<guildSetting>('guild', settingSchema);
