const Farm = require('../models/farm');
const Review = require('../models/review');
const Product = require('../models/product');
const User = require('../models/user');

const categoryList = Product.schema.path('category').enumValues;


module.exports.getFarms = async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms });
};

module.exports.getNewFarmForm = (req, res) => {
    res.render('farms/new');
};

module.exports.createFarm = async (req, res) => {
    // if (!req.body.farm) throw new ExpressError('Invalid Filled Data', 400);
    const newFarm = await Farm.create(req.body.farm);
    res.redirect(`/farms/${newFarm._id}`);
};
 
module.exports.getEachFarm = async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate(['reviews', 'products']);
    const products = await Product.find({ farm: farm._id }).populate('reviews');

    let allReviews = [];
    products.map(product => product.reviews.forEach(item => allReviews.push(item)));

    res.render('farms/show', { farm, products, allReviews })
};

module.exports.getEditFarmForm = async (req, res) => {
    const farm = await Farm.findById(req.params.id);
    res.render('farms/edit', { farm })
};

module.exports.editFarm = async (req, res) => {
    const edittedFarm = await Farm.findByIdAndUpdate(req.params.id, req.body.farm);
    res.redirect(`/farms/${edittedFarm._id}`);
};

module.exports.deleteFarm = async (req, res) => {
    await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
};