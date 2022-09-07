import { Flex } from "@ledgerhq/react-ui";
import ChatBox from "../components/ChatBox";
import MessageCard from "../components/MessageCard";
import DisconnectedMessage from "../components/DisconnectedMessage";
import useFetchMessages from "../api/useFetchMessages";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const Home = () => {
  const { data: messages } = useFetchMessages();
  const { isConnected } = useAccount();

  // don't render the app if the user isn't connected with an EOA
  if (!isConnected) return <DisconnectedMessage />;

  // filter empty messages
  const filteredMessages = messages?.filter(
    (message) => message.author !== ethers.constants.AddressZero
  );

  return (
    <main style={{ maxWidth: "40rem", paddingTop: "3rem" }}>
      <ChatBox />
      {filteredMessages?.length ? (
        <Flex flexDirection="column" rowGap="1rem" mt="2rem">
          {filteredMessages.map((message) => (
            <MessageCard key={message.id.toString()} message={message} />
          ))}
        </Flex>
      ) : null}
    </main>
  );
};

export default Home;
