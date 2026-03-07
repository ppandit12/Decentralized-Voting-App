'use client';

import { useState, useEffect } from 'react';
import { getWeb3Provider } from '@/utils/web3';
import { Wallet, LogOut } from 'lucide-react';

export default function Navbar() {
  const [account, setAccount] = useState('');

  async function checkConnection() {
    const provider = await getWeb3Provider();
    if (provider) {
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0].address);
      }
    }
  }

  useEffect(() => {
    checkConnection();
  }, []);

  async function connectWallet() {
    console.log("Connect Wallet clicked");
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        console.log("MetaMask detected, requesting accounts...");
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Accounts received:", accounts);
        setAccount(accounts[0]);
      } catch (err) {
        console.error("User denied account access or error occurred:", err);
      }
    } else {
      console.warn("MetaMask not detected. Enabling mock connection for preview.");
      // Fallback for demo/preview purposes if MetaMask is missing
      setAccount('0x71C7656EC7ab88b098defB751B7401B5f6d8976F'); 
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center glow">
            <span className="text-xl font-bold">V</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Decentralized<span className="gradient-text">Vote</span></span>
        </div>

        <div>
          {account ? (
            <div className="flex items-center gap-4 bg-zinc-900/50 px-4 py-2 rounded-xl border border-zinc-800">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono text-zinc-400">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              <button 
                onClick={() => setAccount('')}
                className="text-zinc-500 hover:text-white transition-colors"
                title="Disconnect"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              className="btn-primary flex items-center gap-2"
            >
              <Wallet size={18} />
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
