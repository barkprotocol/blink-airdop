"use client";

import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import {
  SolflareWalletAdapter,
  BackpackWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";

// Import default styles for wallet adapter UI
if (process.env.NODE_ENV === 'development') {
  require("@solana/wallet-adapter-react-ui/styles.css");
}

// Type definition for environment variables
type EnvNetwork = 'testnet' | 'mainnet' | 'devnet';

// Function to get network from environment variable
const getNetwork = (): WalletAdapterNetwork => {
  const envNetwork = process.env.NEXT_PUBLIC_SOLANA_NETWORK as EnvNetwork;
  switch (envNetwork) {
    case 'testnet':
      return WalletAdapterNetwork.Testnet;
    case 'mainnet':
      return WalletAdapterNetwork.Mainnet;
    default:
      return WalletAdapterNetwork.Devnet;
  }
};

type AppWalletProviderProps = {
  children: React.ReactNode;
};

const AppWalletProvider: React.FC<AppWalletProviderProps> = ({ children }) => {
  // Memoize the Solana cluster endpoint based on the network
  const network = useMemo(() => getNetwork(), []);
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Memoize the wallet adapters
  const wallets = useMemo(() => {
    try {
      return [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new BackpackWalletAdapter(),
      ];
    } catch (error) {
      console.error("Error initializing wallets:", error.message || error);
      return [];
    }
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="wallet-container">{children}</div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default AppWalletProvider;
