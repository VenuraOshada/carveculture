import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';

const DELIVERY_ZONES = ['Ja Ela', 'Kandana', 'Wattala', 'Katunayake', 'Negombo'];

const INSTAGRAM_DM = 'https://www.instagram.com/crave.culture.co';

/**
 * Hero — main hero section with heading, rotating delivery zone, and CTAs.
 */
export default function Hero() {
  const [zoneIndex, setZoneIndex] = useState(0);
  const shouldReduce = useReducedMotion();

  /* Rotate delivery zone every 3s */
  useEffect(() => {
    if (shouldReduce) return;

    const interval = setInterval(() => {
      setZoneIndex((prev) => (prev + 1) % DELIVERY_ZONES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [shouldReduce]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-32 md:pt-40 pb-16 md:pb-20"
    >
      <div className="section-container max-w-3xl">
        <Reveal>
          {/* Eyebrow */}
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-muted mb-6 md:mb-8">
            Home Bakery · Sri Lanka
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Heading */}
          <h1
            id="hero-heading"
            className="font-semibold leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: 'var(--text-hero)' }}
          >
            Fudgy brownies,{' '}
            <em className="text-accent">baked to order.</em>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          {/* Description */}
          <p
            className="text-muted max-w-lg mb-8 leading-relaxed"
            style={{ fontSize: 'var(--text-body)' }}
          >
            Small-batch brownies, cookies & eclairs crafted with premium ingredients.
            Every order is freshly baked — never sitting on a shelf.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          {/* Rotating delivery zone */}
          <div
            className="flex items-center gap-2 text-sm text-muted mb-10 h-6 overflow-hidden"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-accent/60 flex-shrink-0" />
            <span>Now delivering to</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={DELIVERY_ZONES[zoneIndex]}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: shouldReduce ? 0 : 0.3 }}
                className="font-semibold text-ink"
              >
                {DELIVERY_ZONES[zoneIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href={INSTAGRAM_DM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-accent text-cream text-sm font-medium tracking-wide rounded-sm hover:bg-accent-hover transition-colors duration-200 min-h-[44px]"
            >
              Pre-order
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-ink/20 text-ink text-sm font-medium tracking-wide rounded-sm hover:border-ink/40 transition-colors duration-200 min-h-[44px]"
            >
              View menu
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
