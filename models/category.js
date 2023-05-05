const { DataTypes } = require("sequelize")
const sequelize = require("../data/db")

const Categories = sequelize.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false })

module.exports = Categories
