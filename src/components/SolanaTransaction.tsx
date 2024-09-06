"use client";

import React, { useState } from "react";
import { PublicKey, Transaction, SystemProgram, Connection } from "@solana/web3.js";
import { getProvider, getSigner, sendTransaction, getConnection } from "@/lib/solana";
import { Button, Input, Label } from "@/components/ui";

const SolanaTransaction: React.FC = () => {
  const [walletPublicKey, setWalletPublicKey] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [destinationAddress, setDestinationAddress] = useState<string>("");
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setTransactionStatus(null);

    try {
      const provider = getProvider();
      const signer = getSigner();
      const connection = getConnection();

      if (!provider || !signer) {
        throw new Error("Provider or signer not available");
      }

      const fromPublicKey = new PublicKey(walletPublicKey);
      const toPublicKey = new PublicKey(destinationAddress);

      // Create the transfer instruction
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: fromPublicKey,
        toPubkey: toPublicKey,
        lamports: amount * 1e9, // Convert SOL to lamports (1 SOL = 10^9 lamports)
      });

      // Create and send the transaction
      const transaction = new Transaction().add(transferInstruction);
      const signature = await sendTransaction(transaction, connection, provider);
      
      setTransactionStatus(`Transaction successful with signature: ${signature}`);
    } catch (err) {
      setError(`Error: ${(err as Error).message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Solana Transaction</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="walletPublicKey">Wallet Public Key</Label>
          <Input
            id="walletPublicKey"
            type="text"
            value={walletPublicKey}
            onChange={(e) => setWalletPublicKey(e.target.value)}
            placeholder="Enter wallet public key"
            required
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount (SOL)</Label>
          <Input
            id="amount"
            type="number"
            step="any"
            min="0"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Enter amount"
            required
          />
        </div>
        <div>
          <Label htmlFor="destinationAddress">Destination Address</Label>
          <Input
            id="destinationAddress"
            type="text"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            placeholder="Enter destination address"
            required
          />
        </div>
        <Button type="submit">Send Transaction</Button>
        {transactionStatus && <p className="text-green-500 mt-4">{transactionStatus}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default SolanaTransaction;
