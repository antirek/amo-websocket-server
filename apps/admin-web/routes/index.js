const express = require('express');

const usersRouter = require('./users');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('index');
  res.render('index');
});

router.use('/users', usersRouter);

module.exports = router;
