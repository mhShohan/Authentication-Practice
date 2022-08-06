const Customer = require('../model/Customer');
const { verifyAuth } = require('../middleware/auth');
const router = require('express').Router();

router.post('/', verifyAuth, async (req, res) => {
    try {
        const { name } = req.body;
        const { userId, userEmail } = req;
        const newCustomer = new Customer({ name, userEmail, userId });
        const customer = await newCustomer.save();

        return res.status(201).json({ message: 'Customer Created Successfully!', customer });
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});


router.get('/', verifyAuth, async (req, res) => {
    try {
        const { userId, userEmail } = req;
        const allCustomerOfUser = await Customer.find({ userId, userEmail });
        return res.status(200).json({ allCustomerOfUser });
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

router.delete('/:id', verifyAuth, async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        return res.status(200).json({ msg: 'User Deleted!' });
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});




module.exports = router;