import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';

/* Real bakery carousel images */
import imgBrownies from '../assets/images/carousel-brownies.jpg';
import imgCookies from '../assets/images/carousel-cookies.jpg';
import imgFreshBaked from '../assets/images/carousel-fresh-baked.jpg';
import imgEclairs from '../assets/images/carousel-eclairs.jpg';

const SLIDES = [
  {
    id: 'brownies',
    badge: 'Signature Brownies',
    title: 'Nutella & Almond Brownies',
    subtitle: 'Small-Batch Chocolate Tray',
    caption:
      'Fudgy, dense chocolate brownies generously topped with silky hazelnut ganache and toasted sliced almonds.',
    features: ['100% Belgian Cocoa', 'Toasted Sliced Almonds', 'Baked Fresh to Order'],
    tag: 'Best Seller',
    src: imgBrownies,
    alt: 'Signature fudgy brownies topped with chocolate ganache and roasted sliced almonds',
    objectPosition: '50% 68%',
  },
  {
    id: 'cookies',
    badge: 'Artisan Cookies',
    title: 'Handcrafted Cookie Collection',
    subtitle: 'Gourmet Flavor Assortment',
    caption:
      'Signature gourmet cookies featuring Pistachio cream, Oreo crumble, Red Velvet with glaze, and Classic Chocolate Chip.',
    features: ['Pistachio & Oreo Specials', 'Crisp Edges, Chewy Center', 'Available in 6pc Packs'],
    tag: 'Customer Favorite',
    src: imgCookies,
    alt: 'Artisan handcrafted cookie collection with pistachio, oreo, red velvet, and chocolate chip',
    objectPosition: '50% 68%',
  },
  {
    id: 'oven',
    badge: 'Freshly Baked',
    title: 'Straight From the Oven',
    subtitle: 'Warm Batches Daily',
    caption:
      'Every single batch is baked fresh upon receiving your order — golden on the outside with warm molten pockets of chocolate inside.',
    features: ['Never Sitting on a Shelf', 'Molten Chocolate Centers', 'Delivered Fresh in Ja Ela'],
    tag: 'Baked to Order',
    src: imgFreshBaked,
    alt: 'Golden chocolate chip cookies freshly baking inside the oven',
    objectPosition: '50% 50%',
  },
  {
    id: 'eclairs',
    badge: 'Choux Pastries',
    title: 'Chocolate Drizzled Eclairs',
    subtitle: 'Classic French Patisserie',
    caption:
      'Crisp golden choux pastry shells filled with luscious cream and finished with a rich dark chocolate drizzle.',
    features: ['Light & Airy Choux Pastry', 'Velvety Cream Filling', 'Belgian Chocolate Drizzle'],
    tag: 'New Specialty',
    src: imgEclairs,
    alt: 'Golden choux pastry eclairs filled with rich cream and drizzled with chocolate sauce',
    objectPosition: '50% 72%',
  },
];

const AUTOPLAY_INTERVAL = 5000;
const INSTAGRAM_DM = 'https://www.instagram.com/crave.culture.co';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

/**
 * Carousel — Editorial Atelier Showcase
 * On Desktop: Symmetrical split showcase with rich product highlights, interactive
 * thumbnail selector, and crisp 4:3 high-density photography.
 * On Mobile: Clean, responsive stacked card view with category chips and swipe gestures.
 */
