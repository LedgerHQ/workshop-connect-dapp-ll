import { domain } from "../utils/EIP712";
import { abi } from "../utils/contract.json";

const WRITE_ASYNC_OVERRIDES_GASLIMIT = { gasLimit: 250_000 };

/* STEP #4
    TODO: Develop the logic to sign a message
    TIPS: There is a hook from the wagmi documentation that allows you to sign message (not a typed one)
    Link of the documentation: https://wagmi.sh/docs/getting-started
*/

/* STEP #5
    TODO: Develop the logic to like a message
    TIPS: There is a hook from the wagmi documentation that allows you to call a write method
    Link of the documentation: https://wagmi.sh/docs/getting-started
*/
const useLikeMessage = () => {
  const likeMessage = async (id: string, author: string) => {
    // Implement me :)
  };

  return {
    likeMessage,
    data: null,
    error: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
  };
};

export default useLikeMessage;
