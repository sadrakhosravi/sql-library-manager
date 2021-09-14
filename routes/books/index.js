const express = require('express');
const { Book } = require('../../models');
const router = express.Router();

/* GET /books page. Show full list of books */
router.get('/', async (req, res, next) => {
  // get all the books from the database.
  const books = await Book.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    raw: true,
  });

  // Find all the available columns
  const columns = Object.keys(books[0])
    .slice(1)
    .map(columnTitle => columnTitle.charAt(0).toUpperCase() + columnTitle.slice(1));

  res.render('index', {
    columns,
    books,
  });
});

// Routes
router.use(require('./new'));
router.use(require('./update'));
router.use(require('./delete'));

module.exports = router;
