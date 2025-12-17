import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Power, Cpu, Zap, Github, Linkedin, Mail, Terminal } from 'lucide-react'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Languages from './components/Languages'
import Contact from './components/Contact'
import InteractiveChip from './components/InteractiveChip'
import TerminalWindow from './components/TerminalWindow'
import SystemMonitor from './components/SystemMonitor'

function App() {
  const [poweredOn, setPoweredOn] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (poweredOn) {
        if (e.ctrlKey && e.key === 'k') {
          e.preventDefault()
          setTerminalOpen(true)
        }
        if (e.key === 'Escape') {
          setTerminalOpen(false)
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [poweredOn])

  return (
    <div className="min-h-screen text-neon-cyan relative">
      {/* Background Elements */}
      <div className="background-grid"></div>
      <div className="circuit-lines">
        <div className="circuit-line"></div>
        <div className="circuit-line"></div>
        <div className="circuit-line"></div>
        <div className="circuit-line"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {!poweredOn ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center"
          >
            <motion.button
              onClick={() => setPoweredOn(true)}
              className="bg-pcb-green text-dark-gray px-8 py-4 rounded-lg font-mono text-xl flex items-center gap-2 hover:bg-neon-cyan transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Power size={24} />
              Power On System
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Terminal Toggle Button */}
            <motion.button
              onClick={() => setTerminalOpen(true)}
              className="fixed bottom-6 right-6 bg-cyan-600 text-black p-3 rounded-full shadow-lg hover:bg-cyan-400 transition-colors z-40"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Open Terminal (Ctrl+K)"
            >
              <Terminal size={20} />
            </motion.button>

            <Hero />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Certifications />
            <Languages />
            <Contact />
          </motion.div>
        )}

        {/* System Monitor */}
        {poweredOn && <SystemMonitor />}

        {/* Terminal Modal */}
        <AnimatePresence>
          {terminalOpen && (
            <TerminalWindow onClose={() => setTerminalOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
