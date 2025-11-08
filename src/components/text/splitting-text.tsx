'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

interface MotionVariants {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animate?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transition?: any
  stagger?: number
}

interface SplittingTextProps {
  text: string
  type?: 'chars' | 'words' | 'lines'
  className?: string
  inView?: boolean
  motionVariants?: MotionVariants
}

export function SplittingText({
  text,
  type = 'chars',
  className = '',
  inView = true,
  motionVariants,
}: SplittingTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const defaultVariants: MotionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    stagger: type === 'chars' ? 0.03 : type === 'words' ? 0.1 : 0.15,
  }

  const variants = { ...defaultVariants, ...motionVariants }

  const splitText = () => {
    if (type === 'chars') {
      return text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={variants.initial}
          animate={inView && isInView ? variants.animate : variants.initial}
          transition={{
            ...variants.transition,
            delay: i * (variants.stagger || 0.03),
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))
    }

    if (type === 'words') {
      return text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={variants.initial}
          animate={inView && isInView ? variants.animate : variants.initial}
          transition={{
            ...variants.transition,
            delay: i * (variants.stagger || 0.1),
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))
    }

    if (type === 'lines') {
      return text.split('\n').map((line, i) => (
        <motion.div
          key={i}
          initial={variants.initial}
          animate={inView && isInView ? variants.animate : variants.initial}
          transition={{
            ...variants.transition,
            delay: i * (variants.stagger || 0.15),
          }}
        >
          {line}
        </motion.div>
      ))
    }

    return text
  }

  return (
    <div ref={ref} className={className}>
      {splitText()}
    </div>
  )
}
