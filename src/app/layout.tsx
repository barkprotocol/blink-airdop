import type { Metadata } from "next";
import WalletProvider from "../components/WalletProvider";
import { Header } from "@/components/header";
import "./globals.css";

// Update Metadata
export const metadata: Metadata = {
  title: "BARK Airdrops",
  description: "Claim exclusive BARK tokens and explore the decentralized future.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "BARK Airdrops",
    description: "Get access to exclusive BARK airdrops and manage your rewards easily.",
    url: "https://barkprotocol.com",
    images: [
      {
        url: "/images/og-image.png",
        width: 800,
        height: 600,
        alt: "BARK Airdrops",
      },
    ],
  },
  metadataBase: new URL('https://barkprotocol.com'), // Set your production URL
};

// Root layout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Claim exclusive BARK tokens and explore the decentralized future." />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@600&family=Poppins:wght@300;400&display=swap" />
      </head>
      <body className="font-poppins antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="p-4 bg-white dark:bg-gray-800 shadow-md">
          <nav className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center">
            <a href="/" className="text-xl font-oswald" aria-label="Home Page">BARK Airdrops</a>
            <ul className="flex flex-wrap gap-4">
              <li><a href="/airdrops" className="hover:underline" aria-label="Airdrops Section">Airdrops</a></li>
              <li><a href="/campaigns" className="hover:underline" aria-label="Campaigns Section">Campaigns</a></li>
              <li><a href="/events" className="hover:underline" aria-label="Events Section">Events</a></li>
            </ul>
          </nav>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="p-4 bg-white dark:bg-gray-800 shadow-md text-center">
          <p>© {new Date().getFullYear()} BARK Protocol. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
