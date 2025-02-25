const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    text: String,
    rate: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString('en-US')
    }
})

module.exports = mongoose.model('Review', reviewSchema);