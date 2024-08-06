require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const url = process.env.MONGODB_URL
const databaseName = 'gymdiaryDB'
const collectionName = 'users'

mongoose.connect(url, { dbName: databaseName })

const userSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    passwordConfirmation: { type: String, required: [true, 'Password confirmation is required'] }
}, collectionName)

const registerSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] }
}, { collection: collectionName })

const User = mongoose.model('User', userSchema)
const Register = mongoose.model('Register', registerSchema)


module.exports = { User, Register }