import { ethers } from "ethers";

/* STEP #6
    TODO: Develop the logic to send a transaction
    TIP: There is a hook from the Wagmi documentation to send a transaction
    Link of the documentation: https://wagmi.sh/docs/getting-started
*/
const useRewardAuthor = () => {
  const rewardAuthor = async (author: string) => {
    // Implement me :)
  };
  return {
    data: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    isIdle: false,
    rewardAuthor,
  };
};

export default useRewardAuthor;
