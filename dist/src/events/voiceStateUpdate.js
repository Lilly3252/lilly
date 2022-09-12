export const name = 'voiceStateUpdate';
export const once = false;
export const run = async (oldState, newState) => {
    console.log(`${oldState.member?.id} (${oldState.member?.user.tag}) on ${oldState.channelId} Named : ${oldState.channel ? oldState.channel.name : null} been moved to ${newState.channelId} Named : ${newState.channel ? newState.channel.name : null}`);
};
//# sourceMappingURL=voiceStateUpdate.js.map