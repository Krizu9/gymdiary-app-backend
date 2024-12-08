require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = process.env.MONGODB_URL;

mongoose.connect(url, { dbName: process.env.DATABASENAME });

const userSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'] },
    passwordConfirmation: { type: String }
}, { collection: process.env.COLLECTIONNAME });

const User = mongoose.model('User', userSchema);

module.exports = { User };
