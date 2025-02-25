const Farm = require('../models/farm');
const Review = require('../models/review');
const Product = require('../models/product');
const User = require('../models/user');

const session = require('express-session');
const bcrypt = require('bcrypt');

const login = async (req, username, password) => {
    const user = await User.findOne({ username: username });
    if (!user) {
        throw new Error('User not found')
    }

    const isUser = await bcrypt.compare(password, user.password);
    if (isUser) {
        req.session.user = user.username;
        return true
    } else throw new Error('Invalid password');
}


module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    try{
        await login(req, username, password);
    } catch {
        console.log('oppza')
        return false
    }

    res.redirect(req.get('referer'));
}

module.exports.signUp = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('password: ', password, 'hashed one: ', hashedPassword);

    const newUser = new User({ username: username, password: hashedPassword });
    newUser.save();
    req.session.user = newUser.username;
    
    res.redirect(req.get('referer'));
}

module.exports.ghostSignUp = async (req, res) => {
    const foundUser = await User.find(req.body);
    if (!foundUser || foundUser.length === 0) {
        res.send(true)
    } else res.send(false)
}

module.exports.logout = async (req, res) => {
    req.session.user = null;
    res.redirect(req.get('referer'));
}