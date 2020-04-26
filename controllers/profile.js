const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.getProfile = async function(req, res) {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const user = jwt.verify(token, keys.jwt);
        const profile = await User.findById(user.userId);

        res.status(200).json({
            email: profile.email,
            name: profile.name,
            id: profile._id
        });
    } catch (e) {
        errorHandler(res, e);
    }
}
