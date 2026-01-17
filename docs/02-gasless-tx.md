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
    // Replace with a real Devnet address for demo
    transferSol('7TM1LbfnfdV5ozAz8npnQ1rY4fMBMXZZZyeqzWAFz3Bk', 0.05);
  };

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      <button 
        onClick={handleAction} 
        disabled={isLoading}
        style={{ 
          padding: '12px 24px', 
          fontSize: '1rem', 
          fontWeight: 'bold',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          background: isLoading ? '#ccc' : 'linear-gradient(90deg, #9945FF 0%, #14F195 100%)', // Gradient Solana
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          transition: 'transform 0.2s, opacity 0.2s',
          boxShadow: '0 4px 14px 0 rgba(153, 69, 255, 0.39)',
          opacity: isLoading ? 0.7 : 1
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isLoading ? 'Processing Gasless Tx...' : 'Send 0.05 SOL (Gasless)'}
      </button>

      {/* Success Message */}
      {signature && (
        <div style={{ padding: '10px', backgroundColor: '#14f19522', borderRadius: '8px', border: '1px solid #14F195' }}>
          <p style={{ color: '#00a35c', fontSize: '0.85rem', margin: 0 }}>
            ✅ <strong>Success!</strong> Signature: 
            <a 
              href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`} 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#9945FF', marginLeft: '5px' }}
            >
              {signature.slice(0, 8)}...
            </a>
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{ padding: '10px', backgroundColor: '#ff444422', borderRadius: '8px', border: '1px solid #ff4444' }}>
          <p style={{ color: '#ff4444', fontSize: '0.85rem', margin: 0 }}>
            ❌ {error}
          </p>
        </div>
      )}
    </div>
  );
}
```

💡 **Pro-Tip**: The feeToken: 'USDC' option in signAndSendTransaction is what triggers the gas abstraction feature, allowing the Paymaster to sponsor the transaction.

⚠️ **Note on Base58**: Always ensure the toAddress is a valid Solana address. If the string contains non-base58 characters (like dots or spaces), the new PublicKey() constructor will throw an error.