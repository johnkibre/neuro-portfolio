import { motion } from 'framer-motion'

const Skills = () => {
  const skills = [
    { name: 'HTML5 / CSS3 / JavaScript', level: 95 },
    { name: 'MERN Stack', level: 90 },
    { name: 'Python', level: 85 },
    { name: 'MongoDB', level: 85 },
    { name: 'REST APIs', level: 90 },
    { name: 'Git / GitHub', level: 95 },
    { name: 'Responsive Design', level: 90 },
    { name: 'AI / ML', level: 80 },
    { name: 'OCR Processing', level: 85 },
    { name: 'Unity / VR', level: 75 },
    { name: 'Video Editing', level: 80 },
    { name: 'Software Testing', level: 90 },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-mono font-bold text-center mb-12 text-neon-cyan"
        >
          Skills Analysis
        </motion.h2>
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ x: -50, opacity: 0, rotateY: -15 }}
              whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                z: 50,
                boxShadow: '0 25px 50px -12px rgba(0, 255, 255, 0.5)'
              }}
              className="bg-dark-gray border border-neon-cyan p-4 rounded cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-pcb-green">{skill.name}</span>
                <span className="font-mono text-neon-cyan">{skill.level}%</span>
              </div>
              <div className="bg-dark-gray border border-pcb-green h-4 rounded">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="h-full bg-gradient-to-r from-pcb-green to-neon-cyan rounded"
                ></motion.div>
              </div>
              <div className="mt-2 text-xs font-mono text-pcb-green">
                Proficiency: {skill.level >= 80 ? 'Expert' : skill.level >= 70 ? 'Advanced' : 'Intermediate'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
