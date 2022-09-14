import { domain } from "../utils/EIP712";
import artifacts from "../utils/contract.json";

const WRITE_ASYNC_OVERRIDES_GASLIMIT = { gasLimit: 250_000 };

/* STEP #4
    TODO: Develop the logic to sign a message
    TIP: There is a hook from the Wagmi documentation to sign message (not typed ones)
    Link of the documentation: https://wagmi.sh/docs/getting-started
*/

/* STEP #5
    TODO: Develop the logic to like a message
    TIP: There is a hook from the Wagmi documentation to call the write method
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
