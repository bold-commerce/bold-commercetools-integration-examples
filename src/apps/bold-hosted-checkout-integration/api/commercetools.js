function createHeaders(commercetoolsAccessToken) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${commercetoolsAccessToken}`);
  return headers;
}

async function fetchTokenForAnonymousSession(config) {
  const {
    commercetools: {
      clientId,
      clientSecret,
      authHost,
      projectKey,
    },
  } = config;

  const headers = new Headers();
  headers.append('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`);

  const options = {
    method: 'POST',
    headers,
    redirect: 'follow',
  };

  // NOTE: commercetools offers several authentication flows. Bold Checkout
  // supports tokens created by the following flows:
  //
  // - Password Flow: https://docs.commercetools.com/api/authorization#password-flow
  // - Create Token for Anonymous Session: https://docs.commercetools.com/api/authorization#tokens-for-anonymous-sessions
  return fetch(`${authHost}/oauth/${projectKey}/anonymous/token?grant_type=client_credentials`, options)
    .then(response => response.json());
}

async function queryProductProjections(config, commercetoolsAccessToken) {
  const {
    commercetools: {
      apiHost,
      projectKey,
    },
  } = config;

  const headers = createHeaders(commercetoolsAccessToken);
  const options = {
    method: 'GET',
    headers,
    redirect: 'follow',
  };

  return fetch(`${apiHost}/${projectKey}/product-projections`, options)
    .then(response => response.json());
}

async function createMyCart(config, commercetoolsAccessToken) {
  const {
    commercetools: {
      apiHost,
      projectKey,
      currencyIso,
    },
  } = config;

  const headers = createHeaders(commercetoolsAccessToken);
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      currency: currencyIso,
    }),
    redirect: 'follow',
  };

  // NOTE: Bold Checkout requires carts be scoped to a user, so we are using
  // the commercetools Create My Cart endpoint:
  // https://docs.commercetools.com/api/projects/me-carts#create-a-cart
  return fetch(`${apiHost}/${projectKey}/me/carts`, options)
    .then(response => response.json());
}

async function addLineItem(config, params) {
  const {
    commercetools: {
      apiHost,
      projectKey,
    },
  } = config;
  const {
    commercetoolsAccessToken,
    cartId,
    cartVersion,
    productId,
    variantId,
    quantity = 1,
  } = params;

  const headers = createHeaders(commercetoolsAccessToken);

  const body = JSON.stringify({
    version: cartVersion,
    actions: [
      {
        action: 'addLineItem',
        productId,
        variantId,
        quantity,
      },
    ],
  });

  const options = {
    method: 'POST',
    headers,
    body,
    redirect: 'follow',
  };

  return fetch(`${apiHost}/${projectKey}/me/carts/${cartId}`, options)
    .then(response => response.json());
}

module.exports = {
  fetchTokenForAnonymousSession,
  addLineItem,
  createMyCart,
  queryProductProjections,
};
