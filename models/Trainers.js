const { Sequelize, sequelize } = require('../db/conexion')

const Trainers = sequelize.define('Trainers', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    User: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Region: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Language: {
        type: Sequelize.STRING,
        defaultValue: 'es',
    },
    Cups: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    Order: {
        type: Sequelize.STRING,
        defaultValue: 'ID',
    },
    Direction: {
        type: Sequelize.STRING,
        defaultValue: 'ASC',
    },
    Credits: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    Gems: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    Redeems: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    Timedaily: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    Date: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    }
}, 
{
    freezeTableName: true,
}
)

module.exports = Trainers