const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './frontend/public/images/users');
    },
    filename: (req, file, cb) => {
        const filename = path.parse(file.originalname).name + "-" + Date.now() + path.extname(file.originalname);
        cb(null, filename)
    }
});

const upload = multer({
    storage: storage
})


module.exports.upload = upload;