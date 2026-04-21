'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useBooking } from '../App'
import MagneticButton from './MagneticButton'
import { GradientBars } from './ui/gradient-bars-background'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const handleScrollToServices = () => {
    const element = document.querySelector('#services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const { openModal } = useBooking()

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-onyx">
      {/* Gradient Bars Background - Champagne Gold */}
      <GradientBars
        numBars={15}
        gradientFrom="rgb(201, 169, 97)"
        gradientTo="transparent"
        animationDuration={3}
      />
      
      {/* Dark gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-onyx/80 via-onyx/60 to-onyx" />

      {/* Noise Texture */}
      <div className="noise-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-32 md:py-40">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="font-body text-xs md:text-sm tracking-tracked uppercase text-champagne mb-6"
          >
            Mobile Remedial Massage — Sydney
          </motion.p>

          {/* Headline - Word by word reveal */}
          <HeadlineReveal />

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="font-heading text-xl md:text-2xl font-light text-cream/90 max-w-2xl mb-12 leading-relaxed"
          >
            Remedial, deep tissue, and therapeutic massage — delivered to your home or office across Sydney's Eastern Suburbs and North Shore.
          </motion.p>

          {/* CTAs with Magnetic Button */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <MagneticButton
              onClick={openModal}
              className="font-body text-xs tracking-tracked uppercase px-8 py-4 bg-champagne text-onyx font-medium hover:bg-light-gold transition-colors"
              strength={0.3}
            >
              Book a Session
            </MagneticButton>
            <button
              onClick={handleScrollToServices}
              className="font-body text-xs tracking-tracked uppercase px-8 py-4 border border-champagne/50 text-champagne hover:bg-champagne hover:text-onyx transition-all duration-300"
            >
              View Services
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-body text-[10px] tracking-tracked uppercase text-ivory/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-champagne" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Word-by-word headline reveal component
const HeadlineReveal = () => {
  const words = ['The', 'spa', 'comes', 'to', 'you.']
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  }
  
  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }
  
  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[120px] leading-[0.9] tracking-tight text-ivory mb-8"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            variants={wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  )
}

export default Hero
