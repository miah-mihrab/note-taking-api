
const User = require('../../model/usermodel');
(
    exports.signUp = (async (req, res, next) => {
        try {
            const user = new User(req.body);
            await user.save()
            const token = user.generateAuthToken();
            return res.status(200).send({
                success: true,
                user,
                token
            })
        } catch (err) {
            console.log(err);
            return next({
                success: false,
                message: "Something went wrong while creating user"
            })
        }

    }),

    exports.signIn = (async (req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            console.log(user)
            if (!user) {
                return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
            }
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (err) {

        }
    })
)