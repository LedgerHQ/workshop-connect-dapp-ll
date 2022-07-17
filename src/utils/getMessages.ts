export type Message = {
  id: string;
  owner: string;
  content: string;
  likes: number;
  createdAt: string;
};

export type FetchReturnData = {
  data: { messages: Array<Message> };
};

export const query = `
  query {
    messages(first: 10, orderDirection: desc, orderBy: createdAt, where: {isHide: false}) {
        id
        owner
        content
        likes
        createdAt
      }
  }
`;

const getMessages = async (): Promise<Array<Message> | null> => {
  try {
    const res = await fetch(
      "https://api.thegraph.com/subgraphs/name/qd-qd/roomchat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      }
    );
    const data = (await res.json()) as FetchReturnData;
    return data.data.messages;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default getMessages;
