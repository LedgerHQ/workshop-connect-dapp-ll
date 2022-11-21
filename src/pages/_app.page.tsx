import { Flex, InfiniteLoader, StyleProvider } from "@ledgerhq/react-ui";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "../../styles/globals.css";

const { chains, provider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY })]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
});

const WAGMIProvider = ({ children }: { children: JSX.Element }) => (
  <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
);

/*
 ** Next.js uses the App component to initialize pages. You can override it and control the page initialization.
 ** We need it to inject our providers on each pages.
 */
const CustomApp = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return <InfiniteLoader />;
  }

  return (
    <StyleProvider selectedPalette="light" fontsPath="/fonts">
      <WAGMIProvider>
        <Flex flexDirection="column" rowGap={4} px={8} py={4}>
          <Header />
          <Component {...pageProps} />
        </Flex>
      </WAGMIProvider>
    </StyleProvider>
  );
};

export default CustomApp;
