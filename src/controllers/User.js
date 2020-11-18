
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
    },

    register (req, res){
        /* TODO: Proper username/passwords? Seems useless and annoying for testing */
        if (!req.body || !req.body.username || req.body.username.length < 6){
            res.status(500);
            throw "Username should be at least 6 characters";
        }
        if (!req.body || !req.body.password || req.body.password.length < 6){
            res.status(500);
            throw "Password should be at least 6 characters";
        }
        MODEL.create(req.body)
        res.status(201).send('Success! You are now registered.');
    }
}