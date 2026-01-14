import { LazorkitProvider } from '@lazorkit/wallet';
import { LAZORKIT_CONFIG } from './config/constants';
import { ConnectButton } from './components/ConnectButton';
import { TransferButton } from './components/TransferButton';

/**
 * Main App Component
 * Demonstrates the integration of LazorkitProvider to enable 
 * Passkey-based Smart Wallets on Solana.
 */
export default function App() {
  return (
    <LazorkitProvider
      rpcUrl={LAZORKIT_CONFIG.RPC_URL}
      portalUrl={LAZORKIT_CONFIG.PORTAL_URL}
      paymasterConfig={LAZORKIT_CONFIG.PAYMASTER}
    >
      <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1>Solana Passkey Starter</h1>
          <p>Powered by Lazorkit SDK</p>
        </header>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          {/* 1. Wallet Connection Section */}
          <section style={{ width: '100%', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '12px' }}>
            <h3>Step 1: Authenticate with Biometrics</h3>
            <ConnectButton />
          </section>

          {/* 2. Transaction Section */}
          <section style={{ width: '100%', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '12px' }}>
            <h3>Step 2: Execute Gasless Transaction</h3>
            <TransferButton />
          </section>
        </main>
      </div>
    </LazorkitProvider>
  );
}