const config = require('./config');
const commercetools = require('./api/commercetools');
const bold = require('./api/bold-checkout');

// State
const state = {
  commercetoolsAccessToken: undefined,
  product: undefined,
  cart: undefined,
  boldCheckoutUrl: undefined,
  log: [],
};

// Actions
async function fetchToken() {
  const {
    access_token,
  } = await commercetools.fetchTokenForAnonymousSession(config);

  state.commercetoolsAccessToken = access_token;
  state.log.push('Fetched commercetools token');
};

async function loadProducts() {
  const { results } = await commercetools.queryProductProjections(
    config,
    state.commercetoolsAccessToken,
  );

  state.product = results[0];
  state.log.push('Fetched products');
};

async function createCart() {
  state.cart = await commercetools.createMyCart(
    config,
    state.commercetoolsAccessToken,
  );
  state.log.push(`Created commercetools cart with ID ${state.cart.id}`);
};

async function addLineItem() {
  state.cart = await commercetools.addLineItem(config, {
    commercetoolsAccessToken: state.commercetoolsAccessToken,
    cartId: state.cart.id,
    cartVersion: state.cart.version,
    productId: state.product.id,
    variantId: state.product.lastVariantId,
    quantity: 1,
  });

  state.boldCheckoutUrl = bold.createBoldCheckoutUrl(config, {
    commercetoolsAccessToken: state.commercetoolsAccessToken,
    cartId: state.cart.id,
  });

  state.log.push(`Added product ${state.product.id} to cart ${state.cart.id}`);
};

async function redirectToCheckout(boldCheckoutUrl) {
  state.log.push(`Redirecting to Bold Checkout...`);
  window.location = boldCheckoutUrl;
};

// View
const fetchTokenButton = document.querySelector('#action-fetchtoken');
const fetchTokenResult = document.querySelector('#result-fetchtoken');
const queryProductsButton = document.querySelector('#action-queryproducts');
const queryProductsResult = document.querySelector('#result-queryproducts');
const createCartButton = document.querySelector('#action-createcart');
const createCartResult = document.querySelector('#result-createcart');
const addLineItemButton = document.querySelector('#action-addlineitem');
const addLineItemResult = document.querySelector('#result-addlineitem');
const checkoutButton = document.querySelector('#action-redirecttocheckout');
const outputLog = document.querySelector('#output-log');

function render() {
  const {
    commercetoolsAccessToken,
    cart,
    product,
  } = state;

  const hasAccessToken = Boolean(commercetoolsAccessToken);
  const hasCart = Boolean(cart);
  const hasLoadedProducts = Boolean(product);
  const hasItemsInCart = cart?.lineItems?.length > 0;
  const isReadyToCheckout = hasAccessToken && hasCart && hasItemsInCart;

  const boldCheckoutUrl = isReadyToCheckout && bold.createBoldCheckoutUrl(config, {
    commercetoolsAccessToken,
    cartId: cart.id,
    returnUrl: window.location.href,
  });

  // Update DOM
  fetchTokenButton.onclick = () => fetchToken().then(render);
  fetchTokenResult.innerHTML = hasAccessToken
    ? '✅ '
    : '';

  queryProductsButton.onclick = () => loadProducts().then(render);
  queryProductsButton.disabled = !hasAccessToken;
  queryProductsResult.innerHTML = hasLoadedProducts
    ? '✅ '
    : '';

  createCartButton.onclick = () => createCart().then(render);
  createCartButton.disabled = !hasAccessToken;
  createCartResult.innerHTML = hasCart
    ? '✅ '
    : '';

  addLineItemButton.onclick = () => addLineItem().then(render);
  addLineItemButton.disabled = !(hasCart && hasLoadedProducts);
  addLineItemResult.innerHTML = hasItemsInCart
    ? '✅ '
    : '';

  checkoutButton.onclick = () => redirectToCheckout(boldCheckoutUrl).then(render);
  checkoutButton.disabled = !isReadyToCheckout;

  outputLog.innerHTML = [
    ...state.log,
    boldCheckoutUrl ? `Bold Checkout URL is <a href="${boldCheckoutUrl}">${boldCheckoutUrl}</a>` : '',
  ]
    .filter(Boolean)
    .map(logEntry => `<li>${logEntry}</li>`)
    .join('\n');
};

render(state);
