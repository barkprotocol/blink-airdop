"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function Header() {
  return (
    <header>
      <nav className="max-w-6xl mx-auto py-2 flex items-center justify-between gap-2 h-16">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src="https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg"
            alt="BARK Logo"
            className="h-8" // Adjust height as needed
          />
          <span className="text-xl font-semibold">BARK | Airdrops</span>
        </a>

        {/* Wallet Multi Button */}
        <WalletMultiButton
          className="bg-primary text-primary-foreground border border-border rounded-md px-4 py-2 hover:bg-primary-foreground hover:text-primary transition-colors duration-150 ease-in-out"
          aria-label="Connect Solana Wallet"
        />
      </nav>
    </header>
  );
}
