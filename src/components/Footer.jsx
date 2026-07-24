import logoImg from '../assets/images/logo.jpg';

const ZONES = ['Ja Ela', 'Kandana', 'Wattala', 'Katunayake', 'Negombo'];

/**
 * Footer — wordmark, delivery zones, and copyright.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 py-12 md:py-16" role="contentinfo">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Logo + Wordmark */}
          <div>
            <a
              href="#"
              className="flex items-center gap-3 text-xl font-semibold text-ink tracking-tight"
              aria-label="Crave Culture — back to top"
            >
              <img
                src={logoImg}
                alt="Crave Culture Logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border border-ink/10"
              />
              <span>
                Crave <em className="font-semibold">Culture</em>
              </span>
            </a>
            <p className="text-xs text-muted mt-2">
              Small-batch bakery · Sri Lanka
            </p>
          </div>

          {/* Delivery zones */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">
              Delivering to
            </p>
            <ul role="list" className="flex flex-wrap gap-x-4 gap-y-1">
              {ZONES.map((zone) => (
                <li key={zone} className="text-sm text-ink/70">
                  {zone}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-ink/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-muted">
            © {currentYear} Crave Culture. All rights reserved.
          </p>
          <a
            href="https://www.instagram.com/crave.culture.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-ink transition-colors duration-200"
          >
            @crave.culture.co
          </a>
        </div>
      </div>
    </footer>
  );
}
