'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Critter } from './mockData'

interface CritterCardProps {
  critter: Critter
  index: number
}

const actionTooltips: Record<string, string> = {
  feed: 'Feeding = buying more tokens. Remember: DCA is your friend!',
  play: 'Playing = staking/liquidity provision. Earn while you sleep!',
  clean: 'Cleaning = removing ruggable tokens. Always check LP locks!',
  train: 'Training = learning about the project. Knowledge = power!'
}

export function CritterCard({ critter, index }: CritterCardProps) {
  const [action, setAction] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleAction = async (actionType: string) => {
    setAction(actionType)
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-space-light border border-magic/30 px-4 py-3 rounded-xl`}>
        <p className="font-bold text-magic">{actionType.toUpperCase()}!</p>
        <p className="text-sm text-gray-400">{actionTooltips[actionType]}</p>
      </div>
    ))
    
    setTimeout(() => {
      setAction(null)
      toast.success(`${critter.name} is happier now!`)
    }, 1000)
  }

  const getStateColor = () => {
    if (critter.state === 'fainted') return 'border-rug/50'
    if (critter.state === 'evolved') return 'border-growth/50'
    if (critter.stats.health < 50) return 'border-warning/50'
    return 'border-magic/30'
  }

  const getAnimation = () => {
    if (critter.state === 'fainted') return { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } }
    if (action === 'play') return { y: [0, -20, 0], transition: { duration: 0.5 } }
    if (critter.stats.happiness > 70) return { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } }
    return {}
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`critter-card rounded-2xl border-2 ${getStateColor()} overflow-hidden`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">{critter.name}</h3>
            <p className="text-sm text-gray-400">{critter.species}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            critter.state === 'fainted' ? 'bg-rug/20 text-rug' :
            critter.state === 'evolved' ? 'bg-growth/20 text-growth' :
            'bg-magic/20 text-magic'
          }`}>
            {critter.state === 'evolved' ? '⭐ EVOLVED' : critter.state.toUpperCase()}
          </span>
        </div>

        <motion.div
          animate={getAnimation()}
          className="relative w-32 h-32 mx-auto mb-4"
        >
          <Image
            src={critter.avatarUrl}
            alt={critter.name}
            fill
            className={`object-contain ${critter.state === 'fainted' ? 'grayscale opacity-50' : ''}`}
          />
          {critter.state === 'evolved' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-growth/50"
            />
          )}
        </motion.div>

        <p className="text-sm text-gray-400 text-center mb-4 italic">"{critter.bio}"</p>

        <div className="space-y-2 mb-4">
          <StatBar label="Health" value={critter.stats.health} color="bg-rug" />
          <StatBar label="Happiness" value={critter.stats.happiness} color="bg-warning" />
          <StatBar label="Energy" value={critter.stats.energy} color="bg-growth" />
        </div>

        {critter.state !== 'fainted' && (
          <div className="grid grid-cols-4 gap-2">
            {(['feed', 'play', 'clean', 'train'] as const).map((act) => (
              <motion.button
                key={act}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAction(act)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="p-2 rounded-lg bg-space-light hover:bg-magic/20 text-2xl transition-colors relative"
              >
                {act === 'feed' && '🍽️'}
                {act === 'play' && '🎮'}
                {act === 'clean' && '🧹'}
                {act === 'train' && '📚'}
              </motion.button>
            ))}
          </div>
        )}

        {critter.state === 'fainted' && (
          <div className="text-center p-4 bg-rug/10 rounded-xl">
            <p className="text-rug text-sm">💀 Fainted</p>
            <p className="text-xs text-gray-500 mt-1">Always check LP locks before investing!</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {action && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50"
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              className="text-6xl"
            >
              {action === 'feed' && '🍽️'}
              {action === 'play' && '🎮'}
              {action === 'clean' && '🧹'}
              {action === 'train' && '📚'}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-20">{label}</span>
      <div className="flex-1 stat-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`stat-fill ${color}`}
        />
      </div>
      <span className="text-xs font-mono w-8">{value}</span>
    </div>
  )
}
