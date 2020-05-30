const router = require('express').Router();
const auth = require('../middleware/auth')
const {
    getNotes,
    createNote,
    getNote,
    updateNote,
    deleteNote
} = require('../controlllers/note-controller/note-controller')

router
    .route('/user/note')
    .get(auth, getNotes)
    .post(auth, createNote);

router
    .route('/user/note/:id')
    .get(auth, getNote)
    .patch(auth, updateNote)
    .delete(auth, deleteNote)

module.exports = router;