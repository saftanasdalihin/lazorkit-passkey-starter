export const LAZORKIT_CONFIG = {
  RPC_URL: import.meta.env.VITE_RPC_URL || "https://api.devnet.solana.com",
  PORTAL_URL: import.meta.env.VITE_PORTAL_URL || "https://portal.lazor.sh",
  PAYMASTER: { 
    paymasterUrl: import.meta.env.VITE_PAYMASTER_URL || "https://kora.devnet.lazorkit.com" 
  }
};