var express = require('express');
const { Book } = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  Book.findAll().then(books => {
    console.log(books);
  });
});

module.exports = router;
