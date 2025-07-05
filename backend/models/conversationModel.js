const mongoose = require('mongoose');
const User = require('./userModel');
const Message = require('./messageModel');

const conversationSchema = new mongoose.Schema({

    members: [{
        type: mongoose.Schema.Types.ObjectId,   // This is an array of ObjectIds that reference the User model.
        ref: 'User',
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message', // we are storing messages id here.
        default: []  // default is an empty array, so if there are no messages, it will be an empty array.
    }]

}, { timestamps: true });  // it has two fields createdAt and updatedAt. Created at is the time when the document was created and updatedAt is the time when the document was last updated.

module.exports = mongoose.model('Conversation', conversationSchema);


