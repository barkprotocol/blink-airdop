import { Connection, PublicKey, Transaction, TransactionSignature, TransactionInstruction } from '@solana/web3.js';
import { WalletAdapter } from '@solana/wallet-adapter-base';
import { useMemo } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Use environment variables for network URL and program ID
const NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK_URL || 'https://api.mainnet-beta.solana.com';
const TOKEN_PROGRAM_ID = process.env.TOKEN_PROGRAM_ID || 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';

// Function to get the Solana provider from wallet context
export function getProvider(): WalletAdapter | null {
  const { wallet } = useWallet();
  return wallet || null;
}

// Function to get the signer (the wallet itself if it has a public key)
export function getSigner(): WalletAdapter | null {
  const wallet = getProvider();
  return wallet?.publicKey ? wallet : null;
}

// Function to get a connection to the Solana network
export function getConnection(): Connection {
  return new Connection(NETWORK, 'confirmed');
}

// Function to send a transaction with retry logic
export async function sendTransaction(
  transaction: Transaction,
  connection: Connection,
  wallet: WalletAdapter,
  maxRetries = 3
): Promise<TransactionSignature> {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      if (!wallet.publicKey) {
        throw new SolanaError('Wallet does not have a public key');
      }

      // Sign the transaction
      await wallet.signTransaction(transaction);

      // Send the transaction
      const signature = await wallet.sendTransaction(transaction, connection);

      // Confirm the transaction
      await connection.confirmTransaction(signature, 'confirmed');

      return signature;
    } catch (error) {
      console.error(`Transaction Error (Attempt ${retries + 1}):`, error);
      retries++;
      if (retries >= maxRetries) {
        throw error instanceof SolanaError ? error : new SolanaError('Failed to send transaction after multiple attempts');
      }
    }
  }
}

// Function to simulate a transaction
export async function simulateTransaction(transaction: Transaction, connection: Connection): Promise<void> {
  try {
    const { value } = await connection.simulateTransaction(transaction);
    if (value.err) {
      throw new SolanaError(`Transaction simulation failed: ${JSON.stringify(value.err)}`);
    }
  } catch (error) {
    console.error('Transaction Simulation Error:', error);
    throw error instanceof SolanaError ? error : new SolanaError('Failed to simulate transaction');
  }
}

// Function to create a transaction instruction for transfer
export function createTransferInstruction(
  fromPublicKey: PublicKey,
  toPublicKey: PublicKey,
  amount: number
): TransactionInstruction {
  const programId = new PublicKey(TOKEN_PROGRAM_ID);
  const data = Buffer.from(Uint8Array.of(amount)); // Adjust based on actual data format

  return new TransactionInstruction({
    keys: [
      { pubkey: fromPublicKey, isSigner: true, isWritable: true },
      { pubkey: toPublicKey, isSigner: false, isWritable: true },
    ],
    programId,
    data,
  });
}

// Function to check wallet balance
export async function checkWalletBalance(connection: Connection, walletPublicKey: PublicKey): Promise<number> {
  try {
    const balance = await connection.getBalance(walletPublicKey);
    return balance;
  } catch (error) {
    console.error('Error checking wallet balance:', error);
    throw new SolanaError('Failed to check wallet balance');
  }
}

// Function to ensure sufficient balance for a transaction
export async function ensureSufficientBalance(connection: Connection, wallet: WalletAdapter, amount: number): Promise<void> {
  if (!wallet.publicKey) {
    throw new SolanaError('Wallet does not have a public key');
  }
  const balance = await checkWalletBalance(connection, wallet.publicKey);
  if (balance < amount) {
    throw new SolanaError('Insufficient balance to cover transaction');
  }
}

// Custom error class for Solana-related errors
export class SolanaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SolanaError';
  }
}

// Hook to use connection and wallet from context
export function useSolana() {
  const { connection } = useConnection();
  const { wallet } = useWallet();

  // Use memoization to avoid unnecessary re-calculations
  const memoizedConnection = useMemo(() => getConnection(), []);
  const memoizedWallet = useMemo(() => getProvider(), []);

  return { connection: memoizedConnection, wallet: memoizedWallet };
}
