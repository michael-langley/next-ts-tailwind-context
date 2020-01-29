require('dotenv').config();
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  env: {
    APP_KEY: process.env.APP_KEY,
    APP_SECRET: process.env.APP_SECRET,
    APP_NAME: process.env.APP_NAME,
    BASE_URL: process.env.BASE_URL,
    TOKEN_URL: process.env.TOKEN_URL,
  },
});
