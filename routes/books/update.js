const express = require('express');
const { Book } = require('../../models');
const router = express.Router();

/* GET /books page. Displays all the books */
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const book = await Book.findByPk(id, { raw: true });
  res.render('update-book', { book });
});

module.exports = router;
