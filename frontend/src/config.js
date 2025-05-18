const DEV_BASE_URL = 'http://localhost:3001/api';
const PROD_BASE_URL = 'https://kudos-board-api-5gct.onrender.com/api';

export const baseUrl = import.meta.env.DEV ? DEV_BASE_URL : PROD_BASE_URL;

/** these consts should be in sync with backedn/src/utils */
export const ALL = 'ALL';
export const RECENT = 'RECENT';
export const CELEBRATION = 'CELEBRATION';
export const GRATITUDE = 'GRATITUDE';
export const INSPIRATION = 'INSPIRATION';

export const options = [RECENT, ALL, CELEBRATION, GRATITUDE, INSPIRATION];
