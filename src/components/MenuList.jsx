import { motion } from 'framer-motion';
import Reveal from './Reveal';

const MENU_ITEMS = [
  {
    name: 'Classic Fudge Brownie',
    description: 'Rich, dense, and intensely chocolatey. Our OG recipe with a crackly top.',
    note: 'Best seller',
  },
  {
    name: 'Walnut Brownie',
    description: 'Classic fudge base loaded with roasted walnut pieces for a satisfying crunch.',
    note: null,
  },
  {
    name: 'Salted Caramel Brownie',
    description: 'Swirled with house-made salted caramel and finished with flaky sea salt.',
    note: 'New',
  },
  {
    name: 'Chocolate Chip Cookies',
    description: 'Crisp edges, chewy centers, and pools of melted dark chocolate in every bite.',
    note: null,
  },
  {
    name: 'Biscoff Brownie',
    description: 'Fudgy brownie base with Lotus Biscoff spread ripple and crushed cookie topping.',
    note: null,
  },
  {
    name: 'Celebration Cake',
    description: 'Custom chocolate layer cake with ganache frosting. Perfect for birthdays & events.',
    note: 'Pre-order only',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/**
 * MenuList — section displaying menu items as staggered rows.
 */
export default function MenuList() {
  return (
    <section id="menu" aria-labelledby="menu-heading" className="py-16 md:py-24">
      <div className="section-container">
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
            What we bake
          </p>
          <h2
            id="menu-heading"
            className="font-semibold tracking-tight mb-12 md:mb-16"
            style={{ fontSize: 'var(--text-section)' }}
          >
            The Menu
          </h2>
        </Reveal>

        <motion.ul
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-0"
        >
          {MENU_ITEMS.map((item) => (
            <motion.li
              key={item.name}
              variants={itemVariants}
              className="py-5 md:py-6 border-b border-ink/10 first:border-t"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-8">
                <div className="flex items-center gap-3">
                  <h3 className="text-base md:text-lg font-semibold">
                    {item.name}
                  </h3>
                  {item.note && (
                    <span className="inline-flex items-center px-2 py-0.5 text-[0.65rem] tracking-widest uppercase text-accent border border-accent/30 rounded-sm whitespace-nowrap">
                      {item.note}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted md:max-w-sm md:text-right leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <hr className="hairline mt-16 md:mt-24" />
      </div>
    </section>
  );
}
