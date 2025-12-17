import { motion } from 'framer-motion'

const Certifications = () => {
  const certifications = [
    {
      title: 'CS50\'s Introduction to AI with Python',
      issuer: 'Harvard University',
      year: '2025',
      image: '/CS50AI with python harvard universty.png'
    },
    {
      title: 'AI and Career Empowerment',
      issuer: 'University of Maryland',
      year: '2025',
      image: '/ai and empoerment universty of marylan.jpg'
    },
    {
      title: 'Google Cloud: Prompt Design in Vertex AI',
      issuer: 'Google Cloud',
      year: '2024',
      image: '/google ai cloud.jpg'
    },
    {
      title: 'Maintenance and Networking',
      issuer: 'SATCOM Institute of Technology',
      year: '2017',
      image: '/maintenance and networking satcom.pdf'
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
          Certifications
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0, rotateY: 20 }}
              whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 120 }}
              whileHover={{
                scale: 1.1,
                rotateY: -10,
                rotateX: 10,
                z: 80,
                boxShadow: '0 30px 60px -12px rgba(0, 255, 255, 0.7)'
              }}
              className="bg-dark-gray border border-neon-cyan p-4 rounded-lg text-center cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <div className="w-20 h-16 mx-auto mb-4 rounded-lg overflow-hidden border border-neon-cyan">
                {cert.image.includes('.pdf') ? (
                  <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-100 transition-colors"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </a>
                  </div>
                ) : (
                  <img
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <h3 className="text-sm font-mono font-bold text-pcb-green mb-2">{cert.title}</h3>
              <h4 className="text-xs font-mono text-neon-cyan mb-1">{cert.issuer}</h4>
              <p className="text-xs font-mono text-pcb-green">{cert.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
