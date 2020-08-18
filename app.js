const Discord = require("discord.js");
const client = new Discord.Client();
client.cmds = new Discord.Collection();

const fs = require("fs");
fs.readdirSync("./commands").forEach((file) => {
  try {
    let cmd = require(`./commands/${file}`);
    client.cmds.set(cmd.name, cmd);
    console.log(`${file} Loaded`);
  } catch (error) {
    console.log(`${file} X didn't load`);
  }
});

const moment = require("moment");
const Canvas = require("canvas");

const Event = require("./models/Event");

//config
const { token } = require("./config/config");
const connectDB = require("./config/db");
connectDB();
const prefix = "tpm";

client.login(token);

client.on("ready", () => {
  console.log(`You are ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  // console.log(msg);
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
