import React from 'react';

export const SEO: React.FC = () => {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'SLOPEN - Stará Ľubovňa Guide',
    'url': 'https://slopen.local',
    'description': 'Prehľad reštaurácií, kaviarní, pubov a klubov v Starej Ľubovni. Bez registrácie si ulož obľúbené a zisti čo je otvorené.',
    'areaServed': 'Stará Ľubovňa, Slovakia'
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;
};
