# Tutorial 2: Triggering a Gasless Transaction

This guide demonstrates how to allow users to send transactions even with 0 SOL in their wallet by leveraging Lazorkit's Paymaster.

## The Architecture: Custom Hook Logic

We use a custom hook useTransfer to manage the transaction state (isLoading, signature, error) and interact with the @solana/web3.js library.

## Step 1: The useTransfer Hook

This hook builds the instruction and sends it to the Lazorkit SDK for gasless execution.

```typescript
// src/hooks/useTransfer.ts
import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL, TransactionInstruction } from '@solana/web3.js';

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
      const destination = new PublicKey(toAddress);

      const instruction: TransactionInstruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: destination,
        lamports: amount * LAMPORTS_PER_SOL,
      });

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
```

## Step 2: Implementation in Component

You can now use this hook in your TransferButton.tsx to handle user interactions.

```typescript
import { useTransfer } from '../hooks/useTransfer';

export function TransferButton() {
  const { transferSol, isLoading, signature, error } = useTransfer();

  const handleAction = () => {
    // Standard SOL transfer via Gasless Paymaster
    transferSol('6p8vK6L6uD8m8vG6X7Y8Z9A1B2C3D4E5F6G7H8I9', 0.05); 
  };

  return (
    <div>
      <button onClick={handleAction} disabled={isLoading}>
        {isLoading ? 'Processing Gasless Tx...' : 'Send 0.05 SOL (Gasless)'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {signature && <p>Success! Signature: {signature}</p>}
    </div>
  );
}
```

💡 **Pro-Tip**: The feeToken: 'USDC' option in signAndSendTransaction is what triggers the gas abstraction feature, allowing the Paymaster to sponsor the transaction.

⚠️ **Note on Base58**: Always ensure the toAddress is a valid Solana address. If the string contains non-base58 characters (like dots or spaces), the new PublicKey() constructor will throw an error.