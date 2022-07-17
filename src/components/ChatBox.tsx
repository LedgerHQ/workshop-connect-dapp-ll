import { useState } from "react";
import { useSignTypedData } from "wagmi";
import { useAccount } from "wagmi";
import { domain, types } from "../utils/EIP712";
import postMessage from "../api/postMessage";
import { Flex, Text } from "@ledgerhq/react-ui";
import ArrowTopMedium from "@ledgerhq/icons-ui/react/ArrowTopMedium";
import styled from "styled-components";
import Snackbar from "./Snackbar";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [txHash, setTxHash] = useState("");
  const { isError, isSuccess, signTypedData } = useSignTypedData({
    onSuccess: async (data) => {
      const tx = await postMessage({ owner: address, content: message }, data);

      if (tx.error) throw new Error("Something goes wrong");
      setTxHash(tx.data.hash);
      setMessage("");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { address, isConnected } = useAccount();
  const handleSubmit = async () => {
    const value = { content: message, owner: address };

    try {
      await signTypedData({
        domain,
        types,
        value,
      });
    } catch (e) {
      console.error(e);
    }
  };

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

  return (
    <Flex flexDirection="column" rowGap="0.25rem">
      <Text as="label" variant="large" htmlFor="message">
        Save your thoughts
      </Text>
      <Flex alignItems="center" columnGap="1rem" style={{ width: "100%" }}>
        <textarea
          id="message"
          name="message"
          placeholder="what's up, bruh?"
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
      {!!txHash.length ? (
        <Snackbar txHash={txHash} onClose={() => setTxHash("")} />
      ) : null}
    </Flex>
  );
};

export default ChatBox;
