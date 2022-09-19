import { Flex, Text } from "@ledgerhq/react-ui";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import isIframe from "../utils/isIframe";

// @dev: Import the component client-side only (no SSR -- metamask requires window)
const Connector = dynamic(() => import("../components/Connector"), {
  ssr: false,
});

const Header = () => {
  const [isInLL, setIsInLL] = useState<boolean>(false);

  useEffect(() => {
    setIsInLL(isIframe());
  }, []);

  return (
    <Flex
      justifyContent="space-between"
      style={{ borderBottom: "1px solid grey" }}
    >
      <Text variant="h1">Ledger Guestbook</Text>
      {!isInLL && <Connector />}
    </Flex>
  );
};

export default Header;
