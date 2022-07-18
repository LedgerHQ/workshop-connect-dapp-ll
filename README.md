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

## Build the DApp

Let's now implement the missing functionalities of this DApp.

### Fetch the messages

### Do the 712 signature

### Post a message

### Do the 191 signature

### Like a message

### Tips an author with a transaction

## Let's add this DApp to Ledger Live

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

### Smoothing out user experience

Since a Ledger Live user will automatically be logged in to your DApp when started in Ledger Live, we might want to adapt the DApp UI/UX to make it more natural and seamless to use in Ledger Live context.

First, let's create a `isIframe` utils function that will return `true` if the app is ran in an _iframe_, and `false` otherwise.

With this util function, we can now remove or hide the `Connector` component of the `Header` when the app is launched in Ledger Live.

Similarrely, since the Ledger Live connector cannot be used outside of the Ledger Live context, there is no need to display it in the `Connector` component in the list of available connectors.

### Create a Manifest for your DApp

Now that our DApp is ready to intract with Ledger Live, let's run it inside Ledger Live to test that everything works fine.

To do so, you will need to create a _Manifest_ file.

A _Manifest_ file is basically a `json` configuration file defining, among other things, your DApp name, URL, available networks, description, etc...

Here is an example of _Manifest_ file you could use to test your DApp (assuming it runs on http://localhost:3000):

```json
{
  "id": "test-dapp",
  "name": "My super DApp",
  "url": "https://eth-dapp-browser-ne49wqncp-ledgerhq.vercel.app",
  "params": {
    "dappUrl": "http://localhost:3000",
    "nanoApp": "Ethereum",
    "dappName": "Test DApp",
    "networks": [
      {
        "currency": "ethereum",
        "chainID": 1,
        "nodeURL": "wss://eth-mainnet.ws.alchemyapi.io/v2/0fyudoTG94QWC0tEtfJViM9v2ZXJuij2"
      },
      {
        "currency": "polygon",
        "chainID": 137,
        "nodeURL": "https://polygon-mainnet.g.alchemy.com/v2/oPIxZM7kXsPVVY1Sk0kOQwkoIOpSu8PE"
      },
      {
        "currency": "ethereum_goerli",
        "chainID": 5,
        "nodeURL": "https://eth-goerli.g.alchemy.com/v2/vzJoUrfWDBOdwtCL-sybfBzIfNzY0_tk"
      }
    ]
  },
  "homepageUrl": "https://developers.ledger.com/",
  "platform": "all",
  "apiVersion": "0.0.1",
  "manifestVersion": "1",
  "branch": "debug",
  "categories": ["tools"],
  "currencies": "*",
  "content": {
    "shortDescription": {
      "en": "Try out the Ledger Live API to test capabilities of our platform integration solution. Use at your own risk."
    },
    "description": {
      "en": "Try out the Ledger Live API to test capabilities of our platform integration solution. Use at your own risk."
    }
  },
  "permissions": [
    {
      "method": "*"
    }
  ],
  "domains": ["https://*"]
}
```

To load your Live App locally, [unlock the Developer mode](https://developers.ledger.com/docs/live-app/developer-mode/) in Ledger Live and [add a local app](https://developers.ledger.com/docs/live-app/developer-mode/#add-a-local-app).

For more info on the _Manifest_ file, head over to the [Developer Portal](https://developers.ledger.com/docs/dapp/manifest/)

## Next steps

If you are interested in learning more about building and integrating on top of Ledger Live, check out the following resources:

[Nano App](https://developers.ledger.com/docs/nano-app/start-here/) to get your blockchain supported on Nano S/X/S Plus

[Blockchain support](https://developers.ledger.com/docs/coin/general-process/) to get your currency supported on Ledger Live.

[Live App](https://developers.ledger.com/docs/live-app/start-here/) to turn your DApp or regular app into a Live App in Ledger Live

[Connect your app](https://developers.ledger.com/docs/transport/overview/) to support a Nano on your desktop/web app

---

TODO:

- create base codebase
- write proper README
- rebase commits (remove commits history)
- make public
