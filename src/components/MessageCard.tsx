import { useEffect, useMemo, useState } from "react";
import { Flex, Text, Link } from "@ledgerhq/react-ui";
import { Message } from "../utils/getMessages";
import getHashPreview from "../utils/getHashPreview";
import getDateDifference from "../utils/getDateDifference";
import { useSendTransaction, useSignMessage, useAccount } from "wagmi";
import { ethers } from "ethers";
import likeMessage from "../api/likeMessage";
import Snackbar from "./Snackbar";
import useEtherscanURL from "../utils/useEtherscanURL";

const MessageCard = ({ message }: { message: Message }) => {
  const now = useMemo(() => new Date(), []);
  const etherscanURL = useEtherscanURL();
  const { address } = useAccount();
  const [txHash, setTxHash] = useState("");
  const { data, sendTransaction } = useSendTransaction({
    request: {
      to: message.owner,
      value: ethers.BigNumber.from("1000000000000000"), // 0.001 ETH
    },
  });
  const { signMessage } = useSignMessage({
    onSuccess: async (signature, variables) => {
      try {
        const tx = await likeMessage(
          `${variables.message}`,
          signature,
          address,
          message.id
        );

        if (tx.error) throw new Error("Something goes wrong");

        setTxHash(tx.data.hash);
      } catch (e) {
        throw e;
      }
    },
  });

  useEffect(() => {
    if (data?.hash) setTxHash(data.hash);
  }, [data]);

  const handleTips = () => sendTransaction();

  const handleLike = () =>
    signMessage({
      message: `I like the post #${message.id} posted by ${message.owner}`,
    });

  return (
    <Flex
      flexDirection="column"
      width="100%"
      style={{ border: "1px solid hsla(0, 0%, 91%, 1)" }}
      p="0.25rem"
    >
      <Flex justifyContent="space-between" columnGap="0.25rem">
        <Link
          href={`${etherscanURL}/address/${message.owner}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <Text variant="small">{getHashPreview(message.owner)}</Text>
        </Link>
        <Text variant="extraSmall">
          {getDateDifference(
            new Date(parseInt(message.createdAt, 10) * 1_000),
            now
          )}
        </Text>
      </Flex>
      <Text as="p" variant="large" fontWeight="600">
        {message.content}
      </Text>
      <Flex justifyContent="flex-end" columnGap="1rem">
        <Text
          variant="small"
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        >
          ❤️ {message.likes}
        </Text>
        <Text
          variant="small"
          style={{ cursor: "pointer" }}
          onClick={handleTips}
        >
          💰 tips
        </Text>
      </Flex>
      {!!txHash.length ? (
        <Snackbar txHash={txHash} onClose={() => setTxHash("")} />
      ) : null}
    </Flex>
  );
};

export default MessageCard;
