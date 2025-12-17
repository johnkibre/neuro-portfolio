import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Send } from 'lucide-react'

const Contact = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-mono font-bold text-center mb-12 text-neon-cyan"
        >
          Contact Terminal
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
          >
            <h3 className="text-2xl font-mono font-bold text-pcb-green mb-6">Send Signal</h3>
            <form className="space-y-6">
              <div>
                <label className="block font-mono text-neon-cyan mb-2">{'>>'} Name</label>
                <input
                  type="text"
                  className="w-full bg-dark-gray border-2 border-neon-cyan rounded p-3 font-mono text-pcb-green placeholder-pcb-green/50 focus:border-pcb-green focus:outline-none"
                  placeholder="Enter your name..."
                />
              </div>
              <div>
                <label className="block font-mono text-neon-cyan mb-2">{'>>'} Email</label>
                <input
                  type="email"
                  className="w-full bg-dark-gray border-2 border-neon-cyan rounded p-3 font-mono text-pcb-green placeholder-pcb-green/50 focus:border-pcb-green focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block font-mono text-neon-cyan mb-2">{'>>'} Message</label>
                <textarea
                  rows="5"
                  className="w-full bg-dark-gray border-2 border-neon-cyan rounded p-3 font-mono text-pcb-green placeholder-pcb-green/50 focus:border-pcb-green focus:outline-none resize-none"
                  placeholder="Type your message..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-pcb-green text-dark-gray py-3 px-6 rounded font-mono font-bold flex items-center justify-center gap-2 hover:bg-neon-cyan transition-colors duration-300"
              >
                <Send size={18} />
                Transmit Signal
              </motion.button>
            </form>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
          >
            <h3 className="text-2xl font-mono font-bold text-pcb-green mb-6">Connect Circuits</h3>
            <div className="space-y-4">
              <motion.a
                href="https://github.com/johnkibre"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 bg-dark-gray border-2 border-neon-cyan p-4 rounded hover:border-pcb-green transition-colors duration-300"
              >
                <Github size={24} className="text-pcb-green" />
                <span className="font-mono text-neon-cyan">github.com/johnkibre</span>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yohannes-kibrekidusan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 bg-dark-gray border-2 border-neon-cyan p-4 rounded hover:border-pcb-green transition-colors duration-300"
              >
                <Linkedin size={24} className="text-pcb-green" />
                <span className="font-mono text-neon-cyan">linkedin.com/in/yohannes-kibrekidusan</span>
              </motion.a>
              <motion.a
                href="mailto:jhonkibre0912@gmail.com"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 bg-dark-gray border-2 border-neon-cyan p-4 rounded hover:border-pcb-green transition-colors duration-300"
              >
                <Mail size={24} className="text-pcb-green" />
                <span className="font-mono text-neon-cyan">jhonkibre0912@gmail.com</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
