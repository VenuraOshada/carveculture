import Reveal from './Reveal';

const INSTAGRAM_URL = 'https://www.instagram.com/crave.culture.co';
// WhatsApp link temporarily disabled until client provides phone number:
// const WHATSAPP_URL = 'https://wa.me/94XXXXXXXXX';

/**
 * CTA — final call-to-action section with Instagram order button.
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
            Drop us a message on Instagram.
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
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-accent text-cream text-sm font-medium tracking-wide rounded-sm hover:bg-accent-hover transition-colors duration-200 min-h-[44px] shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="18" cy="6" r="1" fill="currentColor" />
              </svg>
              Message on Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
