const Discord = require("discord.js");
const moment = require("moment");
const Event = require("../models/Event");
const Canvas = require("canvas");
const fs = require("fs");

var images = [];

function loadImages() {

fs.readdirSync("./images/wisdom/").forEach((image, index) => {
  try {
    images.push(await Canvas.loadImage(`./images/wisdom/${image}`));
    console.log(`${image} Loaded`);
  } catch (error) {
    console.log(`${image} X didn't load`);
  }

})
}

module.exports = {
  name: "wisdom",
  usage: "wisdom",
  description: "gives you memes with wisdom",
  run: async ({ client, msg, args }) => {
    const random = Math.floor(Math.random() * 3);
    canvas = Canvas.createCanvas(1000, 600);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(images[random], 0, 0, canvas.width, canvas.height);
    ctx.font = "60px Georgia";
    ctx.fillStyle = "white";
    ctx.fillText(time, 100, 250);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "tpm-banner.png"
    );
  },
};
