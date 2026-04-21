'use client'

import { motion } from 'framer-motion'

const healthFunds = ['Bupa', 'Medibank', 'HCF', 'NIB', 'AHM', 'Australian Unity']

const HealthFunds = () => {
  return (
    <section className="py-20 md:py-24 bg-charcoal">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ivory mb-4">
            Claim on the spot.
          </h2>
          
          <p className="font-heading text-lg md:text-xl font-light text-cream/70 max-w-2xl mx-auto mb-10">
            We're registered with all major Australian health funds. Bring your card — we'll process your HICAPS rebate instantly, reducing your out-of-pocket cost.
          </p>

          {/* Health Fund Logos as text */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-6">
            {healthFunds.map((fund, index) => (
              <motion.span
                key={fund}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="font-heading text-xl md:text-2xl text-cream/40 hover:text-champagne transition-colors cursor-default"
              >
                {fund}
              </motion.span>
            ))}
          </div>

          <p className="font-heading italic text-sm text-champagne">
            Rebate eligibility depends on your level of cover.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default HealthFunds
