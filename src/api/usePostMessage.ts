import { useContractWrite, useSignTypedData } from "wagmi";
import { abi } from "../utils/contract.json";
import { domain, types } from "../utils/EIP712";

const WRITE_ASYNC_OVERRIDES_GASLIMIT = { gasLimit: 250_000 };

const usePostMessage = () => {
  const { data, isError, isLoading, isSuccess, error, writeAsync } = useContractWrite({
    addressOrName: domain.verifyingContract,
    contractInterface: abi,
    functionName: 'sendMessage',
  });
  const { isError: is712Error, isSuccess: is712Success, error: error712, signTypedDataAsync } = useSignTypedData();

  const postMessage = async (message: string, author: string) => {
    try {
      const value = { contents: message, from: author };
      const signature = await signTypedDataAsync({ value, domain, types });
      const tx = await writeAsync({
        args: [message, signature],
        overrides: WRITE_ASYNC_OVERRIDES_GASLIMIT,
      });
      console.log(`tx hash: ${tx.hash}`);
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    postMessage,
    data,
    error: error || error712,
    isError: isError || is712Error,
    isLoading: isLoading || isLoading,
    isSuccess: isSuccess && is712Success
  };
};

export default usePostMessage;
