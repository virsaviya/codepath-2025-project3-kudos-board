const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

const getCards = async () => {
  const cards = await prisma.card.findMany();
  return cards;
};

module.exports = {
  getCards,
};
