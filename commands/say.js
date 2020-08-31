const Discord = require("discord.js");
const moment = require("moment");
const Event = require("../models/Event");
const Canvas = require("canvas");

module.exports = {
  name: "say",
  usage: "say <text>",
  description: "puts your text on a TPM banner",
  run: async ({ client, msg, args }) => {
    let text = args.join(" ");
    msg.channel.send(text.length);

    if (text.length > 100) {
      msg.channel.send("Message is too long");
      return;
    }

    const image = await Canvas.loadImage("https://i.imgur.com/aNTBLyR.jpg");
    canvas = Canvas.createCanvas(1000, 600);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.font = "60px Georgia";
    ctx.fillStyle = "#808080";

    if (text.length > 20) {
      const text1 = text.split(" ").slice(0, 4);
      const text2 = text.split(" ").slice(4);
      ctx.fillText(text1.join(" "), 75, 225);
      ctx.fillText(text2.join(" "), 200, 400);
      console.log(text1, text2);
    } else {
      ctx.fillText(text, 50, 200);
    }

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "tpm-banner.png"
    );

    msg.channel.send(attachment);
  },
};
