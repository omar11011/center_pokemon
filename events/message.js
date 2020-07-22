module.exports = async (client, message) => {
    if(message.author.bot || !message.content.startsWith(process.env.PREFIX)) return

    const args = message.content.slice(process.env.PREFIX.length).split(/ +/)
    const commandName = args.shift().toLowerCase()

    // Configurando Comandos y Alias
    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))

    if(!command) return
    console.log(message.author.tag + " ha utilizado: " + message.content)

    // Configurandos Comandos por DM
    if(command.guildOnly && message.channel.type !== "text") return message.reply("Este comando no se puede usar por DM.")

    // Ejecutando los comandos
    try {
        command.execute(message, args, client)
    } catch(error) {
        console.error(error)
        message.reply("Error al intentar ejecutar el comando.")
    }
}