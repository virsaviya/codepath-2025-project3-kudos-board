const DEV_BASE_URL = 'http://localhost:3001/api';
const PROD_BASE_URL = '@TODO';

export const baseUrl = import.meta.env.DEV ? DEV_BASE_URL : PROD_BASE_URL;
