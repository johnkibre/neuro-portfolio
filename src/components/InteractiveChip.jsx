import { motion } from 'framer-motion'
import { useState } from 'react'

const InteractiveChip = ({ size = 'md', onClick }) => {
  const [hoveredPin, setHoveredPin] = useState(null)
  const [activePins, setActivePins] = useState([2, 5, 8]) // Simulate active pins

  const pinLabels = [
    'VCC', 'GND', 'CLK', 'DATA', 'RST', 'INT', 'MOSI', 'MISO', 'SCK', 'CS'
  ]

  const chipSize = size === 'lg' ? 'w-32 h-20' : size === 'sm' ? 'w-20 h-12' : 'w-24 h-16'

  return (
    <motion.div
      className={`${chipSize} relative cursor-pointer perspective-1000`}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ rotateY: 5, rotateX: -5 }}
      onClick={onClick}
    >
      {/* Chip Body */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-cyan-400 rounded-lg shadow-lg"
        style={{
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)'
        }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)',
            '0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(0, 255, 255, 0.2)',
            '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Chip Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-mono text-cyan-300 font-bold">ATmega328P</span>
        </div>

        {/* Pins */}
        {Array.from({ length: 20 }, (_, i) => {
          const isLeft = i < 10
          const pinIndex = i % 10
          const x = isLeft ? -2 : '100%'
          const y = `${(pinIndex * 10) + 5}%`

          return (
            <motion.div
              key={i}
              className={`absolute w-1 h-3 ${
                activePins.includes(i) ? 'bg-green-400' : 'bg-gray-500'
              } rounded-sm`}
              style={{
                left: x,
                top: y,
                transform: isLeft ? 'translateX(-100%)' : 'translateX(0)',
                boxShadow: activePins.includes(i)
                  ? '0 0 5px rgba(0, 255, 0, 0.8)'
                  : 'none'
              }}
              whileHover={{
                scale: 1.5,
                backgroundColor: '#60a5fa'
              }}
              onHoverStart={() => setHoveredPin(i)}
              onHoverEnd={() => setHoveredPin(null)}
            />
          )
        })}

        {/* Pin Labels */}
        {hoveredPin !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-cyan-300 px-2 py-1 rounded text-xs font-mono whitespace-nowrap"
          >
            {pinLabels[hoveredPin % pinLabels.length]}
          </motion.div>
        )}

        {/* Internal Circuit Pattern */}
        <div className="absolute inset-2 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 L10 10 L10 0 M10 20 L10 10 L20 10" stroke="rgba(0,255,255,0.3)" strokeWidth="0.5" fill="none"/>
                <circle cx="5" cy="5" r="1" fill="rgba(0,255,255,0.2)"/>
                <circle cx="15" cy="15" r="1" fill="rgba(0,255,255,0.2)"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#circuit)"/>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default InteractiveChip
