/** these consts should be in sync with frontend/src/config */
const ALL = 'ALL';
const RECENT = 'RECENT';
const CELEBRATION = 'CELEBRATION';
const GRATITUDE = 'GRATITUDE';
const INSPIRATION = 'INSPIRATION';

const FILTERS = [RECENT, CELEBRATION, GRATITUDE, INSPIRATION];

const validateQuery = ({ filter: _filter, query: _query }) => {
  const filter = FILTERS.includes(_filter) ? _filter : '';
  const query = typeof _query === 'string' ? _query : '';
  return { filter, query };
};

const validateCategory = (category) => {
  return FILTERS.includes(category) ? category : CELEBRATION;
};

module.exports = {
  validateQuery,
  validateCategory,
  RECENT,
};
