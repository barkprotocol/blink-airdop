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
          style={{
            backgroundColor: 'hsl(222.2 47.4% 11.2%)',
            color: 'hsl(210 40% 98%)',
            height: '2.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: '1px solid hsl(214.3 31.8% 91.4%)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            fontSize: '0.875rem',
            fontWeight: '500',
            lineHeight: '1.25rem',
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </nav>
    </header>
  );
}
