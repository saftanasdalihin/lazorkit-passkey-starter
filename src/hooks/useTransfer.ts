import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL, TransactionInstruction } from '@solana/web3.js';

/**
 * Custom Hook: useTransfer
 * Manages the logic for sending gasless SOL transfers.
 */
export const useTransfer = () => {
  const { signAndSendTransaction, smartWalletPubkey } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const transferSol = async (toAddress: string, amount: number) => {
    if (!smartWalletPubkey) {
      setError("Wallet not connected");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSignature(null);

    try {
      // 1. Validate destination address
      const destination = new PublicKey(toAddress);

      // 2. Create the SOL transfer instruction
      const instruction: TransactionInstruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: destination,
        lamports: amount * LAMPORTS_PER_SOL,
      });

      // 3. Execute gasless transaction via Lazorkit
      const txSig = await signAndSendTransaction({
        instructions: [instruction],
        transactionOptions: {
          feeToken: 'USDC' // Paymaster sponsors gas or user pays with USDC
        }
      });

      setSignature(txSig);
      return txSig;
    } catch (err: any) {
      console.error("Transfer Error:", err);
      setError(err.message || "Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { transferSol, isLoading, signature, error };
};