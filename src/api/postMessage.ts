const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};
const ROUTE = "api/postMessage";
type postMessageType = (
  value: { owner: string; content: string },
  signature: string
) => Promise<any>;

const postMessage: postMessageType = async (value, signature: string) => {
  try {
    const response = await fetch(ROUTE, {
      ...requestOptions,
      body: JSON.stringify({ value, signature }),
    });
    return response.json();
  } catch (e) {
    throw e;
  }
};

export default postMessage;
