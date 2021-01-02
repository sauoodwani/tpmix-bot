const ms = require("ms");
const Discord = require("discord.js");
const Canvas = require("canvas");
const client = new Discord.Client();
client.cmds = new Discord.Collection();

//config
const { token } = require("./config/config");
const connectDB = require("./config/db");
const prefix = "tpm";

const fs = require("fs");
fs.readdirSync("./commands").forEach((file) => {
  try {
    let cmd = require(`./commands/${file}`);
    client.cmds.set(cmd.name, cmd);
    console.log(`${file} Loaded`);
  } catch (error) {
    console.log(`${file} X didn't load`);
    console.log(error);
  }
});

connectDB();
client.login(token);

client.on("ready", () => {
  console.log(`You are ${client.user.tag}!`);
  client.user.setPresence({
    status: "online",
    activity: {
      name: "Elon is watching.",
    },
  });
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;

  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  args.forEach((elem, index) => {
    if (elem === "") args.splice(index, 1);
    elem.trim().toLowerCase();
  });
  const cmdName = args.shift();
  const cmd = client.cmds.get(cmdName);
  if (!cmd) {
    console.log("no command found");
    return;
  }

  try {
    cmd.run({ client, msg, args });
  } catch (error) {
    console.error(error);
  }
});

// Set to 15 minutes to avoid rate limit
setInterval(() => {
  let guild = client.guilds.cache.get("700053942482239638");
  let members = guild.memberCount;
  let channel = guild.channels.cache.get("790948237074104341");
  channel.setName(`Members: ${members}`).catch(console.error);
}, ms("15m"));
