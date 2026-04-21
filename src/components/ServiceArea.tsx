'use client'

import { motion } from 'framer-motion'

const ServiceArea = () => {
  const areas = {
    'Eastern Suburbs': ['Bondi', 'Bronte', 'Coogee', 'Randwick', 'Paddington', 'Woollahra', 'Double Bay', 'Rose Bay', 'Vaucluse'],
    'Inner City': ['Surry Hills', 'Darlinghurst', 'Potts Point', 'Ultimo', 'Pyrmont', 'Chippendale'],
    'North Shore': ['North Sydney', 'Neutral Bay', 'Mosman', 'Cremorne', 'Lane Cove', 'Chatswood'],
  }

  return (
    <section id="service-area" className="py-24 md:py-32 bg-charcoal">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory mb-4">
            Where we travel.
          </h2>
          <p className="font-heading text-xl md:text-2xl font-light text-cream/70">
            No call-out fee within 15km of Sydney CBD.
          </p>
        </motion.div>

        {/* Areas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {Object.entries(areas).map(([region, suburbs]) => (
            <div key={region} className="text-center md:text-left">
              <h3 className="font-body text-xs tracking-tracked uppercase text-champagne mb-6">
                {region}
              </h3>
              <p className="font-heading text-lg font-light text-cream/80 leading-relaxed">
                {suburbs.join(' · ')}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center font-heading italic text-champagne mt-16 text-lg"
        >
          Outside these areas? Get in touch — we may still be able to accommodate.
        </motion.p>
      </div>
    </section>
  )
}

export default ServiceArea
