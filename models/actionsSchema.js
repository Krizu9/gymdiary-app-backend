

require('dotenv').config()

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const url = process.env.MONGODB_URL
const databaseName = 'gymdiaryDB'
const collectionName = 'workouts'

mongoose.connect(url, { dbName: databaseName })

const actionsSchema = new Schema({
    action: { type: String, required: [true, 'Action is required.'] },
    sets: { type: Array, required: [true, 'Repetition amount is required.'] },
    day: { type: Date, required: [true, 'Date is required.'] },
    user: { type: String, required: [true, 'User information is required.'] }
}, collectionName)

const Workouts = mongoose.model('workouts', actionsSchema)

module.exports = { Workouts };