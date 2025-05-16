const express = require('express');

const {
  getBoards,
  getCards,
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

routes.get('/cards', async (req, res) => {
  try {
    const cards = await getCards();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: `Failed to get cards` });
  }
});

module.exports = routes;
