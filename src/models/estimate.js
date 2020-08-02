const mongoose = require('mongoose')
const validator = require('validator')

const EstimateModel = mongoose.model('EstimateModel', {
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
    },
    total: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Total must be a postive number')
            }
        }
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    service: {
        type: String,
        required: true,
        trim: true
    },
    platforms: {
        type: String,
        required: true,
        trim: true
    },
    features: {
        type: String,
        required: true,
        trim: true
    },
    customFeatures: {
        type: String,
        required: true,
        trim: true
    },
    users: {
        type: String,
        required: true,
        trim: true
    }
    
})

module.exports = EstimateModel