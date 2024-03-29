import artifacts from "../utils/contract.json";
import { domain, types } from "../utils/EIP712";

const WRITE_ASYNC_OVERRIDES_GASLIMIT = { gasLimit: 250_000 };

/* STEP #2
    TODO: Develop the logic to sign typed data with connected account
    TIP: There is a hook from the Wagmi documentation to make a 712 signature
    Link of the documentation: https://wagmi.sh/docs/getting-started
*/

/* STEP #3
    TODO: Develop the logic to post a message
    TIP: There is a hook from the Wagmi documentation to call the write method
    Link of the documentation: https://wagmi.sh/docs/getting-started
*/
const usePostMessage = () => {
  // Implement the logic to sign typed data with connected account

  const postMessage = (message: string, author: string) => {
    // Implement me :)
  };

  return {
    postMessage,
    data: null,
    error: null,
    isError: null,
    isLoading: null,
    isSuccess: null,
  };
};

export default usePostMessage;
