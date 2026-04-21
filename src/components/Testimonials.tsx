'use client'

import { motion } from 'framer-motion'

const Testimonials = () => {
  const testimonials = [
    {
      quote: "She arrived exactly on time, set up beautifully, and delivered the best remedial massage I've had in Sydney. The convenience is extraordinary.",
      author: 'James T.',
      location: 'Bondi',
    },
    {
      quote: "After three sessions my chronic neck pain is genuinely gone. Professional, intuitive, and the at-home setting made all the difference.",
      author: 'Sophia M.',
      location: 'Mosman',
    },
    {
      quote: "Booked for post-marathon recovery. Transformative. I'll never go back to a day spa again.",
      author: 'Daniel R.',
      location: 'Surry Hills',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section className="py-24 md:py-32 bg-charcoal">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory">
            In their words.
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative"
              whileHover={{ 
                rotateZ: 2,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }}
              style={{ transformOrigin: 'center center' }}
            >
              {/* Decorative Quote Mark */}
              <span className="font-display text-8xl md:text-9xl text-champagne/20 leading-none absolute -top-4 -left-2">
                "
              </span>
              
              <div className="relative z-10 pt-8 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                <blockquote>
                  <p className="font-heading text-xl md:text-2xl italic font-light text-cream/90 leading-relaxed mb-6">
                    {testimonial.quote}
                  </p>
                  <footer className="flex items-center gap-2">
                    <span className="font-body text-xs tracking-tracked uppercase text-champagne">
                      {testimonial.author}
                    </span>
                    <span className="w-1 h-1 bg-cream/40 rounded-full" />
                    <span className="font-body text-xs tracking-tracked uppercase text-cream/60">
                      {testimonial.location}
                    </span>
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
