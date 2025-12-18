import { motion } from 'framer-motion'
import FloatingChip from './FloatingChip'
import profileImg from '../assets/images/profile.jpg'

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating Chips Background */}
      <FloatingChip delay={0} className="top-20 left-10" />
      <FloatingChip delay={1} className="top-32 right-16" />
      <FloatingChip delay={2} className="bottom-32 left-20" />
      <FloatingChip delay={3} className="bottom-20 right-10" />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-mono font-bold mb-4 text-neon-cyan"
          style={{
            textShadow: '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.1)'
          }}
          animate={{
            textShadow: [
              '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.1)',
              '0 0 15px rgba(0, 255, 255, 0.7), 0 0 30px rgba(0, 255, 255, 0.5), 0 0 45px rgba(0, 255, 255, 0.3)',
              '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.1)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            rotateX: 5
          }}
        >
          YOHANNES<br />KIBREKIDUSAN
        </motion.h1>
        <p className="text-xl md:text-2xl text-pcb-green font-mono mb-6">
          Full-Stack Developer & AI Engineer
        </p>
        <p className="text-lg md:text-xl text-neon-cyan font-mono max-w-4xl mx-auto leading-relaxed mb-8">
          Passionate Full-Stack Developer and AI Engineer with 5+ years of experience in software testing and IT
          technical support. Final-year Electrical & Computer Engineering student with expertise in MERN stack
          development, AI/ML solutions, and accessibility-focused applications. Proven track record of building
          innovative web solutions and managing IT infrastructure for enterprise environments.
        </p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8"
        >
          <img
            src={profileImg}
            alt="Yohannes Kibrekidusan - Professional headshot"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-neon-cyan shadow-lg"
            style={{
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(0, 255, 255, 0.2)'
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
