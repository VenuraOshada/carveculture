import { lazy, Suspense } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import HeroPhoto from './components/HeroPhoto';
import MenuList from './components/MenuList';
import Footer from './components/Footer';

/* Code-split below-fold sections */
const EventTicket = lazy(() => import('./components/EventTicket'));
const DeliveryZones = lazy(() => import('./components/DeliveryZones'));
const Steps = lazy(() => import('./components/Steps'));
const CTA = lazy(() => import('./components/CTA'));

/**
 * App — root layout composing all sections.
 * Uses semantic HTML5 landmarks (header/main/footer).
 */
export default function App() {
  return (
    <>
      {/* Header / Navigation */}
      <header>
        <Nav />
      </header>

      {/* Main content */}
      <main id="main-content">
        <Hero />

        {/* Gallery / Carousel — directly below hero CTAs */}
        <div id="gallery">
          <Carousel />
        </div>

        <HeroPhoto />
        <MenuList />

        {/* Lazy-loaded below-fold sections */}
        <Suspense fallback={null}>
          <EventTicket />
          <DeliveryZones />
          <Steps />
          <CTA />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
