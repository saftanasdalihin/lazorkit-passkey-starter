# Tutorial 1: Creating a Passkey-based Wallet

This guide explains how to enable biometric authentication using Lazorkit.

## How it Works
Lazorkit leverages **WebAuthn (Passkeys)** to generate a secure credential on the user's device. This credential is used to authorize a **Smart Wallet** on the Solana blockchain.

## Step 1: Wrap your App with LazorkitProvider
Initialize the SDK by providing the RPC URL and Portal URL.

```tsx
<LazorkitProvider rpcUrl={RPC} portalUrl={PORTAL}>
  <App />
</LazorkitProvider>
```

## Step 2: Use the useWallet Hook
Call the connect function to trigger the biometric prompt:

```typescript
import { useWallet } from '@lazorkit/wallet';

const { connect, isConnected, wallet } = useWallet();

const handleLogin = async () => {
  await connect(); // This triggers FaceID/Fingerprint/Pin
};
```

## Why this is 10x UX?
- **Zero Friction**: No "Install Phantom" popups.
- **Mobile Ready**: Works natively with iOS and Android biometrics.
- **Security**: Private keys never leave the hardware's secure enclave.