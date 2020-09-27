module.exports = {
  name: "tag",
  usage: "tag <type>",
  description: "can be <type> howtocode howtoask",
  run: async ({ client, msg, args }) => {
    const type = args.shift();
    switch (type.trim()) {
      case "howtocode":
        msg.channel.send(
          `**HOW TO CODE**\n Jump right into it with <https://www.freecodecamp.com> or <https://www.hackerrank.com>\n If you want to code your own stuff, an good way is https://repl.it/.\n A little coding everyday goes a long way. Stick with it ! :)`
        );
        break;
      case "howtoask":
        msg.channel.send(
          `***Please keep these things in mind while asking questions:***\n Please, be patient \n Use the approporiate channels \n Provide details and screenshots of your problem if possible \n Try Google and StackOverflow first`
        );

      default:
        break;
    }
  },
};
