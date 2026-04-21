'use client'

import { motion } from 'framer-motion'
import CurvedLoop from './ui/CurvedLoop'

const TrustBar = () => {
  return (
    <section className="bg-charcoal py-4 md:py-6 border-y border-champagne/10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <CurvedLoop
          marqueeText="10+ YEARS EXPERIENCE • FULLY INSURED & REGISTERED • HEALTH FUND REBATES • 7 DAYS, 8AM–9PM •"
          speed={1.2}
          curveAmount={200}
          direction="right"
          interactive={false}
          className="font-body text-champagne/60 text-sm md:text-base tracking-tracked"
        />
      </motion.div>
    </section>
  )
}

export default TrustBar
