const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require("moment");
const Canvas = require("canvas");

const Event = require("./models/Event");

//config
const { token } = require("./config/config");
const connectDB = require("./config/db");
connectDB();
const prefix = "tpm";

client.login(token);

client.on("ready", () => {
  console.log(`You are ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  // console.log(msg);
  const args = msg.content.slice(prefix.length).split(/ +/);

  args.forEach((elem, index) => {
    if (elem === "") args.splice(index, 1);
    elem.trim();
  });

  const embed = new Discord.MessageEmbed();
  const cmd = args.shift();
  if (cmd === "create") {
    // const time = moment().month(args[0]).date(args[1]);

    msg.channel.send("Tell me about your event");

    const collector = new Discord.MessageCollector(
      msg.channel,
      (m) => m.author.id == msg.author.id,
      { time: 10000 }
    );

    collector.on("collect", (message) => {
      // console.log(message.content);
      const args = message.content.split(/ /);
      try {
        // console.log(args.slice(1).join(" "));
        Event.create({
          title: args.slice(1).join(" "),
          description: "This is blah blah for now",
          createBy: message.author.username,
          startTime: moment().year(2020).month(7).date(args[0]),
        })
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      }
    });
  }
});

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
