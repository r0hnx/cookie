import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const websiteSchema = new Schema({
    website: String,
    password: String,
    iv: String,
    username: String,
    tags: Array,
    tag: String,
    createdAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

export const Website = model('Website', websiteSchema);