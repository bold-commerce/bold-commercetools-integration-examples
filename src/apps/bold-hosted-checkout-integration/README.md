# commercetools with Bold Hosted Checkout

This app demonstrates the simplest way to integrate Bold Checkout into a commercetools storefront. The approach is simple:

1. Create a commercetools access token and cart, then add some products to your cart.
2. Generate a unique Bold Checkout URL, encoding the cart ID, access tokens, and other required parameters.
3. When your customer is ready to check out, redirect them to this URL. Bold Checkout's frontend will be rendered and your customer can proceed through the checkout.
4. When the checkout is complete, your customer will be redirected back to the provided URL.

For a detailed guide describing this style of integration, see the [Integrate Bold Checkout with commercetools](https://developer.boldcommerce.com/default/guides/checkout/integrations/commercetools) guide in Bold's developer documentation.
