# Bold commercetools Examples

## Description

This repository contains demos of front-end integrations between commercetools and various Bold products. It is framework-agnostic and is designed to showcase the minimum number of steps to implement a particular type integration.

## Included Applications

- [Bold Hosted Checkout Integration](./src/apps/bold-hosted-checkout-integration/README.md) showcases the fastest way to get started with commercetools and Bold Checkout, by leveraging Bold Checkout's hosted frontend.

## Dependencies/Prerequisites

Before you begin, please make sure you have:

* [Created a commercetools project](https://docs.commercetools.com/getting-started/initial-setup).
* Created a set of [commercetools API client credentials](https://docs.commercetools.com/getting-started/create-api-client) using the "Mobile & single-page application client" template.
* [Connected Bold Account Center to your commercetools store](https://support.boldcommerce.com/hc/en-us/articles/4413612597396-Create-Connect-a-Bold-Account).

Note, this project assumes you have working knowledge of the following:

* [Git](https://git-scm.com/).
* JavaScript.
* [NodeJS](https://nodejs.org/en/).
* [NPM](https://www.npmjs.com/).
* The basics of working with HTTP APIs.

Additionally, it's also a good idea to be somewhat familiar with the [commercetools API documentation](https://docs.commercetools.com/api/), as well as the [Bold Developer Documentation](https://developer.boldcommerce.com/).

## Installation

1. Using Git, clone this repository.
2. Navigate to the directory: `cd bold-commercetools-integration-examples`.
3. Install the required NodeJS dependencies: `npm install`.
4. Create a copy of the example environment variables file: `cp example.env .env`.
5. Edit the new `.env` file and enter the appropriate values for your store (these will largely come from your [commercetools API client](https://docs.commercetools.com/getting-started/create-api-client)).

## Running the Sample Applications

1. Run `npm run dev`.
2. Open your browser to [localhost:9000](http://localhost:9000).
3. Follow the links to the demonstration app of your choice.

## Support

- For help articles and support related to general Bold Commerce applications (particularly admin configuration), see [support.boldcommerce.com](http://support.boldcommerce.com).
- For Bold developer documentation and API specifications, visit [developer.boldcommerce.com](https://developer.boldcommerce.com/).
