import { model, Schema } from 'mongoose';
import type { inventory, user } from '#type/database.js';

const UserSchema = new Schema<user>({
	guildID: { type: String },
	kupo: { type: String, default: '0' },
	inventory: { type: Map<string, inventory> },
});
export default model<user>('user', UserSchema);
