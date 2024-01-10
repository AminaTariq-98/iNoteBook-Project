const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    },
    title: {
        type: String,
        required: true,
    },
    descripation: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: String,
        default: Date.now()
    }

});


const Note = mongoose.model('notes', notesSchema);
module.exports = Note;