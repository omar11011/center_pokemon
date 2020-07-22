const Trainers = require('../models/Trainers')

const Sync = () => {
    Trainers.sync()

    console.log('Base de datos sincronizada.')
}

module.exports = { Sync }