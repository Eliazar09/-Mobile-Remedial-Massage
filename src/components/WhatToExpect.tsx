'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'You Book',
    description: 'Choose your service, date, and time in under 60 seconds.'
  },
  {
    number: '02',
    title: 'We Travel',
    description: 'Your therapist arrives 10 minutes early with a professional-grade table, linens, and organic oils.'
  },
  {
    number: '03',
    title: 'You Relax',
    description: 'Lie down in your own space. No commute, no lobby, no rushing back.'
  },
  {
    number: '04',
    title: 'You Recover',
    description: 'Continue resting immediately after. Deep sleep guaranteed.'
  }
]

const WhatToExpect = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
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
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-body text-xs tracking-tracked uppercase text-champagne mb-4">
            — The Experience —
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory">
            What to expect
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Connecting line - Desktop */}
          <div className="hidden md:block absolute top-24 left-[12%] right-[12%] h-px bg-champagne/20" />
          
          {/* Connecting line - Mobile */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-px bg-champagne/20" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-8"
              >
                {/* Number */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-charcoal border border-champagne/30">
                  <span className="font-display text-3xl md:text-4xl text-champagne">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 md:text-center pt-2 md:pt-0">
                  <h3 className="font-heading text-xl md:text-2xl text-ivory mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-cream/60 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatToExpect
