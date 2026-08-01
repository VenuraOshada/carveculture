import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';

const MENU_CATEGORIES = [
  {
    id: 'brownies',
    category: 'Brownies',
    minOrderNote: '*Min Order Qty 6pcs',
    items: [
      { name: 'Classic Brownies', price: 'Rs.250' },
      { name: 'Brownies with Nutella and Almond', price: 'Rs.370' },
      { name: 'Brownies with Pistachio', price: 'Rs.380' },
      { name: 'Brownie with Strawberry', price: 'Rs.370' },
      { name: 'Brownie with Cashew on top', price: 'Rs.350' },
      { name: 'Brownie with Biscoff', price: 'Rs.450' },
      { name: 'Brownie with Oreo', price: 'Rs.350' },
    ],
  },
  {
    id: 'cookies',
    category: 'Cookies',
    minOrderNote: '*Min Order Qty 6pcs',
    items: [
      { name: 'Classic Cookie', price: 'Rs.180' },
      { name: 'Chocolate chip Cookie', price: 'Rs.200' },
      { name: 'White chocochip Cookie', price: 'Rs.210' },
      { name: 'Kinder Cookie', price: 'Rs.280' },
      { name: 'Banana bread Cookie', price: 'Rs.230' },
      { name: 'Pistachio Cookie', price: 'Rs.240' },
    ],
  },
  {
    id: 'other',
    category: 'Other',
    minOrderNote: null,
    items: [
      { name: 'Banana Bread Loaf', price: 'Rs.1450' },
      {
        name: 'Cookie pack (6pcs)',
        subItems: [
          { name: 'Classic', price: 'Rs.700' },
          { name: 'Chocochip', price: 'Rs.780' },
          { name: 'White Chocochip', price: 'Rs.800' },
        ],
      },
    ],
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
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/**
 * MenuList — displays menu items categorized into Brownies, Cookies, and Other with prices.
 */
export default function MenuList() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCategories =
    activeTab === 'all'
      ? MENU_CATEGORIES
      : MENU_CATEGORIES.filter((cat) => cat.id === activeTab);

  return (
    <section id="menu" aria-labelledby="menu-heading" className="py-16 md:py-24">
      <div className="section-container">
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
            Freshly Baked
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
            <div>
              <h2
                id="menu-heading"
                className="font-semibold tracking-tight"
                style={{ fontSize: 'var(--text-section)' }}
              >
                Our Menu
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-ink/10 pb-2 md:pb-0 md:border-b-0">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 text-xs tracking-wider uppercase transition-all rounded-full ${
                  activeTab === 'all'
                    ? 'bg-accent text-cream font-medium shadow-xs'
                    : 'text-muted hover:text-ink border border-ink/10 hover:border-ink/30'
                }`}
              >
                All Items
              </button>
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-1.5 text-xs tracking-wider uppercase transition-all rounded-full ${
                    activeTab === cat.id
                      ? 'bg-accent text-cream font-medium shadow-xs'
                      : 'text-muted hover:text-ink border border-ink/10 hover:border-ink/30'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className={`grid grid-cols-1 ${
              activeTab === 'all' ? 'lg:grid-cols-3' : 'lg:grid-cols-1 max-w-3xl mx-auto'
            } gap-8 md:gap-10`}
          >
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-cream-dark/60 border border-ink/10 rounded-xl p-6 md:p-8 flex flex-col justify-between shadow-xs transition-shadow duration-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-baseline justify-between border-b border-ink/15 pb-4 mb-6">
                    <h3 className="text-2xl font-semibold tracking-tight text-ink font-serif">
                      {cat.category}
                    </h3>
                    {cat.minOrderNote && (
                      <span className="text-[0.7rem] italic tracking-wide text-accent font-medium">
                        {cat.minOrderNote}
                      </span>
                    )}
                  </div>

                  <motion.ul
                    role="list"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-20px' }}
                    className="space-y-4"
                  >
                    {cat.items.map((item) => (
                      <motion.li
                        key={item.name}
                        variants={itemVariants}
                        className="flex flex-col gap-1 pb-3 border-b border-dashed border-ink/10 last:border-b-0 last:pb-0"
                      >
                        {item.subItems ? (
                          <div>
                            <span className="text-base font-medium text-ink block mb-2">
                              {item.name}
                            </span>
                            <ul className="pl-4 space-y-2 border-l-2 border-accent/20">
                              {item.subItems.map((sub) => (
                                <li
                                  key={sub.name}
                                  className="flex items-center justify-between gap-3 text-sm"
                                >
                                  <span className="text-muted font-normal">
                                    – {sub.name}
                                  </span>
                                  <span className="font-semibold text-accent text-sm whitespace-nowrap bg-accent/10 px-2.5 py-0.5 rounded-full">
                                    {sub.price}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-base font-medium text-ink leading-snug">
                              {item.name}
                            </span>
                            <span className="font-semibold text-accent text-sm whitespace-nowrap bg-accent/10 px-2.5 py-0.5 rounded-full shrink-0">
                              {item.price}
                            </span>
                          </div>
                        )}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {cat.minOrderNote && (
                  <div className="mt-8 pt-4 border-t border-ink/10 text-center">
                    <p className="text-xs text-muted">
                      Custom orders & bulk inquiries welcome.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <hr className="hairline mt-16 md:mt-24" />
      </div>
    </section>
  );
}

