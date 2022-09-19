import { IFrameEthereumConnector } from "@ledgerhq/ledger-live-wagmi-connector";
import { Flex, InfiniteLoader, StyleProvider } from "@ledgerhq/react-ui";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { allChains, configureChains, createClient, WagmiConfig } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";
import "../../styles/globals.css";

const { chains, provider } = configureChains(allChains, [publicProvider()]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new IFrameEthereumConnector({ chains, options: {} }),
    new InjectedConnector({ chains }),
  ],
  provider,
});

const WAGMIProvider = ({ children }: { children: JSX.Element }) => (
  <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
);

/*
 ** Next.js uses the App component to initialize pages. You can override it and control the page initialization.
 ** You need it to inject the providers on each page.
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
