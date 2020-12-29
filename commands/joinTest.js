module.exports = {
  name: "joinTest",
  usage: "joinTest",
  description: "test new member joins",
  run: async ({ client, msg, args }) => {
    client.emit("guildMemberAdd", msg.member);
  },
};
