const auth = (req, res, next) => {
    console.log('Am I alowed?');
    next();
}

module.exports = auth;