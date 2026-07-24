import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reveal — reusable scroll-reveal wrapper.
 * Fades in + translates up on first scroll into view.
 * Respects prefers-reduced-motion by rendering instantly.
 *
 * @param {object}  props
 * @param {React.ReactNode} props.children
 * @param {number}  [props.delay=0]       — animation delay in seconds
 * @param {number}  [props.duration=0.6]  — animation duration in seconds
 * @param {number}  [props.y=24]          — translate-y offset in px
 * @param {string}  [props.className]     — additional class names
 * @param {'div'|'section'} [props.as='div'] — wrapper element
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  className = '',
  as = 'div',
}) {
  const shouldReduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduce ? 0 : duration,
        delay: shouldReduce ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
