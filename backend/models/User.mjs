import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    createdAt: String,
})

export const User = model('User', userSchema);