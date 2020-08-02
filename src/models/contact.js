const mongoose = require('mongoose')
const validator = require('validator')

const ContactModel = mongoose.model('ContactModel', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phone: {
        type: Number,
        default: 0,
        minlength: 10,
        validate(value) {
            if (value.length < 11) {
                throw new Error('Phone Number must be equal to 10')
            }
        }
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
    
})

module.exports = ContactModel