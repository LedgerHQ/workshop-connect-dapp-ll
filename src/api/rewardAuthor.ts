type postMessageType = (
    author: string
) => Promise<any>;

// TODO: Implement me :) 
const rewardAuthor: postMessageType = async (address) => {
    console.log(address);

};

export default rewardAuthor;
