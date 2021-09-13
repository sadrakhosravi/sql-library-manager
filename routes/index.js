const express = require('express');
const { Book } = require('../models');
const router = express.Router();

const booksRouter = require('./books/index');

// Books router
router.use('/books', booksRouter);

/* GET home page. */
router.get('/', async (req, res, next) => {
  const books = await Book.findAll();
  res.json(books);
});

module.exports = router;
