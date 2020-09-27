const Discord = require("discord.js");
const moment = require("moment");
const Event = require("../models/Event");
const Canvas = require("canvas");
const getImages = require("../media/images");

module.exports = {
  name: "meme",
  usage: "meme",
  description: "gives you memes",
  run: async ({ client, msg, args }) => {
    const images = getImages();
    console.log(images);
    const random = Math.floor(Math.random() * images.length);
    // const image = await Canvas.loadImage(`${images[random]}`);
    // canvas = Canvas.createCanvas(1000, 600);
    // const ctx = canvas.getContext("2d");
    // ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    // ctx.font = "60px Georgia";
    // ctx.fillStyle = "white";

    // const attachment = new Discord.MessageAttachment(
    //   canvas.toBuffer(),
    //   "tpm-meme.png"
    // );

    msg.channel.send(images[random]);
  },
};
