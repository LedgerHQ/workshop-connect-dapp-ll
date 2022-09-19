const isIframe = (): boolean => {
  // Server-side
  if (typeof window === "undefined") return false;

  // Client-side: test if the app is within the iframe or not
  return window.self !== window.top;
};
 
export default isIframe;
