'use client'

import { motion } from 'framer-motion'
import { LayeredText } from './ui/layered-text'

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-16 md:py-24 bg-onyx overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column - Layered Text Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <LayeredText
              lines={[
                { top: "\u00A0", bottom: "LUXE" },
                { top: "LUXE", bottom: "MOBILE" },
                { top: "MOBILE", bottom: "MASSAGE" },
                { top: "MASSAGE", bottom: "SYDNEY" },
                { top: "SYDNEY", bottom: "HOME" },
                { top: "HOME", bottom: "SERVICE" },
                { top: "SERVICE", bottom: "\u00A0" },
              ]}
              fontSize="56px"
              fontSizeMd="36px"
              lineHeight={50}
              lineHeightMd={32}
            />
          </motion.div>

          {/* Right Column - Body Text */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="space-y-8 font-heading text-lg md:text-xl font-light text-cream/80 leading-relaxed">
              <p>
                There is a peculiar irony in seeking relaxation through a process that often begins with stress: the traffic, the parking, the hurried arrival at a clinic only to wait in a sterile room. By the time you lie down on the treatment table, your nervous system has already spent precious energy in transit.
              </p>

              <div className="w-full h-px bg-champagne/30" />

              <p>
                Mobile remedial massage inverts this equation entirely. The therapeutic space comes to you — transformed from the familiar comfort of your own environment into a sanctuary of healing. Your own ambient sounds, your preferred temperature, your sense of safety and belonging. These elements matter more than we often acknowledge.
              </p>

              <p>
                Each session arrives complete: a professional-grade treatment table with premium linens, organic jojoba and essential oil blends selected for their therapeutic properties, and a carefully curated soundscape that encourages the parasympathetic response. The practitioner brings not only technical expertise in deep tissue and remedial techniques but an understanding that healing unfolds most effectively in spaces where we feel truly at ease.
              </p>

              <p>
                This is the philosophy that guides every treatment: that the journey toward physical relief should not itself become another source of tension. For residents of Sydney's Eastern Suburbs and North Shore, from Bondi to Mosman, the finest therapeutic massage is now simply a booking away — no commute required, no compromises made.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Philosophy
