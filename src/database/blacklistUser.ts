import { model, Schema } from 'mongoose';
import type { blacklistUsers } from 'src/structures/@types/database.js';

const blacklist = new Schema<blacklistUsers>({
	guildID: { type: String },
	ID: { type: String },
	reason: { type: String },
});
export default model<blacklistUsers>('userBlacklist', blacklist);
