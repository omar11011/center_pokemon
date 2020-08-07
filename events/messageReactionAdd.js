const Trainers = require('../models/Trainers')
const Discord = require('discord.js')

module.exports = async (reaction, object, user) => {
  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle("Welcome! <a:pokesaludo:697872213201780808>")
    .setDescription(`Just like in the games, catching pokemons is not as simple as saying their name.

    You will have a rate that will calculate if you will catch the pokemon or not, remember use **s!bonus**, we will launch more information on the official site!
    
    With nothing more to say we hope you have a good time, and have a nice travel!\n`)

  const trainer = await Trainers.findOne({
    where: {
      User: user.id
    },
    attributes: ['Region']
  })

  const embedError = new Discord.MessageEmbed()
    .setColor(0xffffff)
    .setTitle("Sorry!")
    .setDescription(`Sorry, but you must have started the adventure in the [Start](https://discord.com/channels/735352445403660288/735375680400916581 'Channel start') or other server channel to be able to enter the server.\n`)

  if (!trainer) return user.send(embedError)

  // get the role
  let role = await object.message.guild.roles.cache.find(r => r.name === trainer.Region)
  let roletrainer = await object.message.guild.roles.cache.find(r => r.name === 'Trainer')

  if (object.message.partial) await object.message.fetch(); // Partial messages do not contain any content so skip them.
  if (object.partial) await object.fetch();

  if (user.bot) return; // If the user was a bot, return.
  if (!object.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
  if (object.message.guild.id !== process.env.SERVER_ID) return; // Use this if your bot was only for one server/private server.

  await object.message.guild.members.cache.get(user.id).roles.add(roletrainer.id) // Minecraft role.
  await object.message.guild.members.cache.get(user.id).roles.add(role.id) // Minecraft role.
  return user.send(embed).catch(() => console.log("Failed to send DM."));
  // if (object.message.channel.id === process.env.CHANNEL_ID) { // This is a #self-roles channel.
  //   if (object.emoji.name === process.env.EMOJI_REACT) {
  //     return user.send(embed).catch(() => console.log("Failed to send DM."));
  //   }

  // } else {
  //   return; // If the channel was not a #self-roles, ignore them.
  // }
}