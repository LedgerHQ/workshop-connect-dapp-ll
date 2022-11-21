/*
 ** Accept an arbitrary hash and return a preview of it.
 ** Return the first 4 and the last 4 characters.
 ** Example: 0xB7F9a1bb18A846f76bE8b8CfAdA7b24c54ACfB83 -> 0xB7...fB83
 */
const getHashPreview = (hash: string) => {
  const [start, end] = [hash.substring(0, 4), hash.substring(hash.length - 4, hash.length)];
  return `${start}...${end}`;
};

export default getHashPreview;
