<p align="center">
 <img src="https://user-images.githubusercontent.com/9203826/154288895-670f5c23-81a1-4307-a080-1af83f7f8356.svg" align="center" alt="Ledger" />
 <h2 align="center">Connecting an Ethereum DApp to Ledger Live</h2>
</p>
  <p align="center">
    <a href="https://opensource.org/licenses/MIT">
      <img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg" />
    </a>
    <a href="https://discord.gg/y6nZhxv2bC">
      <img alt="Discord" src="https://img.shields.io/discord/885256081289379850?color=1C1CE1&label=Ledger%20%7C%20Discord%20%F0%9F%91%8B%20&style=flat-square" />
    </a>
  </p>

  <p align="center">
    <a href="https://developers.ledger.com/docs/live-app/start-here/">Ledger Developer Portal</a>
  </p>
</p>

# About

In this workshop you will build an Ethereum DApp using [wagmi](https://github.com/tmm/wagmi) and integrate it in Ledger Live.

This DApp will allow a user to write a message in _Ledger guest book_, like an already existing messages and even tip the author of a message.

## Prerequisites

To be successful in this tutorial, you should have [Node.js](https://nodejs.org/en/) installed on your machine. These days, we recommend using [nvm](https://github.com/nvm-sh/nvm).

You should also have [Metamask](https://metamask.io/) installed on your browser.

## Getting started

First thing first, install the project's dependencies.

```sh
$ yarn
```

You should now be abble to start the DApp and open it on your browser. To do so, simply run:

```sh
$ yarn dev
```

This should start the app (on http://localhost:3000 by default) and print the address on your terminal:

```sh
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

You should now be able to log in the DApp on your browser with Metamask.

## Build the DApp

Let's now implement the missing functionalities of this DApp.

The next steps will allow you to add basic and common functionalities like signing typed data, signing a message and sending a transaction.

Don't hesitate to test your DApp in your browser throughout the steps to make sure everything works fine.

### Step #1: Fetch the messages

First, let's develop the logic to fetch the last 10 messages.

This should be implemented in the `useFetchMessages` custom hook under `src/api/useFetchMessages.ts`.

There is a hook from the [wagmi documentation](https://wagmi.sh/docs/getting-started) that allows you to call a read-only method.

Don't hesitate to have a look at the contract abi available in `src/utils/contract.json` to figure out what contract method to call.

Once this is implemented, your DApp should be able to fetch a couple of pre-existing messages.

### Step #2: Sign an EIP-712 typed data (a user message)

Now that you can fetch the existing messages, let's add new messages to the list!

A message is a typed data (cf. [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md)) that will be signed by it's author.

The first step is then to develop the logic to sign typed data with the connected account.

This should be implemented in the `usePostMessage` custom hook under `src/api/usePostMessage.ts`.

There is a hook from the [wagmi documentation](https://wagmi.sh/docs/getting-started) that allows you to do an EIP-712 signature.

### Step #3: Post a message

Now that you have a proper message, let's send this message to the smart contract.

Sending our message to the smart contract consists of writing data to our smart contract.

This should also be implemented in the `usePostMessage` custom hook under `src/api/usePostMessage.ts`.

There is a hook from the [wagmi documentation](https://wagmi.sh/docs/getting-started) that allows you to call a write method.

### Step #4: Sign an EIP-191 message

Let's allow our users to like each others posts. Liking a post consists of a user signing a message (cf. [EIP-191](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md)) and then calling a method of the smart contract.

It's quite similar to what you did above to create a post, the difference behing that here the user will sign an EIP-191 message instead of an EIP-712 typed data.

The message to sign is the following:

```js
`I like the post #${id} posted by ${author}`;
```

This should be implemented in the `useLikeMessage` custom hook under `src/api/useLikeMessage.ts`.

There is a hook from the [wagmi documentation](https://wagmi.sh/docs/getting-started) that allows you to sign a message.

### Step #5: Like a message

Once the message is sucessfully signed by the user, let's actually share the fact that the associated post has been liked by a user by calling a method of the smart contract.

This step is verry similar to Step #3 where you posted a message, the main difference behing the method to call on the smart contract (and eventually it's arguments).

This should also be implemented in the `useLikeMessage` custom hook under `src/api/useLikeMessage.ts`.

### Step #6: Tips an author with a transaction

The last step consists of tipping an author to thank him for his great contribution.

Technically, this means sending a transaction to the author's address.

This should be implemented in the `useRewardAuthor` custom hook under `src/api/useRewardAuthor.ts`.

As always, there is a hook from the [wagmi documentation](https://wagmi.sh/docs/getting-started) that allows you to send a transaction.

## Let's add this DApp to Ledger Live

Now that you have your DApp up and running, let's add it to Ledger Live so that it can be used either in a browser with Metamask (as experienced above), or directly within Ledger Live.

This can be done in 3 steps:

- adding the [ledger-live-wagmi-connector](https://github.com/LedgerHQ/ledger-live-wagmi-connector) to your DApp
- smoothing out user experience
- creating a Manifest for your DApp

### Add the [ledger-live-wagmi-connector](https://github.com/LedgerHQ/ledger-live-wagmi-connector) to your DApp

The `@ledgerhq/ledger-live-wagmi-connector` is a connector for the popular [wagmi](https://github.com/tmm/wagmi) library built on top of the [@ledgerhq/iframe-provider](https://github.com/ledgerhq/iframe-provider).

It can be used to initialize a wagmi client that will seemlessly manage the interaction of your DApp with the Ledger Live wallet.

Let's add this dependency to our project

```sh
$ yarn add @ledgerhq/ledger-live-wagmi-connector
```

Now you just need to add a new `IFrameEthereumConnector` to the `connectors` array of your Wagmi client in `src/pages/_app.page.tsx`.

After this step, you should still be able to use your DApp normally on your browser with Metamask, but if you disconnect from the DApp (top righ corner), your should now see a drop down list with 2 options when you want to connect back in.

You won't be able to connect within Ledger Live just yet, so let's see the next steps.

### Smoothing out user experience

Since a Ledger Live user will automatically be logged in to your DApp when started in Ledger Live, you might want to adapt the DApp UI/UX to make it more natural and seamless to use in Ledger Live context.

First, let's create a `isIframe` utils function that will return `true` if the app is ran in an _iframe_, and `false` otherwise. This will be used to determine if the DApp is ran inside Ledger Live context or not.

With this util function, we can now remove or hide the `Connector` component of the `Header` when the app is launched in Ledger Live.

Similarrely, since the Ledger Live connector cannot be used outside of the Ledger Live context, there is no need to display it in the `Connector` component in the list of available connectors.

After this step, you should still be able to use your DApp normally on your browser with Metamask, and this time you should only have one option to connect when your DApp is started in your browser, Metamask.

### Create a Manifest for your DApp

Now that your DApp is ready to intract with Ledger Live, let's run it inside Ledger Live to test that everything works fine.

To do so, you will need to create a _Manifest_ file.

A _Manifest_ file is basically a `json` configuration file defining, among other things, your DApp name, URL, available networks, description, etc...

Here is an example of _Manifest_ file you could use to test your DApp (assuming it runs on http://localhost:3000), let's call it `manifest.json`:

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

To test everything, make sur you have a Goerli Testen account available in Ledger Live (to enable testnet networks, head over to `settings` -> `experimental features` and turn on the `developer mode` setting).

After this step, you should be able to use your DApp normally within Ledger Live context, and also on a browser environment with Metamask.

## Next steps

Keep in mind that the little test DApp that we created for this workshop is actually highly inneficient. For example, fetching the messages by dirrectly calling a method on the smart contract might not be the best way to go. You could use an API in between your DApp and the associated smart contract, like [The Graph](https://thegraph.com/en/) to more easilly access the relevant data. Same thing for the whole post creation and liking.

If you are interested in learning more about building and integrating on top of Ledger Live, check out the following resources:

[Nano App](https://developers.ledger.com/docs/nano-app/start-here/) to get your blockchain supported on Nano S/X/S Plus

[Blockchain support](https://developers.ledger.com/docs/coin/general-process/) to get your currency supported on Ledger Live.

[Live App](https://developers.ledger.com/docs/live-app/start-here/) to turn your DApp or regular app into a Live App in Ledger Live

[Connect your app](https://developers.ledger.com/docs/transport/overview/) to support a Nano on your desktop/web app
