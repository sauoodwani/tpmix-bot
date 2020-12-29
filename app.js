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

const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");

  // Declare a base size of the font
  let fontSize = 70;

  do {
    // Assign the font to the context and decrement it so it can be measured again
    ctx.font = `${(fontSize -= 10)}px sans-serif`;
    // Compare pixel width of the text to the canvas minus the approximate avatar size
  } while (ctx.measureText(text).width > canvas.width - 300);

  // Return the result to use in the actual canvas
  return ctx.font;
};

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get("731531456844660737");
  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage("./background.png");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Slightly smaller text placed above the member's display name
  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `Total Server Members: ${member.guild.memberCount}`,
    canvas.width / 2.5,
    canvas.height / 3.5
  );

  // Add an exclamation point here and below
  // ctx.font = "28px sans-serif";
  ctx.fillStyle = "#ffffff";

  applyText(canvas, `${member.guild.memberCount}!`);

  ctx.fillText(
    `${member.displayName}!`,
    canvas.width / 2.5,
    canvas.height / 1.8
  );

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );
  // channel.lastMessage.delete();
  channel.send(attachment);
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
  let guild = client.guild.cache.get("700053942482239638");
  let members = guild.memberCount;
  let channel = guild.channels.cache.get("790948237074104341");
  channel.setName(`Members: ${members}`).catch(console.error);
}, ms("15m"));
