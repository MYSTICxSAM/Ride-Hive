const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');
const userRouter = require('./routes/user.router');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRouter);

module.exports = app;