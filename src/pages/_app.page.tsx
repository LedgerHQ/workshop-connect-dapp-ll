import { Flex, InfiniteLoader, StyleProvider } from "@ledgerhq/react-ui";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import WAGMIProvider from "../utils/WAGMIProvider";
import "../../styles/globals.css";

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
