import { useSendTransaction } from 'wagmi';
import { ethers } from "ethers";

/* STEP #6
    TODO: Develop the logic to send a transaction
    TIP: There is a hook from the Wagmi documentation to send a transaction
    Link of the documentation: https://wagmi.sh/docs/getting-started
*/
const useRewardAuthor = () => {
  const { data, isIdle, isError, isLoading, isSuccess, sendTransactionAsync } =
  useSendTransaction()

const rewardAuthor = async (author: string) => {
  const tx = await sendTransactionAsync({
      request: {
          to: author,
          value: ethers.BigNumber.from('1000000000000000'), // 0.001 ETH
      }
  })
  console.log(`tx hash: ${tx.hash}`);
}

return { data, isError, isLoading, isSuccess, isIdle, rewardAuthor };
};

export default useRewardAuthor;
