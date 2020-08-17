const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require("moment");
const Canvas = require("canvas");

//config
const { token } = require("./config/config");
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

  time = time.format("ddd, hA");

  const embed = new Discord.MessageEmbed();

  //   const background = await Canvas.loadImage("./billmusk.jpg");
  //   canvas = Canvas.createCanvas(1000, 600);
  //   const ctx = canvas.getContext("2d");
  //   ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  //   ctx.font = "60px Georgia";
  //   ctx.fillStyle = "white";
  //   ctx.fillText(time, 100, 250);
  //   const attachment = new Discord.MessageAttachment(
  //     canvas.toBuffer(),
  //     "tpm-banner.png"
  //   );

  msg.reply(attachment);
});
