import type { user } from "#type/database.js";
import { model, Schema } from "mongoose";

const UserSchema = new Schema<user>({
	guildID: { type: String },
	userID: { type: String },
	blacklisted: { type: Boolean, default: false }
});
export default model<user>("user", UserSchema);
