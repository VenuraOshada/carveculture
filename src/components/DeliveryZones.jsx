import Reveal from './Reveal';

const ZONES = ['Ja Ela', 'Kandana', 'Wattala', 'Katunayake', 'Negombo'];

/**
 * DeliveryZones — horizontal list of delivery zones with dividers.
 */
export default function DeliveryZones() {
  return (
    <section id="delivery" aria-labelledby="delivery-heading" className="py-16 md:py-24">
      <div className="section-container text-center">
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
            Delivery areas
          </p>
          <h2
            id="delivery-heading"
            className="font-semibold tracking-tight mb-10 md:mb-14"
            style={{ fontSize: 'var(--text-section)' }}
          >
            We deliver to
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <ul
            role="list"
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 md:gap-x-0"
          >
            {ZONES.map((zone, i) => (
              <li key={zone} className="flex items-center">
                <span className="text-base md:text-lg font-medium px-3 md:px-5">
                  {zone}
                </span>
                {i < ZONES.length - 1 && (
                  <span
                    className="hidden md:block w-px h-4 bg-ink/15"
                    aria-hidden="true"
                  />
                )}
                {i < ZONES.length - 1 && (
                  <span className="md:hidden text-ink/20" aria-hidden="true">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <hr className="hairline mt-16 md:mt-24" />
      </div>
    </section>
  );
}
