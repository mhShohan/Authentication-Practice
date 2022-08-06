const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ errorMessage: 'Unauthorized!' });
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = verifiedToken.userId;
        req.userEmail = verifiedToken.userEmail;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ errorMessage: 'Unauthorized!' });
    }
};

module.exports = { verifyAuth };