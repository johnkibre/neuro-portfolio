import { motion } from 'framer-motion'

const Education = () => {
  const education = [
    {
      degree: 'B.Sc. Electrical & Computer Engineering',
      institution: 'Addis Ababa University',
      duration: 'Expected 2026',
      details: 'Relevant Coursework: Digital Systems, Computer Architecture, Web Technologies, AI Fundamentals'
    },
    
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-mono font-bold text-center mb-12 text-neon-cyan"
        >
          Education
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0, rotateX: -10 }}
              whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 120 }}
              whileHover={{
                scale: 1.05,
                rotateY: index === 0 ? 5 : -5,
                rotateX: 5,
                z: 40,
                boxShadow: '0 25px 50px -12px rgba(0, 255, 255, 0.5)'
              }}
              className="bg-dark-gray border border-neon-cyan p-6 rounded-lg cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <h3 className="text-xl font-mono font-bold text-pcb-green mb-2">{edu.degree}</h3>
              <h4 className="text-lg font-mono text-neon-cyan mb-2">{edu.institution}</h4>
              <p className="text-sm font-mono text-pcb-green mb-4">{edu.duration}</p>
              <p className="text-sm font-mono text-neon-cyan">{edu.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
