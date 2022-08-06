const router = require('express').Router();

router.use('/auth', require('./userRoutes'));
router.use('/customer', require('./customerRoutes'));

module.exports = router;