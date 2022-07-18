import { useEffect } from "react";
import { useContractRead } from "wagmi";
import { abi } from "../utils/contract.json";
import { domain } from "../utils/EIP712";

const useFetchMessages = () => {
    const { data, isError, isLoading, refetch } = useContractRead({
        addressOrName: domain.verifyingContract,
        contractInterface: abi,
        functionName: 'getLast10Messages',
        enabled: false,
    });

    useEffect(() => {
        refetch();
    }, [])

    return { data, isError, isLoading };
};

export default useFetchMessages;
