const mongoose = require('mongoose')
const exerciseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: String,
    username: String,
    duration: Number,
    date: Date,
})

module.exports = mongoose.model("Exercise",exerciseSchema)