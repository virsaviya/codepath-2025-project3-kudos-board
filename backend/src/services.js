const { RECENT } = require('./utils');

const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient({
  // log: ['warn', 'error'],
});

const getBoards = async (filter, query) => {
  const filterBy =
    filter === '' || filter === RECENT ? {} : { category: filter };

  const boards = await prisma.board.findMany({
    include: { cards: true },
    orderBy: { createdAt: 'desc' },
    where: {
      ...filterBy,
      title: {
        contains: query,
        mode: 'insensitive',
      },
    },
  });

  return filter === RECENT ? boards.slice(0, 6) : boards;
};

const getBoardById = async (id) => {
  const board = await prisma.board.findUnique({
    where: { id },
    include: { cards: true },
  });
  return board;
};

const createBoard = async ({ title, category, author }) => {
  const newBoard = await prisma.board.create({
    data: {
      title,
      category,
      author,
    },
  });
  return newBoard;
};

const deleteBoard = async (id) => {
  const deletedBoard = prisma.board.delete({
    where: { id },
    include: { cards: true },
  });
  return deletedBoard;
};

const createCard = async ({ boardId, message, gif, author }) => {
  const newCard = await prisma.card.create({
    data: {
      message,
      gif,
      author,
      upvotes: 1,
      board: { connect: { id: boardId } },
    },
  });
  return newCard;
};

const upvoteCard = async (id) => {
  const card = await prisma.card.findUnique({ where: { id } });
  if (!card) return null;

  const updatedCard = await prisma.card.update({
    where: { id },
    data: {
      ...card,
      upvotes: card.upvotes + 1,
    },
  });
  return updatedCard;
};

const deleteCard = async (id) => {
  const deletedCard = await prisma.card.delete({
    where: { id },
  });
  return deletedCard;
};

module.exports = {
  getBoards,
  getBoardById,
  createBoard,
  deleteBoard,
  createCard,
  upvoteCard,
  deleteCard,
};
