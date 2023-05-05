const express = require("express")
const router = express.Router()
const Blogs = require("../models/blog")
const Users = require("../models/user")
const Categories = require("../models/category")
const uploadImage = require("../helpers/image-upload")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await Blogs.findAll({
            raw: true
        })
        if (blogs) {
            res.json(blogs)
        }
    }
    catch (err) {
        console.log(err);
    }
})

router.get("/api/users", async (req, res) => {
    try {
        const users = await Users.findAll({
            raw: true
        })
        if (users) {
            res.json(users)
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.post("/user-delete", async (req, res) => {
    const userId = req.body.id;
    console.log("User will deleted id: " + userId)
    try {
        await Users.destroy({
            where: {
                id: userId
            }
        })
        res.status(200).send({ message: `User with id number ${userId} has been deleted` })
    }
    catch (err) {
        console.log(err)
    }
})

router.post("/user-create", uploadImage.upload.single("file"), async (req, res) => {

    try {
        let image = null
        const data = await JSON.parse(req.body.data)
        const { firstName, lastName, email, password } = data
        if (req.file) {
            image = req.file.filename
        }
        console.log(data.firstName)
        console.log(data.lastName)
        console.log(data.email)
        console.log(req.file)
        //PAROLAYI YAP
        await Users.create({ firstName: firstName, lastName: lastName, email: email, image: image })
        res.status(200).send({ message: "User has been created successfully" })
    }
    catch (err) {
        res.status(404).send({ message: "Error!!" })
        console.log(err)
    }

})

router.post("/sign-up", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        //PAROLAYI YAP
        const hashedPassword = await bcrypt.hash(password, 10)
        await Users.create({ firstName: firstName, lastName: lastName, email: email, password: hashedPassword })
        res.status(200).send({ message: "User has been created successfully" })
    }
    catch (err) {
        res.status(404).send({ message: "Error!!" })
        console.log(err)
    }
})

router.get("/api/categories", async (req, res) => {
    try {
        const categories = await Categories.findAll()
        if (categories) {
            res.json(categories)
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.get("/api/category/:id", async (req, res) => {
    try {
        const category = await Categories.findOne({
            where: {
                id: req.params.id
            },
        })
        res.json(category)
    }
    catch (err) {
        console.log(err)
    }
})

router.post("/admin/category/:id", async (req, res) => {
    console.log(req.body)
    try {
        const { id, name } = req.body
        const category = await Categories.update({ name: name }, {
            where: {
                id: id
            }
        })
        if (category) {
            res.status(200).send({ message: "Güncelleme yapıldı" })
        }
        console.log(category)
    }
    catch (err) {
        console.log(err)
    }
})

router.post("/category-create", async (req, res) => {
    const { name } = req.body
    try {
        const response = await Categories.create({ name: name })
        if (response) {
            res.status(200).send({ message: "Category added." })
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.post("/category-delete", async (req, res) => {
    const { id } = req.body
    try {
        await Categories.destroy({
            where: {
                id: id
            }
        })
        res.status(200).send({ message: "başarıyla silindi." })
    }
    catch (err) {
        console.log(err)
    }
})

router.get("/api/session", async (req, res) => {
    console.log("api:", req.session.isAuth)
    res.json({ isAuth: res.locals.isAuth });
});
const secretKey = 'mysecretkey';
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    try {
        const user = await Users.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(401).send({ message: "User is not defined in database" })
        }

        const match = await bcrypt.compare(password, user.password)

        console.log("match:", match)
        if (match) {
            const token = jwt.sign({
                data: "secretdata"
            }, secretKey, { expiresIn: "1h" })
            return res.status(200).send({ message: "login successful", token: token })
        }
        else {
            req.session.isAuth = 0
            console.log("auth:", req.session.isAuth)
            return res.status(404).send({ message: "login unsuccessful" })
        }
    }

    catch (err) {
        console.log(err)
    }
})

router.post("/api/token", (req, res) => {
    const { token } = req.body
    console.log(token)
    try {
        const decoded = jwt.verify(token, secretKey)
        console.log("decoded:" + JSON.stringify(decoded))
        if (decoded) {
            return res.status(200).send({ isTokenValid: true })
        }
        return res.status(401).send({ isTokenValid: false })
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router