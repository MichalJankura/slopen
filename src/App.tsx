import React, { useEffect, useState } from 'react';
import { Hero } from './sections/Hero';
import { VenueGrid } from './sections/VenueGrid';
import { SEO } from './components/SEO';
import VenueFinder from './components/VenueFinder';
import { ReviewsExtractor } from './review_extractor/reviews_extractor';

const App: React.FC = () => {
  return (
    <>
      <SEO />
      <Navbar />
      <main>
        {/* <VenueFinder /> */}
        <Hero />
        <VenueGrid />
  {/* Dev tool: Google reviews extractor */}
        <ReviewsExtractor />
        <Footer />
      </main>
    </>
  );
};

// BrandName animates the FIRST word only (JEM -> PIJEM -> SLOPEM) while 'LEBO SLOPEN' stays static.
const BrandName: React.FC = () => {
  const words = ['JEM', 'PIJEM', 'SLOPEM'];
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (index >= words.length - 1) return; // stop after last word
    const timer = setTimeout(() => {
      setTransitioning(true);
      // brief fade/scale out then switch word
      setTimeout(() => {
        setIndex(i => i + 1);
        setTransitioning(false);
      }, 180);
    }, 1900); // display each interim word ~1.9s
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <span className="inline-flex items-baseline relative font-black tracking-tight" aria-label={`${words[index]} LEBO SLOPEN`}>
      <span className="text-primary inline-flex">
        <span
          className={
            'inline-block origin-bottom transition-all duration-200 ' +
            (transitioning ? 'opacity-0 scale-90 translate-y-1' : 'opacity-100 scale-100 translate-y-0')
          }
        >
          {words[index]}
        </span>
      </span>
      <span className="ml-2">
        LEBO <span className="text-primary">SLOPEN</span>
      </span>
    </span>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-black/0 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="font-black tracking-tight text-xl flex items-center gap-2 select-none">
          <BrandName />
        </a>
        {/* <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#miesta" className="hover:text-primary transition-colors">Miesta</a>
        </div> */}
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-black/60 mt-20">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-neutral-500">
        <p>&copy; {new Date().getFullYear()} SLOPEN. Študentský osobný projekt.</p>
      </div>
    </footer>
  );
};
export default App;
