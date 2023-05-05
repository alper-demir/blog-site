const dotenv = require("dotenv")
dotenv.config()

const config = {
    db: {
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD
    }
}
module.exports = config