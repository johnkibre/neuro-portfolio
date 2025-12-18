import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const SystemMonitor = () => {
  const [cpuUsage, setCpuUsage] = useState(45)
  const [memoryUsage, setMemoryUsage] = useState(62)
  const [networkActivity, setNetworkActivity] = useState(0)
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate dynamic system metrics
      setCpuUsage(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 10)))
      setMemoryUsage(prev => Math.max(40, Math.min(90, prev + (Math.random() - 0.5) * 5)))
      setNetworkActivity(prev => Math.random() * 100)
      setUptime(prev => prev + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}:${minutes.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed top-6 right-6 bg-slate-900 border border-cyan-400 rounded-lg p-4 font-mono text-xs text-cyan-300 z-30 min-w-48"
    >
      <div className="text-cyan-400 font-bold mb-3 border-b border-cyan-400 pb-1">
        SYSTEM MONITOR
      </div>

      {/* CPU Usage */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span>CPU</span>
          <span>{cpuUsage.toFixed(1)}%</span>
        </div>
        <div className="bg-slate-800 h-2 rounded">
          <motion.div
            className="bg-green-400 h-full rounded"
            animate={{ width: `${cpuUsage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Memory Usage */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span>MEM</span>
          <span>{memoryUsage.toFixed(1)}%</span>
        </div>
        <div className="bg-slate-800 h-2 rounded">
          <motion.div
            className="bg-blue-400 h-full rounded"
            animate={{ width: `${memoryUsage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Network Activity */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span>NET</span>
          <span>{networkActivity.toFixed(1)}%</span>
        </div>
        <div className="bg-slate-800 h-2 rounded">
          <motion.div
            className="bg-yellow-400 h-full rounded"
            animate={{ width: `${networkActivity}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Uptime */}
      <div className="flex justify-between">
        <span>UPTIME</span>
        <span>{formatUptime(uptime)}</span>
      </div>

      {/* Status Indicator */}
      <div className="mt-3 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 bg-green-400 rounded-full"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-green-400">ONLINE</span>
      </div>
    </motion.div>
  )
}

export default SystemMonitor
