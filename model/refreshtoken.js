const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`, { logging: false })
require('dotenv').config()


class RefreshToken extends Model { }

RefreshToken.init({
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },

    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'refreshtoken',
    createdAt: true,
    updatedAt: true
})
sequelize.sync()
module.exports = { RefreshToken }