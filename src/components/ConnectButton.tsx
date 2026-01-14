import { useWallet } from '@lazorkit/wallet';

/**
 * ConnectButton Component
 * Handles biometric authentication (Passkeys) via Lazorkit's useWallet hook.
 */
export function ConnectButton() {
  const { connect, disconnect, isConnected, isConnecting, wallet } = useWallet();

  // Show abbreviated address if connected
  if (isConnected && wallet) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.8rem', color: '#666' }}>
          Smart Wallet Address: <strong>{wallet.smartWallet}</strong>
        </p>
        <button 
          onClick={() => disconnect()}
          style={{ padding: '0.8rem', cursor: 'pointer', background: '#ff4444', color: 'white', border: 'none', borderRadius: '8px' }}
        >
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => connect()} 
      disabled={isConnecting}
      style={{ 
        padding: '1rem 2rem', 
        fontSize: '1rem', 
        cursor: 'pointer', 
        background: '#14F195', // Solana Green
        border: 'none', 
        borderRadius: '8px',
        fontWeight: 'bold'
      }}
    >
      {isConnecting ? 'Authenticating...' : 'Sign in with Passkey'}
    </button>
  );
}