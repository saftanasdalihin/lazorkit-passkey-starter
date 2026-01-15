import { useTransfer } from '../hooks/useTransfer';

export function TransferButton() {
  const { transferSol, isLoading, signature, error } = useTransfer();

  const handleAction = () => {
    // Replace with a real Devnet address for demo
    transferSol('6p8vK6L6uD8m8vG6...', 0.05);
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