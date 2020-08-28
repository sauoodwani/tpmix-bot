const Discord = require("discord.js");
const moment = require("moment");
const Event = require("../models/Event");
const Canvas = require("canvas");
const fs = require("fs");

function getImages() {
  var images = [];
  const directory = fs.readdirSync("./images/wisdom");
  directory.forEach((element) => {
    images.push(element);
  });
  return images;
}

module.exports = {
  name: "wisdom",
  usage: "wisdom",
  description: "gives you memes with wisdom",
  run: async ({ client, msg, args }) => {
    const images = getImages();
    console.log(images);
    const random = Math.floor(Math.random() * 3);
    const image = await Canvas.loadImage(`./images/wisdom/${images[random]}`);
    canvas = Canvas.createCanvas(1000, 600);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.font = "60px Georgia";
    ctx.fillStyle = "white";

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "tpm-banner.png"
    );

    msg.channel.send(attachment);
  },
};
