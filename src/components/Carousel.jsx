import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';

/* Import carousel images */
import imgBrownies from '../assets/images/carousel-brownies.png';
import imgCookies from '../assets/images/carousel-cookies.png';
import imgCake from '../assets/images/carousel-cake.png';
import imgPackaging from '../assets/images/carousel-packaging.png';

const SLIDES = [
  { src: imgBrownies, alt: 'Assorted fudgy brownies with walnut and caramel toppings', caption: 'Our signature brownie collection' },
  { src: imgCookies, alt: 'Freshly baked chocolate chip cookies on a cooling rack', caption: 'Classic chocolate chip cookies' },
  { src: imgCake, alt: 'Artisan chocolate cake with ganache and edible flowers', caption: 'Celebration cakes made to order' },
  { src: imgPackaging, alt: 'Kraft paper gift boxes filled with assorted brownies and cookies', caption: 'Beautifully packaged for gifting' },
];

const AUTOPLAY_INTERVAL = 4000;

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1,
};

/**
 * Carousel — auto-advancing image carousel with drag, dots, and arrows.
 * Fully accessible with keyboard navigation and aria labels.
 */
export default function Carousel() {
  const [[currentIndex, direction], setSlide] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduce = useReducedMotion();
  const containerRef = useRef(null);
  const autoplayRef = useRef(null);

  const totalSlides = SLIDES.length;

  const goTo = useCallback(
    (index, dir) => {
      const newIndex = ((index % totalSlides) + totalSlides) % totalSlides;
      setSlide([newIndex, dir]);
    },
    [totalSlides]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo]);

  /* Autoplay */
  useEffect(() => {
    if (shouldReduce || isPaused) return;

    autoplayRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(autoplayRef.current);
  }, [goNext, isPaused, shouldReduce]);

  /* Pause autoplay on user interaction */
  const pauseAutoplay = useCallback(() => setIsPaused(true), []);
  const resumeAutoplay = useCallback(() => setIsPaused(false), []);

  /* Keyboard navigation */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
        pauseAutoplay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
        pauseAutoplay();
      }
    },
    [goNext, goPrev, pauseAutoplay]
  );

  /* Drag end handler */
  const handleDragEnd = useCallback(
    (_e, info) => {
      const threshold = 50;
      if (info.offset.x < -threshold) {
        goNext();
      } else if (info.offset.x > threshold) {
        goPrev();
      }
      pauseAutoplay();
    },
    [goNext, goPrev, pauseAutoplay]
  );

  return (
    <Reveal as="section" className="pb-12 md:pb-16">
      <div className="section-container">
        <div
          ref={containerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Product showcase"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          onTouchStart={pauseAutoplay}
          onTouchEnd={resumeAutoplay}
          className="relative overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
        >
          {/* Slide container */}
          <div
            className="relative w-full"
            style={{ aspectRatio: '16 / 9' }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={shouldReduce ? {} : slideVariants}
                initial={shouldReduce ? false : 'enter'}
                animate="center"
                exit={shouldReduce ? undefined : 'exit'}
                transition={shouldReduce ? { duration: 0 } : springTransition}
                drag={shouldReduce ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${currentIndex + 1} of ${totalSlides}: ${SLIDES[currentIndex].alt}`}
              >
                <img
                  src={SLIDES[currentIndex].src}
                  alt={SLIDES[currentIndex].alt}
                  width={1200}
                  height={675}
                  loading={currentIndex === 0 ? 'eager' : 'lazy'}
                  draggable="false"
                  className="w-full h-full object-cover select-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Previous / Next arrows (desktop) */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => { goPrev(); pauseAutoplay(); }}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-cream/80 backdrop-blur-sm border border-ink/10 rounded-full hover:bg-cream transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => { goNext(); pauseAutoplay(); }}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-cream/80 backdrop-blur-sm border border-ink/10 rounded-full hover:bg-cream transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Caption + Dot indicators */}
        <div className="flex flex-col items-center mt-4 gap-3">
          {/* Caption */}
          <p className="text-sm text-muted italic">
            {SLIDES[currentIndex].caption}
          </p>

          {/* Dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
            {SLIDES.map((slide, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => { goTo(i, i > currentIndex ? 1 : -1); pauseAutoplay(); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 min-w-[8px] min-h-[8px] ${
                  i === currentIndex
                    ? 'bg-accent scale-125'
                    : 'bg-ink/20 hover:bg-ink/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
