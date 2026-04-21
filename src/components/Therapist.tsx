'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const credentials = [
  'Diploma of Remedial Massage (HLT52015)',
  'Certified Pregnancy Massage Specialist',
  'Member, Massage & Myotherapy Australia',
  'Fully insured with Guild Insurance',
  'Health fund provider (HICAPS ready)'
]

const Therapist = () => {
  return (
    <section className="py-24 md:py-32 bg-onyx">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80"
                alt="Isabella Chen, lead remedial massage therapist"
                className="w-full h-full object-cover grayscale"
                loading="lazy"
                width="800"
                height="1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/40 to-transparent" />
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-champagne/20 -z-10" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-xs tracking-tracked uppercase text-champagne mb-4">
              — The Practitioner —
            </p>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory mb-2">
              Isabella Chen
            </h2>
            
            <p className="font-heading italic text-lg text-champagne mb-8">
              Lead Therapist · 10+ years
            </p>

            <div className="space-y-6 font-heading text-lg font-light text-cream/80 leading-relaxed mb-10">
              <p>
                Isabella brings over a decade of clinical experience to every session. Trained at the Australian Institute of Applied Sciences with specialized certification in remedial therapy, sports recovery, and pregnancy-safe techniques.
              </p>
              <p>
                Her approach combines deep technical knowledge with an intuitive understanding of the body's subtle signals — the hallmark of therapy that creates lasting change, not just temporary relief.
              </p>
            </div>

            {/* Credentials */}
            <div className="space-y-3">
              {credentials.map((credential, index) => (
                <motion.div
                  key={credential}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Check size={16} className="text-champagne flex-shrink-0" strokeWidth={2} />
                  <span className="font-body text-sm text-cream/70">{credential}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Therapist
