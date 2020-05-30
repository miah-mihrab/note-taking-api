const jwt = require('jsonwebtoken')
const User = require('../model/usermodel')

const auth = async (req, res, next) => {
    // console.log(req.header('Authorization'))
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const data = jwt.verify(token, "SECRET_JWT_KEY")
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth