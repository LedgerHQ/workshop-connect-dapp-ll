import { abi } from "../utils/contract.json";
import { domain } from "../utils/EIP712";

/* STEP #1
    TODO: Develop the logic to fetch the last 10 messages
    TIPS: There is a hook from the wagmi documentation that allows you to call a read-only method
    Link of the documentation: https://wagmi.sh/docs/getting-started
*/
const useFetchMessages = () => {
  // Connect the variables below
  return { data: [], isError: null, isLoading: false };
};

export default useFetchMessages;
