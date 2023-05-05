const express = require('express')
const dotenv = require("dotenv")
const app = express()
const body_parser = require("body-parser");
const cookieParser = require("cookie-parser")
const session = require('express-session')
const cors = require("cors")
dotenv.config()

app.use(cors())
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const adminRoute = require("./routes/admin")

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(body_parser.json())

const sequelize = require("./data/db")


// app.use(session({
//     secret: "hello world",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24
//     },
//     store: new SequelizeStore({
//         db: sequelize
//     })
// }))

app.use(adminRoute)


const dummy = require("./data/dummy-data")

async function x() {
    // await sequelize.sync({ force: true })
    // await dummy()
}
x()

app.listen(process.env.PORT, () => {
    console.log(`Server running on Port: ${process.env.PORT}`)
})