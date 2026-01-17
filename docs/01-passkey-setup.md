# Tutorial 1: Creating a Passkey-based Wallet

This guide explains how to enable biometric authentication and initialize a Smart Account using the Lazorkit SDK.

## How it Works
Lazorkit leverages **WebAuthn (Passkeys)** to generate a secure credential on the user's device. This credential acts as the "key" to authorize a Smart Wallet (Account Abstraction) on the Solana blockchain, eliminating the need for traditional seed phrases.

## Step 1: Wrap your App with LazorkitProvider
Initialize the SDK at the root of your application. Ensure you include the paymasterConfig if you intend to sponsor user transactions (Gasless).

```typescript
import { LazorkitProvider } from '@lazorkit/wallet-sdk';

// Configuration from your constants/env
const LAZORKIT_CONFIG = {
  RPC_URL: import.meta.env.VITE_RPC_URL,
  PORTAL_URL: import.meta.env.VITE_PORTAL_URL,
  PAYMASTER: {
    url: import.meta.env.VITE_PAYMASTER_URL,
  }
};

export function Root() {
  return (
    <LazorkitProvider
      rpcUrl={LAZORKIT_CONFIG.RPC_URL}
      portalUrl={LAZORKIT_CONFIG.PORTAL_URL}
      paymasterConfig={LAZORKIT_CONFIG.PAYMASTER}
    >
      <App />
    </LazorkitProvider>
  );
}
```

💡 **Pro-Tip**: Always use environment variables prefixed with VITE_ (for Vite users) to manage your RPC and Portal URLs securely.

## Step 2: Trigger Authentication
Use the useWallet hook to handle the connection logic. When connect() is called, the user will be redirected to the Lazorkit Portal to register their biometrics.

```typescript
import { useWallet } from '@lazorkit/wallet-sdk';

const { connect, isConnected, address } = useWallet();

const handleLogin = async () => {
  try {
    await connect(); 
    // User performs Fingerprint/FaceID on the Portal
  } catch (err) {
    console.error("Login failed", err);
  }
};
```

⚠️ **Important Note**: The SDK relies on Node.js globals like Buffer. If you are using Vite, you must install a polyfill plugin (e.g., vite-plugin-node-polyfills) and inject it in your entry file to prevent "Buffer is not defined" errors.

## Why this is 10x UX?

- **Zero Friction**: No "Install Phantom" popups or browser extensions required.
- **Mobile Ready**: Works natively with iOS and Android biometrics out of the box.
- **Seedless & Secure**: Private keys never leave the hardware's secure enclave, removing the risk of lost seed phrases.
- **Gasless Ready**: By configuring the Paymaster, your users never have to worry about buying SOL just to pay for network fees.