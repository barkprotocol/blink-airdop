"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function Header() {
  return (
    <header>
      <nav className="max-w-6xl mx-auto py-2 flex items-center justify-between gap-2 h-16">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src="https://ucarecdn.com/0c2a1b21-f836-4343-9d35-19386c7f7f4d/barkprotocoldark.svg"
            alt="BARK Logo"
            className="h-8" // Adjust height as needed
            loading="lazy" // Improve performance by lazy-loading the image
          />
          <span className="text-sm font-semibold">BETA</span>
        </a>

        {/* Wallet Multi Button */}
        <WalletMultiButton
          className="bg-primary text-primary-foreground border border-border rounded-md px-4 py-2 hover:bg-primary-foreground hover:text-primary transition-colors duration-150 ease-in-out"
          aria-label="Connect Wallet"
        />
      </nav>
    </header>
  );
}
