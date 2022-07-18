type postMessageType = (
  value: { owner: string; content: string },
  signature: string
) => Promise<any>;

// TODO: Implement me :) 
const postMessage: postMessageType = async (content, signature: string) => {
  console.log(content, signature);

};

export default postMessage;
