import { Button, Flex, Text } from "@ledgerhq/react-ui";
import Image from "next/image";
import { useMemo } from "react";
import {
  Connector as WAGMIConnect,
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";
import getHashPreview from "../utils/getHashPreview";

type ConnectorButtonProps = {
  connector?: WAGMIConnect;
  onClick: () => void;
};

const ConnectorButton = ({ connector, onClick }: ConnectorButtonProps) => {
  if (!connector) return null;

  return (
    <Button
      disabled={!connector.ready}
      variant="shade"
      outline={false}
      onClick={onClick}
      fontSize={3}
      style={{ padding: "0.75rem", borderRadius: "50%" }}
    >
      <Image
        src={`/connectors/${connector.name}.svg`}
        alt={connector.name}
        width={24}
        height={24}
      />
    </Button>
  );
};

const DisconnectButton = ({
  address,
  onClick,
}: {
  address: string;
  onClick: () => void;
}) => {
  const addressPreview = useMemo(() => getHashPreview(address), [address]);

  return (
    <Button variant="shade" outline={false} onClick={onClick} fontSize={3}>
      Disconnect{" "}
      <Text variant="small" fontWeight="light">
        ({addressPreview})
      </Text>
    </Button>
  );
};

const Connector = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  // Render null if the connectors are loading
  if (!connectors.length) return null;

  // Render the disconnect button if needed
  if (isConnected)
    return <DisconnectButton address={address} onClick={disconnect} />;

  // Render the list of connectors available
  return (
    <Flex columnGap={2}>
      {connectors.map((connector) => {
        /**
         * Don't display the Ledger Live connector since users are automatically
         * connected inside the Ledger Live wallet and can't connect to it
         * outisde the apllication (i.e: in a browser)
         */
        if (connector.id === "ledgerLive") {
          return;
        }

        return (
          <ConnectorButton
            key={connector.id}
            connector={connector}
            onClick={() => connect({ connector })}
          />
        );
      })}
      {error && <div>{error.message}</div>}
    </Flex>
  );
};

export default Connector;
