var express = require('express');
const { Book } = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  // res.render('index', { title: 'Express' });

  const books = await Book.findAll();
  res.json(books);
});

module.exports = router;
