const jwt = require('jsonwebtoken')
const User = require('../model/usermodel')

const auth = async (req, res, next) => {
    try {
        let user = req.session.user
        if (user === null || user === undefined) {
            throw new Error()
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth