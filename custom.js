const Discord = require("discord.js");
const Canvas = require("canvas");
let { Client, Intents } = require('discord.js')

const client = new Client({
    ws: {
        intents: new Discord.Intents(Discord.Intents.ALL)
    }
})
client.cmds = new Discord.Collection();

//config
const token = "Nzk0OTM3ODA0MTc4MDYzMzkx.X_CFhQ.Av3PFKFuu2Ep7Eb_KJG6YURauqE";
const prefix = "tpm";

client.login(token);

client.on("ready", () => {
  console.log(`You are ${client.user.tag}!`);
  client.user.setPresence({
    status: "online",
    activity: {
      name: "Elon is watching.",
      
    },
  });  
});

client.on("guildMemberAdd", async (member) => {
  let guild = client.guilds.cache.get("794610378171744337");
  let channel = guild.channels.cache.get("794610378867867680");
  if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./background.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

// Slightly smaller text placed above the member's display name
    ctx.font = '32px AvenirBook';
    ctx.fillStyle = "#F8F8F8";
    ctx.fillText(
      `Total Server Members: ${client.guilds.cache.get("794610378171744337").memberCount}`,
      canvas.width / 2.5,
      canvas.height / 1.9
    );
      // // Add an exclamation point here and below2
      // ctx.font = '45px AvenirBook';
      // ctx.fillStyle = "#F8F8F8";
      // ctx.fillText(`${client.guilds.cache.get("794610378171744337").memberCount}`, canvas.width / 2.5, canvas.height / 3.5
      // );
      ctx.font = '25px AvenirBook';
      ctx.fillStyle = '#F8F8F8'
      ctx.fillText(`Latest Join: ${member.user.username}#${member.user.discriminator}`, canvas.width / 2.45, canvas.height / 1.44);;

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
	const avatar = await Canvas.loadImage(client.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  channel.lastMessage.delete();
  channel.send(attachment);
  });

  // Pass the entire Canvas object because you'll need to access its width, as well its context
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

  module.exports = {
    name: "joinTest",
    usage: "joinTest",
    description: "test new member joins",
    run: async ({ client, msg, args }) => {
      client.emit("guildMemberAdd", msg.member);
    },
  };