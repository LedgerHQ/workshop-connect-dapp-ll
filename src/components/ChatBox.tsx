import { useState } from "react";
import { useAccount } from "wagmi";
import { Flex, Text } from "@ledgerhq/react-ui";
import ArrowTopMedium from "@ledgerhq/icons-ui/react/ArrowTopMedium";
import styled from "styled-components";
import usePostMessage from "../api/usePostMessage";

const QrCodeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border-width: 0;
  color: ${(p) => p.theme.colors.palette.neutral.c00};
  background-color: ${(p) => p.theme.colors.palette.neutral.c100};
  cursor: pointer;
  &:disabled {
    background-color: ${(p) => p.theme.colors.palette.neutral.c30};
    color: ${(p) => p.theme.colors.palette.neutral.c50};
    cursor: unset;
  }
`;

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const { address, isConnected } = useAccount();

  const { isSuccess, isError, postMessage } = usePostMessage();

  const handleSubmit = async () => postMessage(message, address);

  return (
    <Flex flexDirection="column" rowGap="0.25rem">
      <Text as="label" variant="large" htmlFor="message">
        Write a message
      </Text>
      <Flex alignItems="center" columnGap="1rem" style={{ width: "100%" }}>
        <textarea
          id="message"
          name="message"
          placeholder="What's up, bruh?"
          style={{
            width: "100%",
            padding: "0.5rem",
            resize: "vertical",
            maxHeight: "300px",
          }}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Flex alignItems="center" justifyContent="center" pr="8px">
          <QrCodeButton
            onClick={handleSubmit}
            disabled={!message || !isConnected}
          >
            <ArrowTopMedium size="20px" />
          </QrCodeButton>
        </Flex>
      </Flex>
      {isSuccess ? (
        <Text variant="paragraph" style={{ color: "hsla(110, 49%, 66%, 1)" }}>
          Message sent!
        </Text>
      ) : null}
      {isError ? (
        <Text variant="paragraph" style={{ color: "hsla(359, 84%, 70%, 1)" }}>
          Internal error
        </Text>
      ) : null}
    </Flex>
  );
};

export default ChatBox;
