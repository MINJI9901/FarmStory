const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy', 'meat', 'poultry']
    },
    description: String,
    details: Array,
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});


module.exports = mongoose.model('Product', productSchema);

// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;