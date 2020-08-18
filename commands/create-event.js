const Discord = require("discord.js");
const moment = require("moment");
const Event = require("../models/Event");

module.exports = {
  name: "create-event",
  usage: "create-event",
  description: "takes you through a dialogue to add your event to the database",
  run: async ({ client, msg, args }) => {
    msg.channel.send("Tell me about your event");

    const collector = new Discord.MessageCollector(
      msg.channel,
      (m) => m.author.id == msg.author.id,
      { time: 10000, max: 3 }
    );

    collector.on("collect", (message) => {
      console.log("logged");
    });

    collector.on("end", (collected) => {
      var time;
      collected.forEach((element, index, original) => {
        //dealing w/ hashmap so index is a key 872634987235982735 not simple int 0,1,2,3....
        let record = original.get(index);
        record = record.content;
        console.log(record);
      });
      //   console.log(time);
    });

    //   const description = collected[2].content;

    //   console.log(time);
    //   console.log(title);
    //   console.log(description);
    // moment().year(2020).month(7).date(args[0])

    //   Event.create({
    //     title: ,
    //     description: "This is blah blah for now",
    //     createBy: message.author.username,
    //     startTime: ,
    //   })
    //     .then((res) => console.log(res))
    //     .catch((err) => console.error(error));
  },
};

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
