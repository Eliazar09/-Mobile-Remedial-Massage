"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import type React from "react"

interface LayeredTextProps {
  lines?: Array<{ top: string; bottom: string }>
  fontSize?: string
  fontSizeMd?: string
  lineHeight?: number
  lineHeightMd?: number
  className?: string
}

export function LayeredText({
  lines = [
    { top: "\u00A0", bottom: "LUXE" },
    { top: "LUXE", bottom: "REMEDIAL" },
    { top: "REMEDIAL", bottom: "MASSAGE" },
    { top: "MASSAGE", bottom: "SYDNEY" },
    { top: "SYDNEY", bottom: "HOME" },
    { top: "HOME", bottom: "SERVICE" },
    { top: "SERVICE", bottom: "\u00A0" },
  ],
  fontSize = "64px",
  fontSizeMd = "40px",
  lineHeight = 55,
  lineHeightMd = 35,
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()

  const calculateTranslateX = (index: number) => {
    const baseOffset = 30
    const baseOffsetMd = 15
    const centerIndex = Math.floor(lines.length / 2)
    return {
      desktop: (index - centerIndex) * baseOffset,
      mobile: (index - centerIndex) * baseOffsetMd,
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const paragraphs = container.querySelectorAll("p")

    timelineRef.current = gsap.timeline({ paused: true })

    timelineRef.current.to(paragraphs, {
      y: window.innerWidth >= 768 ? -55 : -35,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
    })

    const handleMouseEnter = () => {
      timelineRef.current?.play()
    }

    const handleMouseLeave = () => {
      timelineRef.current?.reverse()
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      timelineRef.current?.kill()
    }
  }, [lines])

  return (
    <div
      ref={containerRef}
      className={`mx-auto py-16 md:py-24 font-display font-medium tracking-tight uppercase text-ivory antialiased cursor-pointer ${className}`}
      style={{ fontSize, "--md-font-size": fontSizeMd } as React.CSSProperties}
    >
      <ul className="list-none p-0 m-0 flex flex-col items-center">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index)
          return (
            <li
              key={index}
              className={`
                overflow-hidden relative
                ${
                  index % 2 === 0
                    ? "[transform:skew(60deg,-30deg)_scaleY(0.66667)]"
                    : "[transform:skew(0deg,-30deg)_scaleY(1.33333)]"
                }
              `}
              style={
                {
                  height: `${lineHeight}px`,
                  transform: `translateX(${translateX.desktop}px) skew(${index % 2 === 0 ? "60deg, -30deg" : "0deg, -30deg"}) scaleY(${index % 2 === 0 ? "0.66667" : "1.33333"})`,
                  "--md-height": `${lineHeightMd}px`,
                  "--md-translateX": `${translateX.mobile}px`,
                } as React.CSSProperties
              }
            >
              <p
                className="leading-[50px] md:leading-[30px] px-3 align-top whitespace-nowrap m-0 text-champagne/80"
                style={
                  {
                    height: `${lineHeight}px`,
                    lineHeight: `${lineHeight - 5}px`,
                  } as React.CSSProperties
                }
              >
                {line.top}
              </p>
              <p
                className="leading-[50px] md:leading-[30px] px-3 align-top whitespace-nowrap m-0 text-ivory"
                style={
                  {
                    height: `${lineHeight}px`,
                    lineHeight: `${lineHeight - 5}px`,
                  } as React.CSSProperties
                }
              >
                {line.bottom}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
