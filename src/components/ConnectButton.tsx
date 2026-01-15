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
          style={{ padding: '0.8rem', cursor: 'pointer', background: '#ff4444', color: 'white', border: 'none', borderRadius: '12px' }}
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
        padding: '0.8rem 1rem', 
        fontSize: '1rem', 
        cursor: 'pointer', 
        background: 'linear-gradient(90deg, #9945FF 0%, #14F195 100%)', // Solana gradient
        color: 'white',
        width: '100%',
        border: 'none', 
        borderRadius: '12px',
        fontWeight: 'bold',
        transition: 'transform 0.2s, opacity 0.2s',
      }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {isConnecting ? 'Authenticating...' : 'Sign in with Passkey'}
    </button>
  );
}