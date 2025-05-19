const express = require('express');

const {
  getBoards,
  getBoardById,
  createBoard,
  deleteBoard,
  createCard,
  upvoteCard,
  deleteCard,
} = require('./services');
const { validateQuery, validateCategory } = require('./utils');
const { ValidationError } = require('./middleware');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ test: 'success!' });
});

router.get('/boards', async (req, res) => {
  const { filter, query } = validateQuery(req.query);
  try {
    const boards = await getBoards(filter, query);
    if (boards) res.json(boards);
    else res.status(500).json(`Failed to get boards`);
  } catch (err) {
    res.status(500).json({ error: `Error getting boards` });
  }
});

router.post('/boards', async (req, res) => {
  const { title, category, author } = req.body;
  if (!title) throw new ValidationError('title');
  try {
    const newBoard = await createBoard({
      title,
      category: validateCategory(category),
      author,
    });
    if (newBoard) res.status(201).json(newBoard);
    else res.status(404).json(`Failed to create a new board.`);
  } catch (error) {
    res.status(500).json({ error: `Error creating a new board` });
  }
});

router.get('/boards/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const board = await getBoardById(id);
    if (board) res.json(board);
    else res.status(404).json(`Board not found`);
  } catch (error) {
    res.status(500).json({ error: `Error getting board by id` });
  }
});

router.delete('/boards/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedBoard = await deleteBoard(id);
    if (deletedBoard) res.status(201).json(deletedBoard);
    else res.status(404).json(`Failed to delete board ${id}`);
  } catch (err) {
    res.status(500).json({ error: `Error deleting board ${id}` });
  }
});

router.post('/cards', async (req, res) => {
  const { message, gif, author, boardId } = req.body;
  if (!message || !gif || !boardId) throw new ValidationError('data');
  try {
    const newCard = await createCard({
      message,
      gif,
      author,
      boardId: parseInt(boardId),
    });
    if (newCard) res.status(201).json(newCard);
    else res.status(404).json(`Failed to create a new card.`);
  } catch (error) {
    res.status(500).json({ error: `Error creating a new card` });
  }
});

router.delete('/cards/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedCard = await deleteCard(id);
    if (deletedCard) res.status(201).json(deletedCard);
    else res.status(404).json('Failed to delete card.');
  } catch (err) {
    res.status(500).json({ error: `Failed to delete card ${id}` });
  }
});

router.post('/cards/:id/upvote', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) throw new ValidationError('id');
    const updatedCard = await upvoteCard(id);
    if (updatedCard) res.status(201).json(updatedCard);
    else res.status(404).json(`Failed to upvote card ${id}`);
  } catch (err) {
    res.status(500).json({ error: `Error upvoting card ${id}` });
  }
});

module.exports = router;
