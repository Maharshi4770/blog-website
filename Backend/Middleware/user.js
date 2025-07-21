const jwt = require('jsonwebtoken')
const { JWT_USER_SECRET } = require('../config')

function userMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_USER_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(403).json({
            msg: 'You are not signedIn'
        });
    }
}

module.exports = {
    userMiddleware
}