import { useSendTransaction } from 'wagmi';
import { ethers } from "ethers";

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
