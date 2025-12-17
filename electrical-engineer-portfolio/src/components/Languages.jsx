import { motion } from 'framer-motion'

const Languages = () => {
  const languages = [
    { name: 'Amharic', proficiency: 'Native' },
    { name: 'English', proficiency: 'Fluent' },
    { name: 'Oromo', proficiency: 'Conversational' }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-mono font-bold text-center mb-12 text-neon-cyan"
        >
          Languages
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {languages.map((lang, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-dark-gray border border-neon-cyan p-6 rounded-lg text-center"
            >
              <h3 className="text-xl font-mono font-bold text-pcb-green mb-2">{lang.name}</h3>
              <p className="text-lg font-mono text-neon-cyan">{lang.proficiency}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Languages
