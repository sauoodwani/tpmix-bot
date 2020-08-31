const Discord = require("discord.js");
const moment = require("moment");
const Event = require("../models/Event");
const Canvas = require("canvas");

function getImages() {
  var images = [
    "https://i.imgur.com/GOhVdZm.jpg",
    "https://i.imgur.com/CMplD96.jpg",
    "https://i.imgur.com/qu205qE.jpg",
    "https://i.imgur.com/1D5HnFW.jpg",
    "https://i.redd.it/a2ewhergumi51.jpg",
    "https://i.imgur.com/BStkWo8.png",
    "https://i.redd.it/tgu8jba8hle51.jpg"
  ];

  return images;
}

module.exports = {
  name: "meme",
  usage: "meme",
  description: "gives you memes",
  run: async ({ client, msg, args }) => {
    const images = getImages();
    console.log(images);
    const random = Math.floor(Math.random() * images.length);
    const image = await Canvas.loadImage(`${images[random]}`);
    canvas = Canvas.createCanvas(1000, 600);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.font = "60px Georgia";
    ctx.fillStyle = "white";

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "tpm-meme.png"
    );

    msg.channel.send(attachment);
  },
};
