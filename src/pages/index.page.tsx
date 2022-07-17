import ChatBox from "../components/ChatBox";
import getMessages, { Message } from "../utils/getMessages";
import MessageCard from "../components/MessageCard";
import { Flex } from "@ledgerhq/react-ui";

const Home = ({ messages }: { messages: Array<Message> }) => (
  <main style={{ maxWidth: "40rem", paddingTop: "3rem" }}>
    <ChatBox />
    {messages.length ? (
      <Flex flexDirection="column" rowGap="1rem" mt="2rem">
        {messages?.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </Flex>
    ) : null}
  </main>
);

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const messages = await getMessages();

  // Pass data to the page via props
  return { props: { messages } };
}

export default Home;
