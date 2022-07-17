const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};
const ROUTE = "api/likeMessage";
type likeMessageType = (
  message: string,
  signature: string,
  signer: string,
  id: string
) => Promise<any>;

const likeMessage: likeMessageType = async (message, signature, signer, id) => {
  try {
    const response = await fetch(ROUTE, {
      ...requestOptions,
      body: JSON.stringify({ message, signature, signer, id }),
    });
    return response.json();
  } catch (e) {
    throw e;
  }
};

export default likeMessage;
