'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CritterCard } from '@/components/CritterCard'
import { WalletConnect } from '@/components/WalletConnect'
import { mockCritters } from '@/components/mockData'

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [critters, setCritters] = useState<any[]>([])
  const [filter, setFilter] = useState<'all' | 'alive' | 'evolved' | 'fainted'>('all')
  const [loading, setLoading] = useState(false)

  const loadDemoCritters = () => {
    setLoading(true)
    setTimeout(() => {
      setCritters(mockCritters)
      setWalletAddress('demo_wallet')
      setLoading(false)
    }, 500)
  }

  const loadRealCritters = async () => {
    if (!walletAddress) return
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/critters/collection/${walletAddress}`)
      const data = await res.json()
      if (data.success) {
        setCritters(data.critters)
      }
    } catch (error) {
      console.error('Failed to load critters:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (walletAddress && walletAddress !== 'demo_wallet') {
      loadRealCritters()
    }
  }, [walletAddress])

  const filteredCritters = critters.filter(c => {
    if (filter === 'all') return true
    return c.state === filter
  })

  return (
    <main className="min-h-screen bg-space">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-magic/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-growth/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block mb-4"
          >
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-magic via-magic-glow to-growth bg-clip-text text-transparent">
              CryptoCritters
            </h1>
          </motion.div>
          <p className="text-2xl text-gray-400 mb-2">Your Portfolio Has Paws 🐾</p>
          <p className="text-gray-500">Where your BSC tokens become beloved digital companions</p>
        </header>

        <WalletConnect 
          walletAddress={walletAddress}
          onConnect={setWalletAddress}
          onDemo={loadDemoCritters}
        />

        {walletAddress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Your Critters <span className="text-magic">({filteredCritters.length})</span>
              </h2>
              <div className="flex gap-2">
                {(['all', 'alive', 'evolved', 'fainted'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      filter === f
                        ? 'bg-magic text-white'
                        : 'bg-space-light text-gray-400 hover:bg-magic/20'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin w-12 h-12 border-4 border-magic border-t-transparent rounded-full" />
              </div>
            ) : filteredCritters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCritters.map((critter, index) => (
                  <CritterCard key={critter.id} critter={critter} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-xl">No critters found in this category</p>
              </div>
            )}
          </motion.div>
        )}

        {!walletAddress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6 rounded-2xl bg-space-light border border-magic/20">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-bold mb-2">Gamify Your Portfolio</h3>
                <p className="text-gray-400">Every token becomes a critter you can feed, play with, and watch evolve</p>
              </div>
              <div className="p-6 rounded-2xl bg-space-light border border-growth/20">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Personalities</h3>
                <p className="text-gray-400">Unique critters generated based on token characteristics</p>
              </div>
              <div className="p-6 rounded-2xl bg-space-light border border-warning/20">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-2">Learn DeFi Through Play</h3>
                <p className="text-gray-400">Understand liquidity, volatility, and risk through critter care</p>
              </div>
            </div>
          </motion.div>
        )}

        <footer className="mt-20 text-center text-gray-500 py-8">
          <p>Powered by BNB Chain</p>
          <p className="text-sm mt-2">Critters are for fun. Not financial advice.</p>
        </footer>
      </div>
    </main>
  )
}
