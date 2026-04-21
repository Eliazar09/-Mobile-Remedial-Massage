'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-onyx pt-20 pb-8 border-t border-champagne/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16"
        >
          {/* Left Column - Brand */}
          <div>
            <a href="#" className="font-display text-3xl text-champagne hover:text-light-gold transition-colors">
              LUXE REMEDIAL
            </a>
            <p className="font-heading text-lg font-light text-cream/60 mt-4 max-w-xs">
              Mobile therapeutic massage, Sydney
            </p>
          </div>

          {/* Middle Column - Contact */}
          <div>
            <h3 className="font-body text-xs tracking-tracked uppercase text-champagne mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+61438074628"
                  className="inline-flex items-center gap-3 font-heading text-lg text-cream/80 hover:text-champagne transition-colors"
                >
                  <Phone size={16} strokeWidth={1.5} className="text-champagne" />
                  +61 438 074 628
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@luxeremedial.com"
                  className="inline-flex items-center gap-3 font-heading text-lg text-cream/80 hover:text-champagne transition-colors"
                >
                  <Mail size={16} strokeWidth={1.5} className="text-champagne" />
                  hello@luxeremedial.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/luxeremedial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-heading text-lg text-cream/80 hover:text-champagne transition-colors"
                >
                  <Instagram size={16} strokeWidth={1.5} className="text-champagne" />
                  @luxeremedial
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column - Hours */}
          <div>
            <h3 className="font-body text-xs tracking-tracked uppercase text-champagne mb-6">
              Hours
            </h3>
            <p className="font-heading text-lg font-light text-cream/80">
              Mon – Sun<br />
              8am – 9pm
            </p>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="hairline mb-8" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="font-body text-xs tracking-tracked uppercase text-cream/50 text-center md:text-left">
            © 2026 Luxe Remedial Massage. ABN 00 000 000 000. All rights reserved.
          </p>
          <p className="font-body text-xs tracking-tracked uppercase text-cream/50">
            Sydney, Australia
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
