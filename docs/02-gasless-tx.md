# Tutorial 2: Executing Gasless Transfers

This guide demonstrates how to build a reusable transfer logic using Custom Hooks and execute transactions without requiring SOL for gas fees.

## The Architecture: Hook + Component

Instead of putting all logic inside the UI, we separate the transaction logic into a custom hook. This makes the code cleaner and more reusable across different parts of the dApp.

## Step 1: Create the useTransfer Hook

This hook manages the transaction state and interacts with the Lazorkit SDK to handle the gasless execution.

```typescript
// src/hooks/useTransfer.ts
import { useState } from 'react';
import { useLazorKit } from '@lazorkit/wallet-sdk';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

export const useTransfer = () => {
  const { signAndSendTransaction, address } = useLazorKit();
  const [isLoading, setIsLoading] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  const transferSol = async (recipient: string, amount: number) => {
    if (!address) return;
    setIsLoading(true);

    try {
      const instruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(address),
        toPubkey: new PublicKey(recipient),
        lamports: amount * LAMPORTS_PER_SOL,
      });

      // Sponsoring the transaction via configured Paymaster
      const txSig = await signAndSendTransaction({
        instructions: [instruction],
      });

      setSignature(txSig);
    } catch (error) {
      console.error("Transfer failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { transferSol, isLoading, signature };
};
```

💡 **Pro-Tip**: By wrapping the logic in a hook, you can easily track isLoading states to disable buttons or show spinners in your UI during the transaction.

## Step 2: Implement the TransferButton Component

Now, the UI component only focuses on the visual state and user interaction.

```typescript
// src/components/TransferButton.tsx
import { useTransfer } from '../hooks/useTransfer';

export function TransferButton() {
  const { transferSol, isLoading, signature } = useTransfer();

  const handleAction = () => {
    // Replace with a real Devnet address
    transferSol('7TM1LbfnfdV5ozAz8npnQ1rY4fMBMXZZZyeqzWAFz3Bk', 0.05);
  };

  return (
    <div>
      <button onClick={handleAction} disabled={isLoading}>
        {isLoading ? 'Processing Gasless Tx...' : 'Send 0.05 SOL (Gasless)'}
      </button>

      {signature && (
        <p>Success! Signature: {signature}</p>
      )}
    </div>
  );
}
```

⚠️ **Note on Base58**: Ensure the recipient address passed to transferSol is a full, valid Base58 string to avoid "non-base58 character" errors during the PublicKey initialization.

## Benefits of this Approach

- **Reusability**: You can call useTransfer in multiple components without rewriting the Solana logic.
- **Readability**: UI components remain small and focused on the "View" layer.
- **Gasless UX**: The complexity of Account Abstraction is hidden behind a simple transferSol function.