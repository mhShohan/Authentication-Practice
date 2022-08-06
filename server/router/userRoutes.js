const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (!email || !password || !confirmPassword) return res.status(400).json({ errMessage: 'Please fill all the fields!' });
        if (password.length < 6) return res.status(400).json({ errMessage: 'Password must have 6 characters!' });
        if (password !== confirmPassword) return res.status(400).json({ errMessage: 'Please Enter the same password!' });
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ errMessage: 'Email already exists!' });

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);

        //Save user account to Database
        const newUser = new User({ email, password: passwordHashed });
        const user = await newUser.save();

        //create JWT token
        const token = jwt.sign({ userId: user._id, userEmail: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

        //send token to cookie
        return res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 24 }).status(203).json({ message: 'Register Successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ errMessage: 'Please fill all the fields!' });
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(401).json({ errMessage: 'Wrong Email!' });

        //compare password 
        const matchedPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchedPassword) return res.status(401).json({ errMessage: 'Wrong Password!' });

        //create JWT token;
        const token = jwt.sign({ userId: existingUser._id, userEmail: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

        //send token to cookie
        return res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 24 }).status(203).json({ message: 'Login Successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});
router.get('/loggedin', (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);

        return res.json(true);
    } catch (error) {
        return res.json(false);
    }
});

router.get('/logout', (req, res) => {
    return res.cookie('token', '', { httpOnly: true, maxAge: 0 }).status(203).send();
});

module.exports = router;