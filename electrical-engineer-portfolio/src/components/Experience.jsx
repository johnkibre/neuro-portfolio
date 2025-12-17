import { motion } from 'framer-motion'

const Experience = () => {
  const experiences = [
    {
      title: 'Software Tester & Quality Assurance',
      company: '1xBet, Addis Ababa',
      duration: '2023 – Present',
      responsibilities: [
        'Execute comprehensive testing of web and mobile applications',
        'Document and prioritize software defects with 95% resolution rate',
        'Collaborate with development teams in Agile environment',
        'Develop automated test scenarios for regression testing'
      ]
    },
    {
      title: 'IT Technical Specialist',
      company: 'Bet24 plc., Addis Ababa',
      duration: '2020 – 2023',
      responsibilities: [
        'Managed IT infrastructure for 200+ workstation environment',
        'Reduced support tickets by 40% through preventive maintenance',
        'Provided technical training to 50+ staff members',
        'Implemented security protocols and backup systems'
      ]
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-mono font-bold text-center mb-12 text-neon-cyan"
        >
          Professional Experience
        </motion.h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0, rotateY: index % 2 === 0 ? -15 : 15 }}
              whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ delay: index * 0.3, type: "spring", stiffness: 100 }}
              whileHover={{
                scale: 1.03,
                rotateY: index % 2 === 0 ? -3 : 3,
                rotateX: 2,
                z: 30,
                boxShadow: '0 20px 40px -12px rgba(0, 255, 255, 0.4)'
              }}
              className="bg-dark-gray border border-neon-cyan p-6 rounded-lg cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-mono font-bold text-pcb-green">{exp.title}</h3>
                  <h4 className="text-lg font-mono text-neon-cyan">{exp.company}</h4>
                </div>
                <span className="text-sm font-mono text-pcb-green mt-2 md:mt-0">{exp.duration}</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm font-mono text-neon-cyan">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
