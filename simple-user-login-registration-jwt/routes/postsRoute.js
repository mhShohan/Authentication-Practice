const router = require('express').Router();
const { privatePost, publicPost } = require('../db');
const authMiddlewere = require('../middlewere/authMiddlewere');

router.get('/public', (req, res) => {
  res.json(publicPost);
});

router.get('/private', authMiddlewere, (req, res) => {
  res.json(privatePost);
});

module.exports = router;
