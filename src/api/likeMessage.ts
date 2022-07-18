type likeMessageType = (
  message: string,
  signature: string,
  signer: string,
  id: string
) => Promise<any>;

// TODO: Implement me :) 
const likeMessage: likeMessageType = async (message, signature, signer, id) => {
  console.log(message, signature, signer, id);
};

export default likeMessage;
