export const ENV = {
  BASE_URL: 'http://localhost:3000' 
};

export const ENDPOINTS = {
  CURRENCY: {
    LIST: `${ENV.BASE_URL}/currency/list`,
    CONVERT: `${ENV.BASE_URL}/currency/convert`
  }
};