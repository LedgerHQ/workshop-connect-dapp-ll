import { allChains, configureChains, createClient, WagmiConfig } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(allChains, [publicProvider()]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
});

const WAGMIProvider = ({ children }: { children: JSX.Element }) => (
  <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
);

export default WAGMIProvider;
