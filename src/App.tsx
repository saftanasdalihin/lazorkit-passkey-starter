import { LazorkitProvider } from '@lazorkit/wallet';
import { LAZORKIT_CONFIG } from './config/constants';
import { Layout } from './components/Layout';
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
      <Layout>
        {/* Step 1 Card */}
        <section style={cardStyle}>
          <div style={stepLabelStyle}>STEP 1</div>
          <h3 style={{ marginTop: 0 }}>Passkey Authentication</h3>
          <p style={descStyle}>Create a secure smart wallet using your device's biometrics.</p>
          <ConnectButton />
        </section>

        {/* Step 2 Card */}
        <section style={cardStyle}>
          <div style={stepLabelStyle}>STEP 2</div>
          <h3 style={{ marginTop: 0 }}>Gasless Transfer</h3>
          <p style={descStyle}>Execute a transaction sponsored by a paymaster—no SOL needed for gas.</p>
          <TransferButton />
        </section>
      </Layout>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <span style={{ 
          background: '#14F19522', color: '#14F195', padding: '4px 12px', 
          borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #14F195' 
        }}>
          ● Solana Devnet
        </span>
      </div>
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

const cardStyle = { background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' };
const stepLabelStyle = { color: '#9945FF', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '8px' };
const descStyle = { color: '#4a5568', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.5' };