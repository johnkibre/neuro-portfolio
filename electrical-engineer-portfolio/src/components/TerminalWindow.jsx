import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { X, Minus, Square } from 'lucide-react'

const TerminalWindow = ({ onClose }) => {
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState([
    { type: 'output', content: 'Yohannes Kibrekidusan Portfolio Terminal v2.0.1' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' }
  ])
  const [currentDir, setCurrentDir] = useState('~/portfolio')
  const inputRef = useRef(null)

  const commands = {
    help: () => [
      'Available commands:',
      '  help          - Show this help',
      '  ls            - List portfolio sections',
      '  cat [file]    - Display file contents',
      '  projects      - Show project details',
      '  skills        - Display technical skills',
      '  contact       - Show contact information',
      '  experience    - Show work experience',
      '  education     - Show education background',
      '  clear         - Clear terminal',
      '  whoami        - Display user info',
      '  neofetch      - System information',
      '  ping [host]   - Network connectivity test',
      '  date          - Current date and time',
      '  uptime        - System uptime'
    ],
    ls: () => [
      'drwxr-xr-x  projects/',
      'drwxr-xr-x  skills/',
      'drwxr-xr-x  experience/',
      'drwxr-xr-x  education/',
      'drwxr-xr-x  certifications/',
      '-rw-r--r--  resume.pdf',
      '-rw-r--r--  README.md'
    ],
    projects: () => [
      'Ethiopia Tourism Platform - MERN Stack web application',
      'OCR Accessibility App - AI-powered text-to-speech solution',
      'HR Gap Analysis Tool - React PWA with analytics',
      'Virtual Driving License Simulator - Unity 3D VR application'
    ],
    skills: () => [
      'Frontend: HTML5, CSS3, JavaScript, React',
      'Backend: MERN Stack, Python, REST APIs',
      'AI/ML: Python, OCR Processing, Data Analysis',
      'Tools: Git, GitHub, Software Testing'
    ],
    contact: () => [
      'Email: jhonkibre0912@gmail.com',
      'Phone: +251 923 803340',
      'LinkedIn: linkedin.com/in/yohannes-kibrekidusan',
      'GitHub: github.com/johnkibre',
      'Location: Addis Ababa, Ethiopia'
    ],
    experience: () => [
      'Software Tester & QA - 1xBet (2023-Present)',
      'IT Technical Specialist - Bet24 plc. (2020-2023)'
    ],
    education: () => [
      'B.Sc. Electrical & Computer Engineering - Addis Ababa University',
      'B.Sc. Information Systems - Hope University College'
    ],
    whoami: () => ['yohannes-kibrekidusan'],
    neofetch: () => [
      '                  .-.',
      '                 /   \\',
      '                |     |',
      '                 \\   /',
      '                  \'-\'',
      '',
      'Yohannes@Portfolio',
      '--------------------',
      'OS: Portfolio Terminal v2.0.1',
      'Host: Digital Workbench',
      'Kernel: React 19.2.0',
      'Uptime: 5+ years experience',
      'Packages: 15+ projects',
      'Shell: bash 5.1.16',
      'Resolution: 1920x1080',
      'Theme: Cyberpunk Circuit',
      'Icons: Lucide React'
    ],
    ping: (args) => {
      if (!args[0]) return ['ping: usage: ping [host]']
      return [
        `PING ${args[0]} (${args[0]}): 56 data bytes`,
        '64 bytes from ' + args[0] + ': icmp_seq=0 ttl=64 time=0.123 ms',
        '64 bytes from ' + args[0] + ': icmp_seq=1 ttl=64 time=0.098 ms',
        '64 bytes from ' + args[0] + ': icmp_seq=2 ttl=64 time=0.112 ms',
        '',
        '--- ' + args[0] + ' ping statistics ---',
        '3 packets transmitted, 3 packets received, 0.0% packet loss',
        'round-trip min/avg/max/stddev = 0.098/0.111/0.123/0.011 ms'
      ]
    },
    date: () => [new Date().toString()],
    uptime: () => [`up 5 years, 3 months, 15 days, 7 hours, 23 minutes`]
  }

  const executeCommand = (cmd) => {
    const [commandName, ...args] = cmd.trim().split(' ')
    const output = []

    if (commands[commandName]) {
      const result = commands[commandName](args)
      output.push(...(Array.isArray(result) ? result : [result]))
    } else if (commandName === 'clear') {
      setHistory([])
      return
    } else if (commandName === '') {
      // Empty command
    } else {
      output.push(`Command not found: ${commandName}. Type 'help' for available commands.`)
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', content: `${currentDir}$ ${cmd}` },
      ...output.map(content => ({ type: 'output', content }))
    ])
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand(command)
      setCommand('')
    } else if (e.key === 'ArrowUp') {
      // Command history (simplified)
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="fixed inset-4 md:inset-20 bg-slate-900 border-2 border-cyan-400 rounded-lg shadow-2xl z-50 overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-cyan-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-cyan-300 font-mono text-sm ml-2">Portfolio Terminal</span>
        </div>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-cyan-300 hover:text-white"
        >
          <X size={16} />
        </motion.button>
      </div>

      {/* Terminal Content */}
      <div className="p-4 h-full overflow-y-auto bg-black text-green-400 font-mono text-sm">
        <div className="mb-4">
          {history.map((line, index) => (
            <div key={index} className="mb-1">
              {line.type === 'input' && (
                <span className="text-cyan-300">{line.content}</span>
              )}
              {line.type === 'output' && (
                <span className="text-green-400">{line.content}</span>
              )}
            </div>
          ))}
        </div>

        {/* Command Input */}
        <div className="flex items-center">
          <span className="text-cyan-300 mr-2">{currentDir}$</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
            placeholder="Type a command..."
            autoComplete="off"
          />
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-green-400"
          >
            █
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export default TerminalWindow
