'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import '../../app/globals.css'

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000) // 3 seconds
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  const text = "PRINCE OWUSU JUNIOR"

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div className="loader-container">
        <div className="circle">
          {Array.from(text).map((char, i) => (
            <span key={i} style={{ transform: `rotate(${i * (360 / text.length)}deg)` }}>
              {char}
            </span>
          ))}
        </div>
        <div className="center-glow"></div>
      </div>
    </motion.div>
  )
}
