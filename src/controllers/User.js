
const jwt = require('jsonwebtoken');
const TOKEN_SECRETS = require('../../token');
const Model = require('../models/User');
const MODEL = new Model();

module.exports = {

    login (req, res){
        if (!req.body || !req.body.username || !req.body.password){
            res.status(401);
            throw "Provide username and password!";
        }
        const user = MODEL.getUser(req.body.username);
        if (!user){
            res.status(401);
            throw "Invalid Username";
        }
        if (user.password !== req.body.password){
            res.status(401);
            throw "Invalid Password";
        }
        const token = jwt.sign(user, TOKEN_SECRETS.TOKEN_SALT, {expiresIn: '1h'});
        res.cookie('JWT', token, {
            maxAge: 360000,
            httpOnly: true
        });
        res.status(200).send('You are now logged in');
    }
}