const express = require('express');

const { getCards } = require('./services');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Welcome to my app!');
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
