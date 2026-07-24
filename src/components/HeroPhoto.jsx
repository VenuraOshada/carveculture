import Reveal from './Reveal';
import heroBrownies from '../assets/images/hero-brownies.png';

/**
 * HeroPhoto — large product image with a caption row.
 * Placed below the carousel, acts as a visual anchor.
 */
export default function HeroPhoto() {
  return (
    <Reveal as="section" className="pb-16 md:pb-24">
      <div className="section-container">
        <div className="overflow-hidden rounded-sm">
          <img
            src={heroBrownies}
            alt="Fudgy chocolate brownies arranged on a ceramic plate with sea salt"
            width={1200}
            height={800}
            loading="eager"
            className="w-full object-cover"
            style={{ aspectRatio: '3 / 2' }}
          />
        </div>

        {/* Caption row */}
        <div className="flex items-center justify-between mt-4 text-xs md:text-sm text-muted">
          <span className="italic">Our signature fudgy brownies</span>
          <span className="tracking-widest uppercase text-[0.65rem]">
            Baked fresh · Ja Ela
          </span>
        </div>

        <hr className="hairline mt-12 md:mt-16" />
      </div>
    </Reveal>
  );
}
