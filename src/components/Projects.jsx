import { motion } from 'framer-motion'

const Projects = () => {
  const projects = [
    {
      title: 'Ethiopia Tourism Platform',
      description: 'Full-stack web application showcasing Ethiopian cultural heritage with database integration, user authentication, and dynamic content management.',
      tags: ['MERN Stack', 'REST API', 'MongoDB', 'Responsive'],
      tech: 'MERN Stack, MongoDB, REST APIs',
      image: '/Ethiopia_tourism.png'
    },
    {
      title: 'OCR Accessibility App',
      description: 'AI-powered solution converting printed text to audio for visually impaired users. Features 100% voice-controlled interface with multilingual support.',
      tags: ['Python', 'Flask', 'Tesseract', 'AI/ML'],
      tech: 'Python, Flask, Tesseract OCR, AI/ML',
      image: '/ocr1.png'
    },
    {
      title: 'HR Gap Analysis Tool',
      description: 'Enterprise workforce planning tool with AI-powered recommendations, scenario planning, and offline-first capabilities.',
      tags: ['React', 'PWA', 'Analytics', 'AI Recommendations'],
      tech: 'React PWA, Analytics, WCAG 2.1 AA',
      image: '/HRP_1.png'
    },
    {
      title: 'Virtual Driving License Simulator',
      description: 'Unity 3D VR simulator with realistic physics and performance assessment for driving license training.',
      tags: ['Unity 3D', 'VR', 'Physics Simulation', 'Performance Assessment'],
      tech: 'Unity 3D, VR, Physics Simulation',
      image: '/profile.jpg'
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-mono font-bold text-center mb-12 text-neon-cyan"
        >
          Project Chips
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ y: 50, opacity: 0, rotateX: -10 }}
              whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
              whileHover={{
                scale: 1.08,
                rotateY: 15,
                rotateX: -10,
                z: 100,
                boxShadow: '0 35px 60px -12px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 80px rgba(0, 255, 255, 0.2)'
              }}
              className="bg-dark-gray border-2 border-neon-cyan p-6 rounded-lg hover:border-pcb-green transition-all duration-300 cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1200px'
              }}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-32 object-cover rounded mb-4 border border-neon-cyan"
                  loading="lazy"
                />
              )}
              <h3 className="text-xl font-mono font-bold text-pcb-green mb-3">{project.title}</h3>
              <p className="text-sm font-mono text-neon-cyan mb-4 leading-relaxed">{project.description}</p>
              <div className="mb-4">
                <p className="text-xs font-mono text-pcb-green mb-2">Technologies:</p>
                <p className="text-xs font-mono text-neon-cyan">{project.tech}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-pcb-green text-dark-gray px-2 py-1 rounded text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
