'use client'

import { motion } from 'framer-motion'
import { Coffee } from 'lucide-react'

export function BuyCoffeeButton() {
  const coffeeUrl =
    process.env.NEXT_PUBLIC_COFFEE_URL ||
    'https://buymeacoffee.com/powusu050z'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5, type: 'spring' }}
      className="fixed bottom-[130px] right-6 z-50"
    >
      <a
        href={coffeeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-full shadow-lg transition-colors duration-200 focus:outline-none overflow-hidden"
        aria-label="Buy me a coffee"
      >
        {/* Cup icon always visible */}
        <Coffee size={20} />

        {/* Text expands smoothly on hover (desktop only) */}
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 0, opacity: 0 }}
          whileHover={{ width: 140, opacity: 1 }} // <- give it room to breathe
          transition={{ duration: 0.35 }}
          className="hidden sm:block whitespace-nowrap font-medium overflow-hidden group-hover:ml-1"
        >
          Buy me a coffee
        </motion.span>
      </a>
    </motion.div>
  )
}
