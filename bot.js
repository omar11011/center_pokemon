const fs = require('fs')
const discord = require('discord.js')
const express = require('express')
const env = require('node-env-file')
env(__dirname + '/.env')

const client = new discord.Client()
client.commands = new discord.Collection()

const modules = ['pokemon']

// Command Handler

modules.forEach(c => {
    fs.readdir(`./commands/${c}/`, (err, files) => {
        if(err) throw err
        console.log(`[${process.env.NAMEBOT}] Cargando ${files.length} comandos del módulo ${c}`)
        files.forEach(f => {
            const command = require(`./commands/${c}/${f}`)
            client.commands.set(command.name, command)
        })
    })
})

// Event Handler

fs.readdir(`./events/`, (err, files) => {
    if(err) return console.log(err)
    files.forEach(f => {
        const event = require(`./events/${f}`)
        const eventName = f.split(".")[0]
        client.on(eventName, event.bind(null, client))
    })
})

client.login(process.env.TOKEN)

// Express

var app = express()
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})