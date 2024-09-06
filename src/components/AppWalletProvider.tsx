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
require("@solana/wallet-adapter-react-ui/styles.css");

type AppWalletProviderProps = {
  children: React.ReactNode;
};

const AppWalletProvider: React.FC<AppWalletProviderProps> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;

  // Memoize the Solana cluster endpoint
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
      console.error("Error initializing wallets:", error);
      return [];
    }
  }, [network]);

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
