# Tutorial 2: Triggering a Gasless Transaction

This guide demonstrates how to allow users to send transactions even with 0 SOL in their wallet.

## What is Account Abstraction?
Lazorkit uses **Smart Wallets**. Unlike traditional wallets (EOA), Smart Wallets can have their transaction fees (gas) sponsored by a **Paymaster** or paid using other tokens like USDC.

## Implementation (using Hooks)
We provide a custom hook `useTransfer` to simplify the process:

```tsx
const { transferSol, isLoading, signature } = useTransfer();

const handleAction = () => {
  transferSol(RECIPIENT_ADDRESS, 0.05); // Standard SOL transfer via Gasless Paymaster
};
```

Alternatively, you can use the lower-level `signAndSendTransaction` method for more control:
```tsx
const { signAndSendTransaction } = useWallet();

const sendTx = async () => {
  // Create a simple transfer instruction
  const ix = SystemProgram.transfer({
    fromPubkey: smartWalletPubkey, // The Smart Wallet address
    toPubkey: recipientPubkey,
    lamports: 1000000, // 0.001 SOL
  });
  
  const signature = await signAndSendTransaction({
    instructions: [ix],
    transactionOptions: {
      feeToken: 'USDC' // The Paymaster will handle the gas fee!
    }
  });
};
```

## Benefits
- **No SOL Needed**: New users can interact with your dApp immediately.
- **Improved Retention**: Removes the "I don't have enough gas" barrier.

## Quick Copy-Paste Example
Here is how the complete `GaslessTransfer.tsx` looks like:

```tsx
import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

/**
 * TransferButton Component
 * Demonstrates how to send a transaction without needing native SOL for gas.
 * This utilizes Lazorkit's Paymaster feature (Account Abstraction).
 */
export function TransferButton() {
  const { signAndSendTransaction, smartWalletPubkey, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [txSig, setTxSig] = useState<string | null>(null);

  const handleTransfer = async () => {
    if (!smartWalletPubkey) return alert('Please connect wallet first!');
    
    setLoading(true);
    try {
      // Destination: Any valid Solana Devnet address
      const destination = new PublicKey('6p8vK6L6uD8m8vG6... (your test address)');
      
      // Define a simple SOL transfer instruction
      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: destination,
        lamports: 0.01 * LAMPORTS_PER_SOL, // Sending 0.01 SOL
      });

      /**
       * Execute transaction with Gasless option.
       * Even if the user has 0 SOL, the transaction can be sponsored
       * or paid via other tokens if configured in the paymaster.
       */
      const signature = await signAndSendTransaction({
        instructions: [instruction],
        transactionOptions: {
          feeToken: 'USDC' // This enables the gas abstraction feature
        }
      });

      setTxSig(signature);
      console.log('Transaction Successful:', signature);
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Transaction Failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) return <p style={{ color: '#999' }}>Connect wallet to enable transfers.</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <button 
        onClick={handleTransfer} 
        disabled={loading}
        style={{ 
          padding: '1rem', 
          cursor: loading ? 'not-allowed' : 'pointer',
          background: '#9945FF', // Solana Purple
          color: 'white',
          border: 'none',
          borderRadius: '8px'
        }}
      >
        {loading ? 'Processing Gasless Tx...' : 'Send 0.01 SOL (Gasless)'}
      </button>

      {txSig && (
        <a 
          href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`} 
          target="_blank" 
          rel="noreferrer"
          style={{ fontSize: '0.8rem', color: '#14F195' }}
        >
          View Transaction on Explorer
        </a>
      )}
    </div>
  );
}
```