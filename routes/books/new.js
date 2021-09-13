const express = require('express');
const { Book } = require('../../models');
const router = express.Router();

// Path relative to /books

/* GET /books page. Displays all the books */
router.get('/new', async (req, res, next) => {
  res.render('new-book');
});

module.exports = router;
