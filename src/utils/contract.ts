import { ethers } from "ethers";
import contractData from "./contract.json";

// @dev: The api key is the last element of the endpoint
const alchemyApiKey = process.env.ALCHEMY_API_KEY;

// Create a provider designed to connect to Alchemy
const provider = new ethers.providers.AlchemyProvider(
  parseInt(process.env.NEXT_PUBLIC_TYPEDDATADOMAIN_CHAINID),
  alchemyApiKey
);

// Create a signer using Ledger EOA private key. Attached the provider fresly create to the signer
// @dev: Ledger EOA private key is only accessible backend-side. Returns undefined otherwise.
const signer = new ethers.Wallet(process.env.EOA_PRIV_KEY, provider);

// Create a contract instance using the contract ABI and the signer
const contract = new ethers.Contract(
  process.env.NEXT_PUBLIC_TYPEDDATADOMAIN_VOUCHER_CONTRACT,
  contractData.abi,
  signer
);

export default contract;
