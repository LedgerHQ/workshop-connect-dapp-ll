# Connecting an Ethereum DApp to Ledger Live

In this workshop we'll build an Ethereum DApp using [Wagmi](https://github.com/tmm/wagmi) and integrate it in Ledger Live.

This DApp will allow a user to write a message in _Ledger guest book_, like already existing messages and even tip the author of a message.

## Prerequisites

To be successful in this tutorial, you should have [Node.js](https://nodejs.org/en/) installed on your machine. These days, I recommend using [nvm](https://github.com/nvm-sh/nvm).

You should also have [Metamask](https://metamask.io/) installed on your browser.

## Getting started

First thing first, install the project's dependencies.

```sh
$ yarn

# or

$ npm install
```

You should now be abble to start the DApp and open it on your browser. To do so, simply run:

```sh
$ yarn dev

# or

$ npm run dev
```

This should start the app (on http://localhost:3000 by default) and print the address on your terminal:

```sh
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

You should now be able to log in the DApp on your browser with Metamask.

## Fetch the messages

## Do the 712 signature

## Post a message

## Do the 191 signature

## Like a message

## Tips an author with a transaction

## Let's add thi DApp to Ledger Live

Now that we have our dapp up and running, let's add it to Ledger Live so that it can be used either in a browser with Metamask (as experienced above), or directly within Ledger Live.

This can be done in 3 steps:

- adding the [ledger-live-wagmi-connector](https://github.com/LedgerHQ/ledger-live-wagmi-connector) to your DApp
- smoothing out user experience
- creating a Manifest for your DApp

### Add the [ledger-live-wagmi-connector](https://github.com/LedgerHQ/ledger-live-wagmi-connector) to your DApp

The `@ledgerhq/ledger-live-wagmi-connector` is a connector for the popular [Wagmi](https://github.com/tmm/wagmi) library built on top of the [@ledgerhq/iframe-provider](https://github.com/ledgerhq/iframe-provider).

It can be used to initialize a wagmi client that will seemlessly manage the interaction of your DApp with the Ledger Live wallet.

Let's add this dependency to our project

```sh
$ yarn add @ledgerhq/ledger-live-wagmi-connector

# or

$ npm install @ledgerhq/ledger-live-wagmi-connector
```

Now you just need to add a new `IFrameEthereumConnector` to the `connectors` array of your Wagmi client in `src/pages/_app.page.tsx`

### Create a Manifest for your DApp

Now that our DApp is ready to intract with Ledger Live, let's

cf. https://developers.ledger.com/docs/dapp/manifest/

---

TODO:

- create base codebase
- write proper README
- rebase commits (remove commits history)
- make public
