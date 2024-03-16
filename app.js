const express = require('express');
const ExpressError = require('./expressError');
const app = express();  
const itemsRoutes = require('./routes/items');

app.use(express.json());
app.use('/items', itemsRoutes);

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message;

  return res.status(status).json({
    error: { message, status }
  });
});

module.exports = app;
