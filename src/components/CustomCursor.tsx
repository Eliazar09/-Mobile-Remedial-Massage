'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Track interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    )

    const handleElementEnter = () => setIsHovering(true)
    const handleElementLeave = () => setIsHovering(false)

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementEnter)
      el.addEventListener('mouseleave', handleElementLeave)
    })

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', checkMobile)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementEnter)
        el.removeEventListener('mouseleave', handleElementLeave)
      })
    }
  }, [cursorX, cursorY])

  // Re-attach listeners when DOM changes
  useEffect(() => {
    if (isMobile) return

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      )
      
      const handleElementEnter = () => setIsHovering(true)
      const handleElementLeave = () => setIsHovering(false)

      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementEnter)
        el.removeEventListener('mouseleave', handleElementLeave)
        el.addEventListener('mouseenter', handleElementEnter)
        el.addEventListener('mouseleave', handleElementLeave)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        @media (min-width: 768px) {
          * { cursor: none !important; }
          input, textarea, select { cursor: text !important; }
        }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 32 : 8,
            height: isHovering ? 32 : 8,
            opacity: isVisible ? 1 : 0
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-full bg-champagne"
          style={{
            boxShadow: isHovering ? '0 0 0 1px rgba(201, 169, 97, 0.5)' : 'none'
          }}
        />
      </motion.div>
    </>
  )
}

export default CustomCursor
