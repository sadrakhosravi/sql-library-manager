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

router.post('/:id', async (req, res, next) => {
  const id = req.params.id;

  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const year = req.body.year;

  const book = await Book.findByPk(id);
  await book.update({
    title,
    author,
    genre,
    year,
  });
  res.render('update-book', { book });
});

module.exports = router;
