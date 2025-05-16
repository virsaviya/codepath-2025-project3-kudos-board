const ALL = 'ALL';
const RECENT = 'RECENT';
const CELEBRATION = 'CELEBRATION';
const THANK_YOU = 'THANK_YOU';
const INSPO = 'INSPO';

const FILTERS = [RECENT, CELEBRATION, THANK_YOU, INSPO];

const validateQuery = ({ filter: _filter, query: _query }) => {
  const filter = FILTERS.includes(_filter) ? _filter : '';
  const query = typeof _query === 'string' ? _query : '';
  return { filter, query };
};

const validateCategory = (category) => {
  return FILTERS.includes(category) ? category : ALL;
};

module.exports = {
  validateQuery,
  validateCategory,
};
