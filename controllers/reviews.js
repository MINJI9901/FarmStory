const Farm = require('../models/farm');
const Review = require('../models/review');
const Product = require('../models/product');
const User = require('../models/user');

module.exports.createReview = async (req, res) => {
    const { id } = req.params;

    const review = await Review.create(req.body);

    const product = await Product.findById(id);
    product.reviews.push(review)
    await product.save()

    console.log(review)
    console.log(product)
    res.redirect(`/products/${id}`);
}