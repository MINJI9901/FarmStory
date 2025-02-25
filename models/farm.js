const { types } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose

const FarmSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    location: String,
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});
// we'll eventially have an owner of the campground, the author of it, and reviews

module.exports = mongoose.model('Farm', FarmSchema);