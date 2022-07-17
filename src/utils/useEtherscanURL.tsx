import { useNetwork, etherscanBlockExplorers } from "wagmi";

const useEtherscanURL = () => {
  const { chain } = useNetwork();
  return chain ? etherscanBlockExplorers[chain.network]?.url : "";
};

export default useEtherscanURL;
