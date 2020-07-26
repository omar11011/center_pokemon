module.exports = {
	name: 'verify',
    description: 'Verifícate como entrenador pokémon.',
    aliases: ['verify'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../models/Trainers')

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Region'] })

        if(!trainer) {
            let es = `:flag_es: Aún no has empezado tu viaje.`
            let en = `:england: You have not yet started your journey.`
            let fr = `:flag_fr: Vous n'avez pas encore commencé votre voyage.`
            let pt = `:flag_pt: Você ainda não iniciou sua jornada.`
            
            message.author.send(`${es}\n${en}\n${fr}\n${pt}\n\n<@${message.author.id}>`)
        }
        else {
            let role = message.guild.roles.cache.find(r => r.name === trainer.Region)
            let roletrainer = message.guild.roles.cache.find(r => r.name === 'Trainer')

            if(!roletrainer) message.guild.roles.create({ data: { name: 'Trainer', permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'] } })
            else message.member.roles.add(roletrainer.id)

            if(!role) message.guild.roles.create({ data: { name: trainer.Region, permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'] } })
            else {
                if(message.member.roles.cache.has(role.id)) return 

                let es = `:flag_es: ¡Felicidades! Te has verificado correctamente.`
                let en = `:england: Congratulations! You have successfully verified yourself.`
                let fr = `:flag_fr: Toutes nos félicitations! Vous vous êtes vérifié avec succès.`
                let pt = `:flag_pt: Parabéns! Você se verificou com sucesso.`

                message.member.roles.add(role.id)
                message.channel.send(`${es}\n${en}\n${fr}\n${pt}\n\n<@${message.author.id}>`)
            }
        }
    }
}