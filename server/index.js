const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();


//global middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

const PORT = process.env.PORT || 5000;

//routes
app.use('/api/v1', require('./router'));

//Database Connection and server listening
mongoose.connect(process.env.URI, { connectTimeoutMS: 1000 })
    .then(() => {
        console.log('Database Connected!');
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
    })
    .catch((err) => console.log(err));