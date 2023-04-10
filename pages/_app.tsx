import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { MagicConnector } from "@thirdweb-dev/react/evm/connectors/magic";
import type { AppProps } from "next/app";
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChain = "mumbai";

const magicLinkConnector = new MagicConnector({
  options: {
    apiKey: process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY as string,
    rpcUrls: {
      [activeChain]: "https://rpc-mumbai.maticvigil.com",
    },
  },
});

// Array of wallet connectors you want to use for your dApp.
const connectors = [magicLinkConnector];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      walletConnectors={connectors}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
