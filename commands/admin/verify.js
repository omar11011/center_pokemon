const Discord = require('discord.js')

module.exports = {
  name: 'role',
  description: '...',
  aliases: ['role'],
  guildOnly: true,
  async execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(0xffffff)
      .setTitle("Pick your roles!")
      .setDescription(`1️⃣ Omar \n`) // We're gonna try an unicode emoji. Let's find it on emojipedia.com !
    message.channel.send(embed).then(async msg => {
      await msg.react("1️⃣");
      // We're gonna using an await, to make the react are right in order.
    });
  }
}