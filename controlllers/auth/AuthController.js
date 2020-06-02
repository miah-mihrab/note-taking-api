const firebase = require('firebase');
const auth = firebase.auth();
const jwt = require('jsonwebtoken');

const User = require('../../model/usermodel');

(
    exports.signUp = (async (req, res, next) => {
        try {
            auth
                .createUserWithEmailAndPassword(req.body.email, req.body.password)
                .then(() => {
                    req.session.user = { uid: auth.currentUser.uid, email: auth.currentUser.email }
                    console.log(req.session.user)
                    return res.send(req.session.user)
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
            console.log(email, password, typeof (password))
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    console.log("HERE")
                    req.session.user = { uid: auth.currentUser.uid, email: auth.currentUser.email }
                    console.log(req.session.user)
                    return res.send(req.session.user)
                })
        } catch (err) {
            return next("Something went wrong")
        }
    })
)