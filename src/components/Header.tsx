import { Flex, Text } from "@ledgerhq/react-ui";
import dynamic from "next/dynamic";

// @dev: Import the component client-side only (no SSR -- metamask requires window)
const Connector = dynamic(() => import("../components/Connector"), {
  ssr: false,
});

const Header = () => {
  return (
    <Flex
      justifyContent="space-between"
      style={{ borderBottom: "1px solid grey" }}
    >
      <Text variant="h1">Ledger Guestbook</Text>
      <Connector />
    </Flex>
  );
};

export default Header;
