'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'What areas do you service?',
    answer: 'We travel across Sydney\'s Eastern Suburbs, Inner City, and North Shore. No call-out fee within 15km of the CBD.'
  },
  {
    question: 'What do I need to prepare?',
    answer: 'Nothing. We bring the table, linens, oils, and music. All we need is a small clear space (approximately 2m x 3m) and access to wash our hands.'
  },
  {
    question: 'How far in advance should I book?',
    answer: 'Same-day bookings are often possible for our regular hours (8am–9pm). For weekend evenings, we recommend booking 2–3 days ahead.'
  },
  {
    question: 'Can I claim on my health fund?',
    answer: 'Yes. All remedial sessions are HICAPS eligible with major Australian health funds. We process your claim on the spot.'
  },
  {
    question: 'Do you treat chronic conditions?',
    answer: 'Absolutely. Our remedial practice specializes in chronic pain, postural dysfunction, sports injuries, and stress-related tension. A treatment plan can be discussed during your first session.'
  },
  {
    question: 'Is pregnancy massage safe?',
    answer: 'Yes, after the first trimester. We use specialized side-lying positioning and modified techniques. Please notify us of your stage and any complications when booking.'
  },
  {
    question: 'What\'s your cancellation policy?',
    answer: 'We require 24 hours notice for cancellations. Late cancellations incur a 50% fee; no-shows are charged in full.'
  },
  {
    question: 'Do you offer gift vouchers?',
    answer: 'Yes. Digital vouchers are available in any denomination from $100. Contact us directly to arrange.'
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 md:py-32 bg-onyx">
      <div className="max-w-[900px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory">
            Questions, answered.
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border-b border-champagne/10"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="font-heading text-lg md:text-xl text-ivory group-hover:text-champagne transition-colors pr-8">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-champagne">
                  {openIndex === index ? (
                    <Minus size={20} strokeWidth={1.5} />
                  ) : (
                    <Plus size={20} strokeWidth={1.5} />
                  )}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="font-heading text-lg font-light text-cream/70 leading-relaxed pb-6">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
