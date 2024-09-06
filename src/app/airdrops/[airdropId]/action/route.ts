"use client";

import { createClient } from '@/lib/supabase';
import { ActionError, ActionGetResponse, createActionHeaders } from '@solana/actions';
import { PublicKey, Transaction, TransactionInstruction, Connection } from '@solana/web3.js';
import { getProvider, getSigner } from '@/lib/solana';
import { verifyRequestSignature, validatePublicKey } from '@/lib/validation';

const headers = createActionHeaders();

// Function to handle errors
function handleError(error: any, defaultMessage: string) {
  console.error('Error:', error);
  const message = typeof error === 'string' ? error : defaultMessage;
  return new Response(JSON.stringify({ message }), { status: 500, headers });
}

// Function to fetch airdrop details
async function fetchAirdropDetails(airdropId: string) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('airdrops')
      .select()
      .eq('airdrop_id', airdropId)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error('Failed to fetch airdrop details');
  }
}

// Function to handle the transfer
async function handleTransfer(airdrop: any, walletPublicKey: PublicKey, secretPhrase?: string) {
  const provider = getProvider();
  const signer = getSigner();
  const { tokenAccount, destinationAddress, amount } = airdrop; // Assuming these fields are in your airdrop data

  if (!provider || !signer) {
    throw new Error('Provider or signer not available');
  }

  try {
    // Create a transaction
    const transaction = new Transaction();

    // Add transfer instruction
    const transferInstruction = new TransactionInstruction({
      keys: [
        { pubkey: walletPublicKey, isSigner: false, isWritable: true },
        { pubkey: new PublicKey(destinationAddress), isSigner: false, isWritable: true },
        // Add any additional keys required for the transfer
      ],
      programId: new PublicKey(tokenAccount), // Replace with actual program ID
      data: Buffer.from(Uint8Array.of(amount)), // Adjust according to the instruction data format
    });

    transaction.add(transferInstruction);

    // Sign and send the transaction
    const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com', 'confirmed');
    const signature = await provider.sendTransaction(transaction, [signer]);

    // Confirm the transaction
    await connection.confirmTransaction(signature, 'confirmed');

    // Update database to mark airdrop as claimed
    const supabase = createClient();
    const { error } = await supabase
      .from('airdrops')
      .update({ claimed: true })
      .eq('airdrop_id', airdrop.airdrop_id);
    if (error) throw error;

    return { success: true, message: 'Transfer completed successfully' };
  } catch (error) {
    console.error('Transfer Error:', error);
    throw new Error('Failed to complete transfer');
  }
}

// Function to validate and handle the POST request
async function processPostRequest(request: Request, airdropId: string) {
  try {
    // Extract and validate the request data
    const { walletPublicKey, secretPhrase } = await request.json();
    if (!validatePublicKey(walletPublicKey)) {
      throw new Error('Invalid wallet public key');
    }

    // Fetch airdrop details
    const airdrop = await fetchAirdropDetails(airdropId);
    if (!airdrop) {
      return new Response(JSON.stringify({ status: 404, message: 'Airdrop not found' }), { status: 404, headers });
    }

    // Handle transfer
    const result = await handleTransfer(airdrop, new PublicKey(walletPublicKey), secretPhrase);

    return new Response(JSON.stringify(result), { status: 200, headers });
  } catch (error) {
    return handleError(error, 'Failed to handle POST request');
  }
}

// POST request handler
export async function POST(request: Request, { params }: { params: { airdropId: string } }) {
  try {
    const { airdropId } = params;

    // Verify request signature for added security
    if (!verifyRequestSignature(request)) {
      return new Response(JSON.stringify({ status: 403, message: 'Unauthorized request' }), { status: 403, headers });
    }

    return await processPostRequest(request, airdropId);
  } catch (error) {
    return handleError(error, 'Failed to handle POST request');
  }
}

// OPTIONS request handler
export async function OPTIONS(_request: Request) {
  return new Response(null, { headers });
}
