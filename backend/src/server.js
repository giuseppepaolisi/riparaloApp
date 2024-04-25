require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const serviceRoutes = require('./routes/service');
const customerRoutes = require('./routes/customer');
const ticketRoutes = require('./routes/ticket');

// express app
const app = express();

// TZ
process.env.TZ;

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/login', loginRoutes);
app.use('/api', userRoutes);
app.use('/api', serviceRoutes);
app.use('/api', customerRoutes);
app.use('/api', ticketRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
