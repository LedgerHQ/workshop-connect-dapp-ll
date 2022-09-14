import { useMemo } from "react";
import { Flex, Text, Link } from "@ledgerhq/react-ui";
import { Message } from "../utils/types";
import getHashPreview from "../utils/getHashPreview";
import getDateDifference from "../utils/getDateDifference";
import useEtherscanURL from "../utils/useEtherscanURL";
import useLikeMessage from "../api/useLikeMessage";
import useRewardAuthor from "../api/useRewardAuthor";

const MessageCard = ({ message }: { message: Message }) => {
  const now = useMemo(() => new Date(), []);
  const etherscanURL = useEtherscanURL();
  const { likeMessage } = useLikeMessage();
  const { rewardAuthor } = useRewardAuthor();

  const handleTip = () => rewardAuthor(message.author);
  const handleLike = () => likeMessage(message.id, message.author);

  return (
    <Flex
      flexDirection="column"
      width="100%"
      style={{ border: "1px solid hsla(0, 0%, 91%, 1)" }}
      p="0.25rem"
    >
      <Flex justifyContent="space-between" columnGap="0.25rem">
        <Link
          href={`${etherscanURL}/address/${message.author}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <Text variant="small">{getHashPreview(message.author)}</Text>
        </Link>
        <Text variant="extraSmall">
          {getDateDifference(
            new Date(parseInt(message.timestamp.toString(), 10) * 1_000),
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
          ❤️ {message.likes.toString()}
        </Text>
        <Text
          variant="small"
          style={{ cursor: "pointer" }}
          onClick={handleTip}
        >
          💰 tips
        </Text>
      </Flex>
    </Flex>
  );
};

export default MessageCard;
