import Reveal from './Reveal';
import eventPhoto from '../assets/images/event-popup.jpg';

/**
 * EventTicket — ticket-stub styled card for upcoming pop-up events.
 * Features dashed divider and decorative punch-hole circles.
 */
export default function EventTicket() {
  return (
    <section id="events" aria-labelledby="events-heading" className="py-16 md:py-24">
      <div className="section-container">
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
            Coming up
          </p>
          <h2
            id="events-heading"
            className="font-semibold tracking-tight mb-12 md:mb-16"
            style={{ fontSize: 'var(--text-section)' }}
          >
            Events
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          {/* Ticket card */}
          <div className="relative bg-cream-dark border border-ink/8 rounded-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Photo side */}
              <div className="md:w-1/2">
                <img
                  src={eventPhoto}
                  alt="Crave Culture pop-up stall at a weekend market with brownies and cookies on display"
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '3 / 2' }}
                />
              </div>

              {/* Dashed divider with punch holes */}
              <div className="relative hidden md:block">
                {/* Vertical dashed line */}
                <div className="absolute inset-y-0 left-0 w-px border-l border-dashed border-ink/20" />
                {/* Top punch hole */}
                <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-cream" />
                {/* Bottom punch hole */}
                <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-cream" />
              </div>

              {/* Mobile dashed divider */}
              <div className="relative md:hidden">
                <div className="absolute inset-x-0 top-0 h-px border-t border-dashed border-ink/20" />
                <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-cream" />
                <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-cream" />
              </div>

              {/* Details side */}
              <div className="md:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <p className="text-[0.65rem] tracking-[0.25em] uppercase text-accent mb-4">
                  Pop-up Stall
                </p>

                <h3 className="text-xl md:text-2xl font-semibold mb-6 leading-snug">
                  Weekend Market <em>Pop-up</em>
                </h3>

                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-muted text-xs tracking-widest uppercase mb-1">
                      Dates
                    </dt>
                    <dd className="font-medium">August 2 – 3, 2026</dd>
                  </div>
                  <div>
                    <dt className="text-muted text-xs tracking-widest uppercase mb-1">
                      Location
                    </dt>
                    <dd className="font-medium">Good Market, Colombo 07</dd>
                  </div>
                  <div>
                    <dt className="text-muted text-xs tracking-widest uppercase mb-1">
                      Hours
                    </dt>
                    <dd className="font-medium">9:00 AM – 4:00 PM</dd>
                  </div>
                </dl>

                <a
                  href="https://www.instagram.com/crave.culture.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-8 text-sm text-accent font-medium hover:underline underline-offset-4 decoration-accent/40"
                >
                  Follow for updates
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="ml-1.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <hr className="hairline mt-16 md:mt-24" />
      </div>
    </section>
  );
}