export default function Carousel() {
  const [[currentIndex, direction], setSlide] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduce = useReducedMotion();
  const containerRef = useRef(null);
  const autoplayRef = useRef(null);

  const totalSlides = SLIDES.length;
  const currentSlide = SLIDES[currentIndex];

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

  /* Touch / Drag swipe */
  const handleDragEnd = useCallback(
    (_e, info) => {
      const threshold = 40;
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
    <Reveal as="section" className="pb-16 md:pb-24">
      <div className="section-container">
        {/* Main Showcase Card */}
        <div
          ref={containerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Bakery showcase"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          onTouchStart={pauseAutoplay}
          onTouchEnd={resumeAutoplay}
          className="bg-cream-dark/40 border border-ink/8 rounded-3xl p-5 sm:p-7 md:p-8 lg:p-10 shadow-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-ink/8">
            <div>
              <p className="text-[0.7rem] md:text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-1">
                Artisan Gallery · Baked Fresh
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink tracking-tight">
                Our Signature Bakes
              </h2>
            </div>

            {/* Slide counter & arrow buttons */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs font-mono font-medium text-muted bg-cream px-3 py-1.5 rounded-full border border-ink/8">
                0{currentIndex + 1} / 0{totalSlides}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous bake"
                  onClick={() => {
                    goPrev();
                    pauseAutoplay();
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream border border-ink/10 flex items-center justify-center text-ink hover:bg-cream-dark hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M10 3L5 8L10 13"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next bake"
                  onClick={() => {
                    goNext();
                    pauseAutoplay();
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream border border-ink/10 flex items-center justify-center text-ink hover:bg-cream-dark hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M6 3L11 8L6 13"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Category Quick-Chips (shown on mobile, hidden on desktop) */}
          <div
            className="flex md:hidden flex-wrap items-center gap-1.5 mb-5"
            role="tablist"
            aria-label="Category tabs"
          >
            {SLIDES.map((slide, i) => {
              const isActive = i === currentIndex;
              return (
                <button
                  key={slide.badge}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View ${slide.badge}`}
                  onClick={() => {
                    goTo(i, i > currentIndex ? 1 : -1);
                    pauseAutoplay();
                  }}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-accent text-cream shadow-xs'
                      : 'bg-cream text-muted hover:text-ink'
                  }`}
                >
                  {slide.badge}
                </button>
              );
            })}
          </div>

          {/* Symmetrical Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            {/* Left Column: Product Details & Interactive Thumbnail Selector */}
            <div className="md:col-span-5 flex flex-col justify-between order-2 md:order-1">
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Badge & Tag row */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[0.7rem] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full bg-cream border border-ink/8 text-ink">
                        {currentSlide.badge}
                      </span>
                      <span className="text-[0.7rem] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                        {currentSlide.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-ink tracking-tight mb-2">
                      {currentSlide.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm lg:text-base text-muted leading-relaxed mb-4">
                      {currentSlide.caption}
                    </p>

                    {/* Key features bullets */}
                    <ul className="flex flex-col gap-1.5 mb-6 text-xs lg:text-sm text-ink/85">
                      {currentSlide.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-accent/15 text-accent flex items-center justify-center text-[0.65rem] font-bold">
                            ✓
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Pre-order DM CTA */}
                    <div className="flex items-center gap-3">
                      <a
                        href={INSTAGRAM_DM}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-cream text-xs uppercase tracking-wider font-medium rounded-full hover:bg-accent-hover transition-colors shadow-xs"
                      >
                        <span>Pre-order on Instagram</span>
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path
                            d="M6 3L11 8L6 13"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Desktop Thumbnail Nav Selector (hidden on mobile, visible on desktop) */}
              <div className="hidden md:block mt-8 pt-6 border-t border-ink/8">
                <p className="text-[0.65rem] uppercase tracking-widest text-muted font-semibold mb-3">
                  Browse Creations
                </p>
                <div className="grid grid-cols-2 gap-2.5" role="tablist" aria-label="Select baked good">
                  {SLIDES.map((slide, i) => {
                    const isActive = i === currentIndex;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Select ${slide.title}`}
                        onClick={() => {
                          goTo(i, i > currentIndex ? 1 : -1);
                          pauseAutoplay();
                        }}
                        className={`flex items-center gap-2.5 p-2 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-cream shadow-xs border border-accent/40 ring-1 ring-accent/20'
                            : 'bg-cream/60 hover:bg-cream border border-ink/5 hover:border-ink/10 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={slide.src}
                          alt=""
                          width={48}
                          height={48}
                          style={{ objectPosition: slide.objectPosition }}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className={`text-xs font-medium truncate ${isActive ? 'text-accent font-semibold' : 'text-ink'}`}>
                            {slide.title}
                          </p>
                          <p className="text-[0.65rem] text-muted truncate">
                            {slide.badge}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Featured Image Viewport */}
            <div className="md:col-span-7 order-1 md:order-2 flex flex-col justify-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-ink/10 bg-cream">
                {/* Floating category badge on image */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <span className="bg-cream/95 backdrop-blur-md text-ink text-[0.7rem] md:text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-sm border border-ink/5">
                    {currentSlide.badge}
                  </span>
                </div>

                {/* Animated Image Slide */}
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={shouldReduce ? {} : slideVariants}
                    initial={shouldReduce ? false : 'enter'}
                    animate="center"
                    exit={shouldReduce ? undefined : 'exit'}
                    transition={
                      shouldReduce
                        ? { duration: 0 }
                        : {
                            x: { type: 'spring', stiffness: 260, damping: 26 },
                            opacity: { duration: 0.25 },
                          }
                    }
                    drag={shouldReduce ? false : 'x'}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${currentIndex + 1} of ${totalSlides}: ${currentSlide.alt}`}
                  >
                    <img
                      src={currentSlide.src}
                      alt={currentSlide.alt}
                      width={768}
                      height={1024}
                      loading={currentIndex === 0 ? 'eager' : 'lazy'}
                      draggable="false"
                      style={{
                        objectPosition: currentSlide.objectPosition,
                      }}
                      className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Overlaid Previous / Next arrows for quick hovering on photo */}
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={() => {
                    goPrev();
                    pauseAutoplay();
                  }}
                  className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-cream/90 backdrop-blur-md border border-ink/10 rounded-full text-ink shadow-md hover:bg-cream hover:scale-105 active:scale-95 transition-all cursor-pointer opacity-70 hover:opacity-100"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M10 3L5 8L10 13"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={() => {
                    goNext();
                    pauseAutoplay();
                  }}
                  className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-cream/90 backdrop-blur-md border border-ink/10 rounded-full text-ink shadow-md hover:bg-cream hover:scale-105 active:scale-95 transition-all cursor-pointer opacity-70 hover:opacity-100"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M6 3L11 8L6 13"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Progress pill indicator bar below image on mobile */}
              <div
                className="flex md:hidden items-center justify-center gap-2 mt-4"
                role="tablist"
                aria-label="Slide dots"
              >
                {SLIDES.map((slide, i) => {
                  const isActive = i === currentIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Slide ${i + 1}`}
                      onClick={() => {
                        goTo(i, i > currentIndex ? 1 : -1);
                        pauseAutoplay();
                      }}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive ? 'w-7 bg-accent' : 'w-2 bg-ink/20'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
