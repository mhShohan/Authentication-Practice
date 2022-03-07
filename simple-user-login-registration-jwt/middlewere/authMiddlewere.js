const jwt = require('jsonwebtoken');

const authMiddlewere = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(400).json({
      errors: [
        {
          msg: 'no token found!',
        },
      ],
    });
  }

  try {
    const user = await jwt.verify(token, 'jwt_secret');
    req.user = user.email;
    next();
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: 'token invalid!!',
        },
      ],
    });
  }
};

module.exports = authMiddlewere;
