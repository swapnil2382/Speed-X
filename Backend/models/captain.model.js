const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Corrected import
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters long'],
        },
    },
   
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false // Ensures password isn't returned in queries unless explicitly requested
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
            unique: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            enum: ['car', 'motorcycle', 'auto'],
            required: true,
        },
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    },
});

// Instance method for comparing passwords
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password); // Comparing plain text password with hashed password
}

// Static method for hashing the password
captainSchema.statics.hashPassword = async function (password) { 
    return await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
}

// Method for generating authentication token
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

// Create the model from the schema
const captainModel = mongoose.model('captains', captainSchema);

module.exports = captainModel;
