export const name = 'guildMemberUpdate';
export const once = false;
export const run = async (oldMember, newMember) => {
    console.log(`${oldMember.user.tag} updated to ${newMember.user.tag}`);
};
//# sourceMappingURL=guildMemberUpdate.js.map