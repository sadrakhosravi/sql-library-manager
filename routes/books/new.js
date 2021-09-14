const express = require('express');
const app = express();
const { Book } = require('../../models');
const router = express.Router();

app.use(express.urlencoded({ extended: true }));

/* GET /books/new page. Show new book form */
router.get('/new', async (req, res, next) => {
  res.render('new-book');
});

/* Post /books/new page. Create a new book */
router.post('/new', async (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const year = req.body.year;

  try {
    await Book.create({
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

      res.render('new-book', { isDataValid, titleRequired, authorRequired });
    }
  }
});

module.exports = router;
