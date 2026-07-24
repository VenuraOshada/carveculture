import Reveal from './Reveal';

const INSTAGRAM_URL = 'https://www.instagram.com/crave.culture.co';
const WHATSAPP_URL = 'https://wa.me/94XXXXXXXXX'; // Replace with actual number

/**
 * CTA — final call-to-action section with Instagram and WhatsApp buttons.
 */
export default function CTA() {
  return (
    <section id="order" aria-labelledby="cta-heading" className="py-20 md:py-32">
      <div className="section-container text-center max-w-2xl">
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
            Let&apos;s get baking
          </p>
          <h2
            id="cta-heading"
            className="font-semibold tracking-tight mb-6"
            style={{ fontSize: 'var(--text-section)' }}
          >
            Ready to <em className="text-accent">order?</em>
          </h2>
          <p className="text-muted mb-10 leading-relaxed max-w-md mx-auto" style={{ fontSize: 'var(--text-body)' }}>
            Drop us a message on Instagram or WhatsApp.
            We&apos;ll get back to you faster than our brownies sell out.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Instagram DM */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-accent text-cream text-sm font-medium tracking-wide rounded-sm hover:bg-accent-hover transition-colors duration-200 min-h-[44px] w-full sm:w-auto"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="18" cy="6" r="1" fill="currentColor" />
              </svg>
              Message on Instagram
            </a>

            {/* WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-ink/20 text-ink text-sm font-medium tracking-wide rounded-sm hover:border-ink/40 transition-colors duration-200 min-h-[44px] w-full sm:w-auto"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 1.82.487 3.53 1.338 5.004L2 22l5.233-1.237A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 10.5c.5 1.5 2 3 3.5 3.5l1-1a.5.5 0 01.5-.1l2 .8a.5.5 0 01.3.5v1.5a1 1 0 01-1 1c-4 0-8-4-8-8a1 1 0 011-1h1.5a.5.5 0 01.5.3l.8 2a.5.5 0 01-.1.5l-1 1z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              WhatsApp us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
