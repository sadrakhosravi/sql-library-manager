const express = require('express');
const { Book } = require('../../models');
const router = express.Router();

/* GET /books/:id/delete page. Deletes a book from database */
router.post('/:id/delete', async (req, res, next) => {
  const id = req.params.id;
  // find the book by id and delete it
  const bookToDelete = await Book.findByPk(id);
  await bookToDelete.destroy();

  res.redirect('/books');
});

module.exports = router;
