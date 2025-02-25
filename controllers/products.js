const Farm = require('../models/farm');
const Review = require('../models/review');
const Product = require('../models/product');
const User = require('../models/user');

const categoryList = Product.schema.path('category').enumValues;

module.exports.getProducts = async (req, res) => {
    let products = null;
    req.query ? products = await Product.find(req.query).populate('reviews') : products = await Product.find({}).populate('reviews');

    res.render('products/index', { products, categoryList })
}

module.exports.getEachProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate(['farm', 'reviews']);

    res.render('products/show', { product })
}

module.exports.getNewProductForm = async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);

    res.render('products/new', { farm, categoryList })
}

module.exports.createProduct = async (req, res) => {
    const { id } = req.params;
    const { name, image, price, category, description } = req.body.product;

    const farm = await Farm.findById(id);
    const product = new Product({ ...req.body.product, farm: farm });
    await product.save();

    res.redirect(`/products/${ product._id }`)
}

module.exports.addToCart = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id).select(['-details', '-category']);
    const updatedProduct = {...product._doc, qty: 1};

    if (req.session.user) {
        if (req.session.cart) {
            const idx = req.session.cart.findIndex((item) => item._id == updatedProduct._id);
            if (idx !== -1) {
                req.session.cart[idx].qty += 1;
            } else {
                req.session.cart.push(updatedProduct);
            }

        } else {
            req.session.cart = [];
            req.session.cart.push(updatedProduct);
        }
    }

    res.redirect(req.get('referer'));
}

module.exports.addToFavorite = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id).select(['-details', '-category']);

    if (req.session.user) {
        if (req.session.favorite) {
            const idx = req.session.favorite.findIndex((item) => item._id == product._id);
            if (idx !== -1) {
                req.session.favorite.splice(idx, 1);
            } else {
                req.session.favorite.push(product);
            }
        } else {
            req.session.favorite = [product];
        }
    }

    console.log(req.session.favorite);

    res.redirect(req.get('referer'));
}