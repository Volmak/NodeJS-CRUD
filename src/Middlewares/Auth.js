
const jwt = require('jsonwebtoken');
const TOKEN_SECRETS = require('../../token');

module.exports = {
    authenticate (req, res, next){
        const token = req.cookies.JWT
        if (!token){
            res.status(401);
            throw "No authentication token";
        }

        jwt.verify(token, TOKEN_SECRETS.TOKEN_SALT, (err, user) => {
            if (err) {
                res.status(403);
                throw err;
            }
            req.user = user;
            next();
        });
    }
}