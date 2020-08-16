const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require("moment");
const Canvas = require("canvas");

//config
const { token } = require("./config");
const prefix = "tpm";

client.login(token);

client.on("ready", () => {
  console.log(`You are ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).split(/ +/);

  args.forEach((elem) => {
    elem.trim();
  });

  let time = moment();

  const embed = new Discord.MessageEmbed();

  for (let i = 0; i < 7; i++) {
    time.add(1, "day");
    embed.addFields({ name: "Event Date", value: time });
  }

  const background = await Canvas.loadImage("./billmusk.jpg");

  canvas = Canvas.createCanvas(1000, 600);

  const ctx = canvas.getContext("2d");

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "tpm-banner.png"
  );

  msg.reply(attachment);
});
