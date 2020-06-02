const router = require('express').Router();
const auth = require('../middleware/auth')
const {
    getNotes,
    createNote,
    getNote,
    updateNote,
    deleteNote
} = require('../controlllers/note-controller/note-controller')

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateNote:
 *        type: object
 *        required:
 *          - title
 *          - description
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *        example:
 *           title: Note Title
 *           description: Description required
 *      UpdateNote:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *        example:
 *           title: Note Title
 *           description: Description required
 */


/**
 * @swagger
 * /user/note:
 *  get:
 *      description: Get Notes of current user
 *      responses:
 *            '200':
 *                 description: A successfull response
 *  post:
 *      description: Create Note for current user
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/CreateNote'
 *      responses:
 *             '200':
 *                  description: Note Created
 */

router
    .route('/user/note')
    .get(auth, getNotes)
    .post(auth, createNote);





/**
 * @swagger
* /user/note/{id}:
*     get:
*      summary: Get note
*      parameters:
*        - in: path
*          name: id
*          schema:
*            type: string
*          required: true
*      responses:
*            '200':
*                 description: A successfull response
*     patch:
*      summary: Update Note
*      parameters:
*        - in: path
*          name: id
*          schema:
*            type: string
*          required: true
*      requestBody:
*          required: true
*          content:
*             application/json:
*                    schema:
*                      $ref: '#/components/schemas/UpdateNote'
*      responses: 
*          '200':
*              description: Note Updated
*     delete:
*      summary: Delete Note
*      parameters:
*        - in: path
*          name: id
*          schema:
*            type: string
*          required: true
*      responses:
*            '200':
*                 description: Note Deleted
*/
router
    .route('/user/note/:id')
    .get(auth, getNote)
    .patch(auth, updateNote)
    .delete(auth, deleteNote)

module.exports = router;