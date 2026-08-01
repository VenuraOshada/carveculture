import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/images/logo.jpg';

const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Delivery', href: '#delivery' },
  { label: 'Order', href: '#order' },
];

/**
 * Nav — sticky navigation bar.
 * Shrinks padding + adds hairline border on scroll.
 * Mobile hamburger menu with animated slide-down.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Throttled scroll listener */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close menu on resize to desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Close menu on escape key */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [menuOpen]);

  /* Prevent body scroll when menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.body.style.overflow = '';

    setTimeout(() => {
      if (href === '#' || href === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 60);
  }, []);

  return (
    <>
      {/* Skip to content */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <nav
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 border-b border-ink/10 bg-cream/95 backdrop-blur-sm'
            : 'py-5 md:py-6 bg-cream'
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo + Wordmark */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-ink tracking-tight"
            aria-label="Crave Culture — home"
          >
            <img
              src={logoImg}
              alt="Crave Culture Logo"
              width={36}
              height={36}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-ink/10"
            />
            <span>
              Crave <em className="font-semibold">Culture</em>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm text-muted hover:text-ink transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <motion.span
              className="block w-5 h-px bg-ink origin-center"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-ink"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-5 h-px bg-ink origin-center"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden overflow-hidden border-t border-ink/10 bg-cream/98 backdrop-blur-md shadow-lg"
            >
              <ul className="section-container py-6 flex flex-col gap-2" role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block text-lg font-medium text-ink py-2.5 px-3 rounded-lg hover:bg-cream-dark transition-colors duration-150"
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
