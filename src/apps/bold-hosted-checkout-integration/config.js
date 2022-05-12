const config = Object.freeze({
  commercetools: {
    apiHost: process.env.COMMERCETOOLS_API_HOST,
    authHost: process.env.COMMERCETOOLS_AUTH_HOST,
    projectKey: process.env.COMMERCETOOLS_PROJECT_KEY,
    clientId: process.env.COMMERCETOOLS_CLIENT_ID,
    clientSecret: process.env.COMMERCETOOLS_CLIENT_SECRET,
    currencyIso: process.env.COMMERCETOOLS_CURRENCY_ISO,
  },
  bold: {
    shopHostname: process.env.BOLD_SHOP_HOSTNAME,
  },
});

const missingEnvVars = [
  ...Object.entries(config.commercetools),
  ...Object.entries(config.bold),
].filter(entry => !entry[1]);

if (missingEnvVars.length > 0) {
  throw new Error('One or more required environment variables is missing.');
}

module.exports = config;
