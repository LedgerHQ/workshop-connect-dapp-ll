import { useSignMessage, useContractWrite } from 'wagmi'
import { domain } from "../utils/EIP712";
import { abi } from "../utils/contract.json";

const WRITE_ASYNC_OVERRIDES_GASLIMIT = { gasLimit: 250_000 };

const useLikeMessage = () => {
  const { data, isError, isLoading, isSuccess, error, writeAsync } = useContractWrite({
    addressOrName: domain.verifyingContract,
    contractInterface: abi,
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
