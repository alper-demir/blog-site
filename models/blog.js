const { DataTypes } = require("sequelize")
const sequelize = require("../data/db")

const Blogs = sequelize.define('blogs', {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mainpage: {
        type: DataTypes.BOOLEAN
    },
    approved: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = Blogs
