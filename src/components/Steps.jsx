import { motion } from 'framer-motion';
import Reveal from './Reveal';

const STEPS = [
  {
    number: '01',
    title: 'Message us',
    description:
      'Send us a DM on Instagram with what you\'d like to order and your preferred delivery date.',
  },
  {
    number: '02',
    title: 'Confirm your order',
    description:
      'We\'ll confirm availability, pricing, and delivery details. A small advance may be needed for custom orders.',
  },
  {
    number: '03',
    title: 'Collect or get it delivered',
    description:
      'Pick up your freshly baked treats or have them delivered right to your doorstep within our delivery zones.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/**
 * Steps — 3-step "How it works" process section.
 */
export default function Steps() {
  return (
    <section aria-labelledby="steps-heading" className="py-16 md:py-24">
      <div className="section-container">
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
            Simple process
          </p>
          <h2
            id="steps-heading"
            className="font-semibold tracking-tight mb-12 md:mb-16"
            style={{ fontSize: 'var(--text-section)' }}
          >
            How it works
          </h2>
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {STEPS.map((step) => (
            <motion.div key={step.number} variants={stepVariants}>
              <div className="border-t border-ink/10 pt-6">
                <span className="text-3xl md:text-4xl font-semibold text-ink/15 mb-3 block">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <hr className="hairline mt-16 md:mt-24" />
      </div>
    </section>
  );
}
