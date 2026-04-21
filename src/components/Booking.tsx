'use client'

import { motion } from 'framer-motion'
import { useBooking } from '../App'
import MagneticButton from './MagneticButton'

const Booking = () => {
  const { openModal } = useBooking()

  return (
    <section id="booking" className="py-24 md:py-32 bg-charcoal">
      <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory mb-6">
            Ready to begin?
          </h2>
          <p className="font-heading text-xl md:text-2xl font-light text-cream/70 max-w-xl mx-auto mb-12">
            Book your session in under 60 seconds. We'll confirm via WhatsApp within the hour.
          </p>

          <MagneticButton
            onClick={openModal}
            className="inline-block font-body text-sm tracking-tracked uppercase px-16 py-6 bg-champagne text-onyx font-medium hover:bg-light-gold transition-colors"
            strength={0.3}
          >
            Book a Session
          </MagneticButton>

          <p className="font-body text-xs text-cream/40 mt-8">
            Same-day bookings available · 7 days a week · 8am – 9pm
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Booking
