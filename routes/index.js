const express = require('express');
const router = express.Router();

const booksRouter = require('./books/index');

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.redirect('/books');
});

// Books router
router.use('/books', booksRouter);

module.exports = router;
