function createBoldCheckoutUrl(config, params) {
  const {
    bold: {
      shopHostname,
    },
  } = config;

  const {
    cartId,
    commercetoolsAccessToken,
    returnUrl,
  } = params;

  const baseUrl = 'https://cashier.boldcommerce.com/boldplatform/checkout/build_order_begin';

  const queryParams = new URLSearchParams();
  queryParams.append('platform', 'commercetools');
  queryParams.append('shop', shopHostname);
  queryParams.append('return_url', returnUrl);
  queryParams.append('cart_id', cartId);
  queryParams.append('user_access_token', commercetoolsAccessToken);

  return `${baseUrl}?${queryParams}`;
}

module.exports = {
  createBoldCheckoutUrl,
};
