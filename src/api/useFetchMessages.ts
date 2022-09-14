import { useEffect } from "react";
import { useContractRead } from "wagmi";
import artifacts from "../utils/contract.json";
import { domain } from "../utils/EIP712";

const useFetchMessages = () => {
    const {data, refetch, isError, isLoading  } = useContractRead({
      addressOrName: domain.verifyingContract,
      contractInterface: artifacts.abi,
      functionName: "getLast10Messages",
      enabled: false
    });
  
    useEffect(() => {
        refetch();
    }, [])

    return { data, isError, isLoading, refetch };
};

export default useFetchMessages;
