export const domain = {
  name: process.env.NEXT_PUBLIC_TYPEDDATADOMAIN_NAME,
  version: process.env.NEXT_PUBLIC_TYPEDDATADOMAIN_VERSION,
  verifyingContract: process.env.NEXT_PUBLIC_TYPEDDATADOMAIN_VOUCHER_CONTRACT,
  chainId: parseInt(process.env.NEXT_PUBLIC_TYPEDDATADOMAIN_CHAINID),
};

export const types = {
  postMessage: [
    { name: "content", type: "string" },
    { name: "owner", type: "address" },
  ],
};
