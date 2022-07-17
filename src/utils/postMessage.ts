import { ContractTransaction as ContractTransactionType } from "ethers";
import { SignatureLike } from "@ethersproject/bytes";
import contract from "./contract";
import { ethers } from "ethers";

type SendBurnTx = (
  signature: SignatureLike,
  owner: string,
  content: string
) => Promise<ContractTransactionType>;

const postMessage: SendBurnTx = async (signature, content, owner) => {
  try {
    // Send the transaction to the contract
    return contract["postMessage(string,address)"](content, owner, {
      maxFeePerGas: ethers.BigNumber.from(45000000000),
      maxPriorityFeePerGas: ethers.BigNumber.from(45000000000),
      gasLimit: 250000,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default postMessage;
