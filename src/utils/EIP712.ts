export const domain = {
  name: "ChatBox",
  version: "1",
  verifyingContract: "0x3B3818C2b8B29c3395589DE3a91bFb391ce5698B",
  chainId: 5,
};

export const types = {
  Message: [
    { name: 'from', type: 'address' },
    { name: 'contents', type: 'string' }
  ]
};
