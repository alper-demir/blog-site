module.exports = (req, res, next) => {
    res.locals.auth = req.session.auth
    console.log("auth : ", res.locals.auth)
    next();
}