# 🚀 Lazor-Start: 10x Solana UX with Passkeys & Gasless Transactions

Welcome to the **Lazor-Start** starter template. This repository is a high-quality, practical example designed to help developers integrate **Lazorkit SDK** into their Solana applications. 

By utilizing **Passkey (WebAuthn)** and **Account Abstraction**, this template demonstrates how to build dApps where users don't need to install browser extensions or manage seed phrases.

## ✨ Key Features
- 🔑 **Passkey Authentication**: Sign in using biometrics (FaceID/Fingerprint).
- ⛽ **Gasless Transactions**: Send transactions without needing native SOL for gas.
- 📱 **Seamless UX**: No 3rd party wallet apps or extensions required.
- 🏗️ **Developer Friendly**: Clean React (Vite) structure with full TypeScript support.

## 🛠️ Tech Stack
- **Framework**: Vite + React + TypeScript
- **Web3 SDK**: @lazorkit/wallet, @solana/web3.js
- **Network**: Solana Devnet

## 🚀 Quick Start

### 1. Installation
Clone this repo and install dependencies:
```bash
git clone https://github.com/saftanasdalihin/lazorkit-passkey-starter.git
cd lazorkit-passkey-starter
npm install
```

### 2. Configuration
The SDK is pre-configured for Solana Devnet. You can find the settings in `src/config/constants.ts`:

```typescript
export const LAZORKIT_CONFIG = {
  RPC_URL: import.meta.env.VITE_RPC_URL || "https://api.devnet.solana.com",
  PORTAL_URL: import.meta.env.VITE_PORTAL_URL || "https://portal.lazor.sh",
  PAYMASTER: { 
    paymasterUrl: import.meta.env.VITE_PAYMASTER_URL || "https://kora.devnet.lazorkit.com" 
  }
};
```

### 3. Run Locally
```bash
npm run dev
```

### 💡 Troubleshooting (Polyfills)
If you encounter `global is not defined` or `Buffer` issues, this template pre-configures `vite-plugin-node-polyfills` in `vite.config.ts` and manual assignments in `main.tsx` to ensure compatibility with Solana's SDK in the browser.

## 📚 Step-by-Step Tutorials
Detailed guides are available in the `/docs` folder:

- [Tutorial 1: Creating a Passkey-based Wallet](./docs/01-passkey-setup.md)
- [Tutorial 2: Triggering Gasless Transactions](./docs/02-gasless-tx.md)

## 🤝 Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Built with ❤️ for the Solana Community.*