const express = require('express');
const routes = require('./routes');
const { Prisma } = require('../prisma/generated/client');

const { ValidationError, NotFoundError } = require('./middleware');

const app = express();
app.use(express.json());
app.use('/', routes);

// Handle common Prisma errors (e.g., unique constraint violation)
app.use((err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof NotFoundError)
    return res.status(err.statusCode).json({ error: err.message });
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002')
      return res
        .status(400)
        .json({ error: 'A unique constraint violation occurred.' });
  }
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
