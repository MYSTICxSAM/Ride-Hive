const userModel = require('../db/models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    const isBlacklisted = await userModel.findOne({token:token});

    if(isBlacklisted) {
        return res.status(401).json({msg: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();
    }catch(err) {
        return res.status(401).json({msg: 'Unauthorized'});
    }
}