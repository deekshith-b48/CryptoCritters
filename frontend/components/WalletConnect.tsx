'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
    }
  }
}

interface WalletConnectProps {
  walletAddress: string | null
  onConnect: (address: string) => void
  onDemo: () => void
}

export function WalletConnect({ walletAddress, onConnect, onDemo }: WalletConnectProps) {
  const [connecting, setConnecting] = useState(false)

  const connectWallet = async () => {
    setConnecting(true)
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        })
        if (accounts[0]) {
          onConnect(accounts[0])
          toast.success('Wallet connected!')
        }
      } else {
        toast.error('Please install MetaMask')
      }
    } catch (error) {
      toast.error('Failed to connect wallet')
    }
    setConnecting(false)
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {walletAddress ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-3 px-6 py-3 bg-space-light rounded-full border border-magic/30"
        >
          <div className="w-3 h-3 rounded-full bg-growth animate-pulse" />
          <span className="font-mono text-magic">{formatAddress(walletAddress)}</span>
          {walletAddress === 'demo_wallet' && (
            <span className="text-xs text-gray-500">(Demo)</span>
          )}
        </motion.div>
      ) : (
        <>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={connectWallet}
            disabled={connecting}
            className="px-8 py-4 bg-gradient-to-r from-magic to-magic-glow rounded-full font-bold text-lg shadow-lg hover:shadow-magic/50 transition-all disabled:opacity-50"
          >
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDemo}
            className="px-6 py-4 bg-space-light border border-growth/30 rounded-full font-bold text-growth hover:bg-growth/10 transition-all"
          >
            🎮 Demo Mode
          </motion.button>
        </>
      )}
    </div>
  )
}
