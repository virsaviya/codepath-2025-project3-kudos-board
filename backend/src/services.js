const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

const getBoards = async () => {
  console.log('getBoards');
  const boards = await prisma.board.findMany({
    include: { cards: true },
  });
  return boards;
};

const getCards = async () => {
  const cards = await prisma.card.findMany();
  return cards;
};

module.exports = {
  getBoards,
  getCards,
};
