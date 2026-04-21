'use client'

import { motion } from 'framer-motion'
import { useBooking } from '../App'
import SquishyCard from './ui/squishy-card-component'

const Services = () => {
  const services = [
    {
      number: '01',
      title: 'Remedial Massage',
      description: 'Targeted therapy for chronic pain, injury recovery, and muscular tension.',
      price60: '$149',
      price90: '$199',
      badge: 'Popular',
    },
    {
      number: '02',
      title: 'Deep Tissue',
      description: 'Slow, deliberate pressure to release deep muscular adhesions and restore movement.',
      price60: '$159',
      price90: '$209',
      badge: 'Best Value',
    },
    {
      number: '03',
      title: 'Sports Recovery',
      description: 'Performance-focused therapy for athletes and active bodies.',
      price60: '$169',
      price90: '$219',
      badge: 'Premium',
    },
    {
      number: '04',
      title: 'Pregnancy Massage',
      description: 'Safe, nurturing touch for expectant mothers after the first trimester.',
      price60: '$149',
      price90: '$179',
      badge: 'Gentle',
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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const { openModal } = useBooking()

  return (
    <section id="services" className="py-24 md:py-32 bg-onyx">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="font-body text-xs tracking-tracked uppercase text-champagne text-center mb-8">
            — Our Services —
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-ivory max-w-3xl">
            Therapeutic touch, crafted to your body's needs.
          </h2>
          <p className="font-heading text-lg text-cream/70 mt-4 max-w-2xl">
            Professional mobile massage therapy delivered to your home or office. Choose your service and duration.
          </p>
        </motion.div>

        {/* Services Grid with Squishy Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.number}
              variants={cardVariants}
              className="flex justify-center"
            >
              <SquishyCard
                title={service.title}
                price={service.price60}
                duration="60 min"
                description={service.description}
                badge={service.badge}
                onClick={openModal}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* 90min pricing note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="font-heading text-lg text-cream/60">
            90-minute sessions also available. 
            <span className="text-champagne"> Select your preferred duration when booking.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
