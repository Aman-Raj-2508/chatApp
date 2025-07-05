const mongoose = require('mongoose');
const User = require('./userModel');
const messageSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true,
    }

}, { timestamps: true });  // it has two fields createdAt and updatedAt. Created at is the time when the document was created and updatedAt is the time when the document was last updated.

module.exports = mongoose.model('Message', messageSchema);


