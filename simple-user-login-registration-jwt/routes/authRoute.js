const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { users } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//signup route
router.post(
  '/signup',
  [
    check('email', 'Provide a vaild email').isEmail(),
    check('password', 'password must be 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    // input validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //user validation , already exist or not
    const user = users.find((u) => {
      return u.email === email;
    });

    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'User with this email already exists!',
          },
        ],
      });
    }

    // hashed password to save in database
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });

    // generate token
    const token = await jwt.sign({ email }, 'jwt_secret', { expiresIn: '3d' });
    res.json({ message: 'Registration Successe!', token });
  }
);

//login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  //user validation , already exist or not
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: 'User not Found, with this email!',
        },
      ],
    });
  }

  //password match
  const isPassMatch = await bcrypt.compare(password, user.password);
  if (!isPassMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Wrong password',
        },
      ],
    });
  }

  // generate token
  const token = await jwt.sign({ email }, 'jwt_secret', { expiresIn: '3d' });
  res.json({ message: 'Login Successe!', token });
});

//get all users (for testing)
router.get('/users', (req, res) => {
  res.json(users);
});

module.exports = router;
