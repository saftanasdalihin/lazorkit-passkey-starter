import React from 'react';

/**
 * Layout Component
 * Provides a consistent structure, including a header with a Devnet badge
 * and a footer with links to documentation.
 */
export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f4f7f6', 
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#1a202c',
      padding: '2rem 1rem',
      boxSizing: 'border-box'
    }}>
      {/* 🟢 Header Section */}
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <img 
            src="/lazorglide.png" 
            alt="LazorGlide Logo" 
            style={{ width: '80px', height: '80px', marginBottom: '1rem' }} 
        />
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ 
            background: '#14F19522', 
            color: '#14F195', 
            padding: '6px 16px', 
            borderRadius: '20px', 
            fontSize: '0.8rem', 
            fontWeight: 'bold', 
            border: '1px solid #14F195',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#14F195', borderRadius: '50%' }}></span>
            Solana Devnet
          </span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 0.5rem 0', letterSpacing: '-0.025em' }}>
          LazorGlide
        </h1>
        <p style={{ color: '#718096', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
          10x Solana UX with Passkey Wallets & Gasless Transactions.
        </p>
      </header>

      {/* 🔵 Main Content Area */}
      <main style={{ 
        maxWidth: '560px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem' 
      }}>
        {children}
      </main>

      {/* ⚪ Footer Section */}
      <footer style={{ 
        textAlign: 'center', 
        marginTop: '4rem', 
        paddingTop: '2rem', 
        borderTop: '1px solid #e2e8f0',
        color: '#a0aec0',
        fontSize: '0.9rem'
      }}>
        <p>Built for the Lazorkit Bounty • 2026</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
            <a 
                href="https://github.com/saftanasdalihin/lazorkit-passkey-starter" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: '#4a5568', textDecoration: 'none', fontWeight: '500' }}
            >
                GitHub Repo
            </a>
            <a 
                href="https://github.com/saftanasdalihin/lazorkit-passkey-starter/tree/main/docs" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: '#4a5568', textDecoration: 'none', fontWeight: '500' }}
            >
                Tutorials & Docs
            </a>
        </div>
      </footer>
    </div>
  );
};