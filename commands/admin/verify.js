const Discord = require('discord.js')

module.exports = {
  name: 'role',
  description: '...',
  aliases: ['role'],
  guildOnly: true,
  async execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Hey!")
      .setImage('https://media.tenor.com/images/49e62f2a4fc1075636d89e381aa30486/tenor.gif')
      .setDescription(`Welcome to the  Official Server  of  <@682622549104001063>. Only those trainers who have already started their journey through a region may enter.

      <#735375680400916581>: Use this channel if you have not yet registered as a Pokémon trainer. Only the s!start and s!region commands are supported
      
      When you react you will be able to see the other channels, and also I will send you a message by md where I will explain each thing better.
      
      Remember, I won't be able to talk to you if you have the direct messages disabled, so please keep this in mind.\n`) // We're gonna try an unicode emoji. Let's find it on emojipedia.com !
    message.channel.send(embed).then(async msg => {
      await msg.react(process.env.EMOJI_REACT);
      // We're gonna using an await, to make the react are right in order.
    });
  }
}