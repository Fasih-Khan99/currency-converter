export const ENV = {
  BASE_URL: 'https://currency-converter-production-fa4d.up.railway.app/' 
};

export const ENDPOINTS = {
  CURRENCY: {
    LIST: `${ENV.BASE_URL}/currency/list`,
    CONVERT: `${ENV.BASE_URL}/currency/convert`
  }
};