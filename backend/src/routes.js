const express = require('express');

const {
  getBoards,
  getBoardById,
  createBoard,
  deleteBoard,
  createCard,
  upvoteCard,
  deleteCard,
  searchBoards,
  filterBoards,
} = require('./services');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

routes.get('/boards', async (req, res) => {
  try {
    const boards = await getBoards();
    if (boards) res.json(boards);
    else res.status(500).json(`Failed to get all boards`);
  } catch (err) {
    res.status(500).json({ error: `Error getting boards` });
  }
});

routes.get('/boards/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const board = await getBoardById(id);
    if (board) res.json(board);
    else res.status(404).json(`Board not found`);
  } catch (error) {
    res.status(500).json({ error: `Error getting board by id` });
  }
});

routes.post('/boards', async (req, res) => {
  try {
    const { title, category, author } = req.body;
    const newBoard = await createBoard({
      title,
      category,
      author,
    });
    if (newBoard) res.status(201).json(newBoard);
    else res.status(404).json(`Failed to create a new board.`);
  } catch (error) {
    res.status(500).json({ error: `Error creating a new board` });
  }
});

routes.delete('/boards/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedBoard = await deleteBoard(id);
    if (deletedBoard) res.status(201).json(deletedBoard);
    else res.status(404).json(`Failed to delete board ${id}`);
  } catch (err) {
    res.status(500).json({ error: `Error deleting board ${id}` });
  }
});

routes.post('/cards', async (req, res) => {
  try {
    const { message, gif, author, boardId } = req.body;
    const newCard = await createCard({
      message,
      gif,
      author,
      boardId: parseInt(boardId),
    });
    console.log(newCard);
    if (newCard) res.status(201).json(newCard);
    else res.status(404).json(`Failed to create a new card.`);
  } catch (error) {
    res.status(500).json({ error: `Error creating a new card` });
  }
});

routes.put('/cards/upvote/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedCard = await upvoteCard(id);
    if (updatedCard) res.status(201).json(updatedCard);
    else res.status(404).json(`Failed to upvote card ${id}`);
  } catch (err) {
    res.status(500).json({ error: `Error upvoting card ${id}` });
  }
});

routes.delete('/cards/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedCard = await deleteCard(id);
    if (deletedCard) res.status(201).json(deletedCard);
    else res.status(404).json('Failed to delete card.');
  } catch (err) {
    res.status(500).json({ error: `Failed to delete card ${id}` });
  }
});

routes.get('/boards/filter/:filterBy', async (req, res) => {
  try {
    const { filterBy } = req.params;
    const results = await filterBoards(filterBy);
    if (Array.isArray(results)) res.json(results);
    else res.status(404).json(`Failed to search through boards for ${query}`);
  } catch (err) {
    res.status(500).json({ error: `Error searching for ${query}` });
  }
});

routes.get('/boards/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const results = await searchBoards(query);
    if (Array.isArray(results)) res.json(results);
    else res.status(404).json(`Failed to search through boards for ${query}`);
  } catch (err) {
    res.status(500).json({ error: `Error searching for ${query}` });
  }
});

module.exports = routes;
