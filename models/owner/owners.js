import mongoose from 'mongoose';

const Owners = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    age: {
        type: Number,
        required: true
    }
})

const owners = mongoose.model('owners', Owners);

export default owners;