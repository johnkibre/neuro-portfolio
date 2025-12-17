import { motion } from 'framer-motion'

const FloatingChip = ({ delay = 0, className = '' }) => {
  return (
    <motion.div
      className={`absolute w-16 h-16 bg-dark-gray border-2 border-neon-cyan rounded-lg opacity-20 ${className}`}
      style={{
        background: 'linear-gradient(45deg, #0a192f, #1a2f3f)',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
      }}
      animate={{
        y: [-10, 10, -10],
        rotateZ: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay: delay,
        ease: 'easeInOut'
      }}
    >
      <div className="w-full h-full relative">
        {/* Chip pins */}
        <div className="absolute top-0 left-1/2 w-1 h-2 bg-pcb-green transform -translate-x-1/2 -translate-y-1"></div>
        <div className="absolute bottom-0 left-1/2 w-1 h-2 bg-pcb-green transform -translate-x-1/2 translate-y-1"></div>
        <div className="absolute left-0 top-1/2 w-2 h-1 bg-pcb-green transform -translate-x-1 -translate-y-1/2"></div>
        <div className="absolute right-0 top-1/2 w-2 h-1 bg-pcb-green transform translate-x-1 -translate-y-1/2"></div>
        {/* Chip label */}
        <div className="absolute inset-2 border border-pcb-green rounded text-xs font-mono text-pcb-green flex items-center justify-center text-center">
          IC
        </div>
      </div>
    </motion.div>
  )
}

export default FloatingChip
