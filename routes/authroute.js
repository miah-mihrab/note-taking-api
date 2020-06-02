const router = require('express').Router();

const {
    signUp,
    signIn
} = require('../controlllers/auth/AuthController')


/**
 * @swagger
 *  components:
 *    schemas:
 *      SignIn:
 *        type: object
 *        required:
 *          - password
 *          - email
 *        properties:
 *          password:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           password: "123456"
 *           email: emma@gmail.com
 *      SignUp:
 *        type: object
 *        required:
 *          - password
 *          - email
 *        properties:
 *          password:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           password: "123456"
 *           email: emma@gmail.com
 */



/**
* @swagger
*      /signup:
*           post:
*              description: Sign up User
*              requestBody:
*                  required: true
*                  content:
*                      application/json:
*                        schema:
*                           $ref: '#/components/schemas/SignUp'
*              responses:
*                  '200':
*                      description: User Signed up
*/

router
    .route('/signup')
    .post(signUp)



/**
 * @swagger
 *      /signin:
 *           post:
 *              description: Sign In User
 *              requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                        schema:
 *                           $ref: '#/components/schemas/SignIn'
 *              responses:
 *                  '200':
 *                      description: User Signed In
 */
router
    .route('/signin')
    .post(signIn)
module.exports = router;