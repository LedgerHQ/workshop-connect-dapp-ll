import { Flex } from "@ledgerhq/react-ui";
import ChatBox from "../components/ChatBox";
import MessageCard from "../components/MessageCard";
import useFetchMessages from "../api/useFetchMessages";
import { ethers } from "ethers";

const Home = () => {
  const { data: messages } = useFetchMessages();
  const filteredMessages = messages.filter(
    (message) => message.author !== ethers.constants.AddressZero
  );

  return (
    <main style={{ maxWidth: "40rem", paddingTop: "3rem" }}>
      <ChatBox />
      {filteredMessages.length ? (
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
