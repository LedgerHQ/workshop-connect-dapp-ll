import { useSignMessage, useContractWrite } from 'wagmi'
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
  const { data, isError, isLoading, isSuccess, error, writeAsync } = useContractWrite({
    addressOrName: domain.verifyingContract,
    contractInterface: artifacts.abi,
    functionName: 'likeMessage',
  });
  const { error: erroSign, isError: isSignError, isLoading: isSignLoading, isSuccess: isSignSuccess, signMessageAsync } = useSignMessage();

  const likeMessage = async (id: string, author: string) => {
    try {
      const signature = await signMessageAsync({ message: `I like the post #${id} posted by ${author}` });
      console.log({ signature })
      const tx = await writeAsync({
        args: [id],
        overrides: WRITE_ASYNC_OVERRIDES_GASLIMIT,
      });
      console.log(`tx hash: ${tx.hash}`);
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    likeMessage,
    data,
    error: error || erroSign,
    isError: isError || isSignError,
    isLoading: isLoading || isSignLoading,
    isSuccess: isSuccess && isSignSuccess
  };
};

export default useLikeMessage;
