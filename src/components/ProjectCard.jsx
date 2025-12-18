import { motion } from 'framer-motion'

const ProjectCard = ({ project, index, isAnalogMode }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0, rotateX: -10 }}
      whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
      whileHover={{
        scale: 1.08,
        rotateY: isAnalogMode ? 5 : 15,
        rotateX: isAnalogMode ? -5 : -10,
        z: 100,
        boxShadow: isAnalogMode
          ? '0 35px 60px -12px rgba(139, 69, 19, 0.6), 0 0 40px rgba(139, 69, 19, 0.4), 0 0 80px rgba(139, 69, 19, 0.2)'
          : '0 35px 60px -12px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 80px rgba(0, 255, 255, 0.2)'
      }}
      className={`
        ${isAnalogMode
          ? 'bg-amber-50 border-2 border-amber-800 shadow-lg'
          : 'bg-dark-gray border-2 border-neon-cyan'
        }
        p-6 rounded-lg transition-all duration-300 cursor-pointer
      `}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1200px'
      }}
    >
      {project.image && (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className={`
            w-full h-32 object-cover rounded mb-4
            ${isAnalogMode ? 'border-2 border-amber-600' : 'border border-neon-cyan'}
          `}
          loading="lazy"
        />
      )}
      <h3 className={`
        text-xl font-bold mb-3
        ${isAnalogMode ? 'font-serif text-amber-900' : 'font-mono text-pcb-green'}
      `}>
        {project.title}
      </h3>
      <p className={`
        text-sm mb-4 leading-relaxed
        ${isAnalogMode ? 'font-serif text-amber-800' : 'font-mono text-neon-cyan'}
      `}>
        {project.description}
      </p>
      <div className="mb-4">
        <p className={`
          text-xs mb-2
          ${isAnalogMode ? 'font-serif text-amber-900' : 'font-mono text-pcb-green'}
        `}>
          Technologies:
        </p>
        <p className={`
          text-xs
          ${isAnalogMode ? 'font-serif text-amber-700' : 'font-mono text-neon-cyan'}
        `}>
          {project.tech}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span
            key={tag}
            className={`
              px-2 py-1 rounded text-xs
              ${isAnalogMode
                ? 'bg-amber-700 text-amber-50 font-serif'
                : 'bg-pcb-green text-dark-gray font-mono'
              }
            `}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default ProjectCard
