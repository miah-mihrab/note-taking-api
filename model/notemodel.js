const mongoose = require('mongoose');
const moment = require('moment');

const Note = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_time: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

Note.pre('save', function () {
    this.created_time = moment().format('LLL')
    console.log(this.created_time)
})

const NoteSchema = mongoose.model("Note", Note)

module.exports = NoteSchema