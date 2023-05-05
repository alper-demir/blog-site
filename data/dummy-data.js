const Blogs = require("../models/blog")
const User = require("../models/user")
const Category = require("../models/category")
const bcrypt = require("bcrypt")
const testData = async () => {
    await Blogs.bulkCreate([
        { title: "Blog 1", description: "Blog 1 açıklaması", image: "1.jpg", mainpage: 1, approved: 1 },
        { title: "Blog 2", description: "Blog 2 açıklaması", image: "2.jpg", mainpage: 1, approved: 1 },
        { title: "Blog 3", description: "Blog 3 açıklaması", image: "3.jpg", mainpage: 1, approved: 1 },
        { title: "Blog 4", description: "Blog 4 açıklaması", image: "4.jpg", mainpage: 1, approved: 1 },
    ])

    await User.bulkCreate([
        { firstName: "test", lastName: "user", email: "testuser@gmail.com", password: await bcrypt.hash("123456", 10), image: "1.jpg" },
        { firstName: "admin", lastName: "user", email: "admin@gmail.com", password: await bcrypt.hash("123456", 10), image: "2.jpg" }
    ])

    await Category.bulkCreate([
        {name:"Mobil Geliştirme"},
        {name:"Web Geliştirme"},
        {name:"Oyun Geliştirme"},
        {name:"Veri Tabanı Sistemleri"},
        {name:"Yapay Zeka"},
    ])
}

module.exports = testData