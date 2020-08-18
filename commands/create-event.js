const Discord = require("discord.js");

const moment = require("moment");
const Event = require("../models/Event");

module.exports = {
  name: "create-event",
  usage: "create-event",
  description: "takes you through a dialogue to add your event to the database",
  run: async ({ msg, args }) => {
    msg.channel.send("Tell me about your event");

    const collector = new Discord.MessageCollector(
      (m) => m.author.id == msg.author.id,
      { time: 10000 }
    );

    collector.on("collect", (message) => {
      // console.log(message.content);
      const args = message.content.split(/ /);

      message.channel.send(args.slice(1).join(" "));
    });
  },
};
// Event.create({
//   title: args.slice(1).join(" "),
//   description: "This is blah blah for now",
//   createBy: message.author.username,
//   startTime: moment().year(2020).month(7).date(args[0]),
// })

// const Canvas = require("canvas");
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
