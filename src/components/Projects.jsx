import { motion } from 'framer-motion'
import { useState } from 'react'
import ProjectCard from './ProjectCard'

// Import images properly for Vite
import ethiopiaTruismImg from '../assets/images/Ethiopia truism1.png'
import ethiopiaTourismImg from '../assets/images/Ethiopia_tourism.png'
import hrp2Img from '../assets/images/HRP 2.png'
import hrp1Img from '../assets/images/HRP_1.png'
import ocrImg from '../assets/images/ocr1.png'

const Projects = () => {
  const [isAnalogMode, setIsAnalogMode] = useState(false)

  const projects = [
    {
      title: 'Ethiopia Truism',
      description: 'A web application that promotes Ethiopian culture and tourism through interactive storytelling and virtual experiences.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      tech: 'React, Node.js, MongoDB, Express',
      image: ethiopiaTruismImg
    },
    {
      title: 'Ethiopia Tourism',
      description: 'An e-commerce platform for Ethiopian tourism services, featuring booking systems and cultural content.',
      tags: ['React', 'Firebase', 'Stripe', 'Tailwind CSS'],
      tech: 'React, Firebase, Stripe, Tailwind CSS',
      image: ethiopiaTourismImg
    },
    {
      title: 'HRP System',
      description: 'Human Resource Planning system with advanced analytics and employee management features.',
      tags: ['React', 'Python', 'Django', 'PostgreSQL'],
      tech: 'React, Python, Django, PostgreSQL',
      image: hrp2Img
    },
    {
      title: 'OCR Application',
      description: 'Optical Character Recognition tool with AI-powered text extraction and document processing.',
      tags: ['Python', 'TensorFlow', 'Flask', 'React'],
      tech: 'Python, TensorFlow, Flask, React',
      image: ocrImg
    },
    {
      title: 'Maintenance System',
      description: 'Comprehensive maintenance tracking system for IT infrastructure and equipment.',
      tags: ['Vue.js', 'Node.js', 'MySQL', 'Socket.io'],
      tech: 'Vue.js, Node.js, MySQL, Socket.io',
      image: hrp1Img
    }
  ]

  return (
    <section className={`py-20 px-4 transition-all duration-500 ${isAnalogMode ? 'bg-amber-50' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center mb-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`text-4xl font-bold text-center mr-6 ${
              isAnalogMode ? 'font-serif text-amber-900' : 'font-mono text-neon-cyan'
            }`}
          >
            {isAnalogMode ? 'Analog Circuit Designs' : 'Digital Project Chips'}
          </motion.h2>

          {/* Analog/Digital Toggle Switch */}
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-mono ${isAnalogMode ? 'text-amber-700' : 'text-neon-cyan'}`}>
              Digital
            </span>
            <button
              onClick={() => setIsAnalogMode(!isAnalogMode)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                ${isAnalogMode ? 'bg-amber-600 focus:ring-amber-500' : 'bg-cyan-600 focus:ring-cyan-500'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${isAnalogMode ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
            <span className={`text-sm font-serif ${isAnalogMode ? 'text-amber-900' : 'text-gray-500'}`}>
              Analog
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isAnalogMode={isAnalogMode}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
