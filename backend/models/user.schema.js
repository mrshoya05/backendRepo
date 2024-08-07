import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "name should be valid"],
        maxLength: [50, "name should be valid"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        },
        password: {
            type: String,
            minLength: [8, "password must have at least 8 char"],
           
        }
    });

    export const User = mongoose.model('User', userSchema)