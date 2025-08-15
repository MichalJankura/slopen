import React from 'react';

export const Hero: React.FC = () => {
  return (
    <header className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        <img
          src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1350&q=60"
          alt="Stará Ľubovňa Night"
          className="w-full h-full object-cover opacity-40"
          loading="lazy"
        />
      </div>
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight"><span className="text-primary">SLOPEN</span> <span className="text-white/90 block md:inline">Kde ísť dnes v Starej Ľubovni?</span></h1>
        <p className="max-w-xl text-neutral-300 text-lg md:text-xl leading-relaxed">Lokálny prehľad reštaurácií, kaviarní, pubov a klubov. Ulož si obľúbené podniky bez registrácie. Zisti čo je práve otvorené.</p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <a href="#miesta" className="bg-primary hover:bg-accent transition-colors px-6 py-3 rounded font-semibold">Preskúmať miesta</a>        </div>
      </div>
    </header>
  );
};
