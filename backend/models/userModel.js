const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, { timestamps: true });  // it has two fields createdAt and updatedAt. Created at is the time when the document was created and updatedAt is the time when the document was last updated.

module.exports = mongoose.model('User', userSchema);
