const Trainers = require('../models/Trainers')
const Discord = require('discord.js')

module.exports = async (reaction, object, user) => {
  const embed = new Discord.MessageEmbed()
    .setColor(0xffffff)
    .setTitle("Welcome!")
    .setDescription(`Simple test \n`)

  const trainer = await Trainers.findOne({
    where: {
      User: user.id
    },
    attributes: ['Region']
  })

  // get the role
  let role = await object.message.guild.roles.cache.find(r => r.name === trainer.Region)
  let roletrainer = await object.message.guild.roles.cache.find(r => r.name === 'Trainer')
  await object.message.guild.members.cache.get(user.id).roles.add(roletrainer.id) // Minecraft role.


  if (object.message.partial) await object.message.fetch(); // Partial messages do not contain any content so skip them.
  if (object.partial) await object.fetch();

  if (user.bot) return; // If the user was a bot, return.
  if (!object.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
  if (object.message.guild.id !== process.env.SERVER_ID) return; // Use this if your bot was only for one server/private server.

  if (object.message.channel.id === process.env.CHANNEL_ID) { // This is a #self-roles channel.
    if (object.emoji.name === process.env.EMOJI_REACT) {
      await object.message.guild.members.cache.get(user.id).roles.add(role.id) // Minecraft role.
      return user.send(embed).catch(() => console.log("Failed to send DM."));
    }

  } else {
    return; // If the channel was not a #self-roles, ignore them.
  }
}