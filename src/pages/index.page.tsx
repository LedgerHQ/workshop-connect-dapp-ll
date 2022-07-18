import { Flex } from "@ledgerhq/react-ui";
import ChatBox from "../components/ChatBox";
import MessageCard from "../components/MessageCard";
import { Message } from "../utils/types";

const Home = ({ messages }: { messages: Array<Message> }) => (
  <main style={{ maxWidth: "40rem", paddingTop: "3rem" }}>
    <ChatBox />
    {messages?.length ? (
      <Flex flexDirection="column" rowGap="1rem" mt="2rem">
        {messages?.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </Flex>
    ) : null}
  </main>
);

export default Home;
