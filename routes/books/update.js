const express = require('express');
const app = express();
const { Book } = require('../../models');
const router = express.Router();

app.use(express.urlencoded({ extended: true }));

/* GET /books/:id page. Displays single book with editable form */
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const book = await Book.findByPk(id, { raw: true });
  res.render('update-book', { book });
});

// Update books based on their id
router.post('/:id', async (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const year = parseInt(req.body.year);

  const book = await Book.findByPk(id);

  // Try to update books and catch error based on sequelize responses
  try {
    await book.update({
      title,
      author,
      genre,
      year,
    });
    res.redirect('/books');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const err = error.errors.map(err => err.path);
      const isDataValid = false;
      let titleRequired = false;
      let authorRequired = false;

      err.includes('title') ? (titleRequired = true) : (titleRequired = false);
      err.includes('author') ? (authorRequired = true) : (authorRequired = false);

      res.render('update-book', { book, isDataValid, titleRequired, authorRequired });
    }
  }
});

module.exports = router;
