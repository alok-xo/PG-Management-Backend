import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    designation: {
        type: String,
        required: false,
        trim: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['male', 'female', 'others']
    },
    age: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['owner', 'user'],
        default: 'user'
    }
},
    {
        collection: "authSchema", //col name
        versionKey: false,
        timestamp: true
    }
);

const auth = mongoose.model("authSchema", authSchema);
export default auth;