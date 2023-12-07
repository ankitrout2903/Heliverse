const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/route');

dotenv.config();
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const mongoDB = 'mongodb://localhost:27017/hell';
const mongoDB = process.env.MONGO_DB;

const mongooseConnect = async () => {
  await mongoose
    .connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log('connected to database'))
    .catch((err) => console.log(err));
};
mongooseConnect();

app.listen(3000, (req, res) => {
  console.log('backend running on port 3000');
});

app.get('/', (req, res) => {
  res.send('Backend Server Running');
});
app.use('/', routes);
