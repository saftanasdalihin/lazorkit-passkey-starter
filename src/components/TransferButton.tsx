import { useTransfer } from '../hooks/useTransfer';

export function TransferButton() {
  const { transferSol, isLoading, signature, error } = useTransfer();

  const handleAction = () => {
    // Replace with a real Devnet address for demo
    transferSol('6p8vK6L6uD8m8vG6...', 0.05);
  };

  return (
    <div>
      <button onClick={handleAction} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Send 0.05 SOL (Gasless)'}
      </button>
      {signature && <p style={{color: 'green'}}>Success! Sig: {signature.slice(0,8)}...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}