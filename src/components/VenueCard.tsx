import React from 'react';
import { Venue, VenueCategory } from '../types';
import { FaHeart, FaRegHeart, FaInstagram, FaFacebook, FaGlobe, FaTiktok } from 'react-icons/fa6';

interface Props {
  venue: Venue;
  favourite: boolean;
  onToggleFavourite: (id: string) => void;
  isOpen: boolean;
  statusNote?: string;
}

// Mapping from internal category codes to display labels
const typeLabel: Record<VenueCategory, string> = {
  restaurant: 'Reštaurácia',
  pub: 'Pub',
  bar: 'Bar',
  cafe: 'Kaviareň',
  bakery: 'Pekáreň',
  club: 'Klub'
};

export const VenueCard: React.FC<Props> = ({ venue, favourite, onToggleFavourite, isOpen, statusNote }) => {
  return (
    <div className="group relative bg-neutral-900 rounded-lg overflow-hidden shadow-card transition-transform duration-300 hover:-translate-y-1">
      <button
        aria-label={favourite ? 'Odstrániť z obľúbených' : 'Pridať medzi obľúbené'}
        onClick={() => onToggleFavourite(venue.id)}
        className="absolute z-10 top-2 right-2 p-2 rounded-full bg-black/60 backdrop-blur hover:bg-black/80 text-primary"
      >
        {favourite ? <FaHeart className="text-primary" /> : <FaRegHeart />}
      </button>
      <div className="h-40 w-full overflow-hidden">
        <img loading="lazy" src={venue.image} alt={venue.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 flex-1">{venue.name}</h3>
          {/* Type badges (supports multiple types) */}
          <div className="flex flex-wrap gap-1 justify-end">
            {venue.types.map(t => (
              <span key={t} className="text-[10px] uppercase tracking-wide bg-primary px-2 py-1 rounded font-bold">
                {typeLabel[t] || t}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs text-neutral-400 line-clamp-1">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Zobraziť mapu: ${venue.name}`}
            className="hover:underline hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary rounded"
          >
            {venue.address}
          </a>
        </p>
  {/* Hours row */}
        <p className="text-xs"><span className={isOpen ? 'text-green-400' : 'text-red-400'}>{isOpen ? 'OTVORENÉ' : 'ZATVORENÉ'}</span> <span className="text-neutral-500 ml-1">{'todayHoursLabel' in venue ? (venue as any).todayHoursLabel : ''}</span>{statusNote && <span className="ml-2 text-[10px] text-neutral-400">{statusNote}</span>}</p>
        {'kitchenTodayLabel' in venue && (venue as any).kitchenTodayLabel && (
          <p className="text-[10px] text-neutral-500">Kuchyňa: {(venue as any).kitchenTodayLabel}{(venue as any).kitchenClosesInMinutes != null && (venue as any).kitchenClosesInMinutes <= 60 && <span className="ml-1 text-neutral-400">(končí za {(venue as any).kitchenClosesInMinutes}m)</span>}</p>
        )}
        <div className="flex gap-3 mt-1 text-neutral-300">
          {venue.website && <a aria-label="Web" href={venue.website} target="_blank" rel="noopener" className="hover:text-white transition-colors"><FaGlobe /></a>}
          {venue.facebook && <a aria-label="Facebook" href={venue.facebook} target="_blank" rel="noopener" className="hover:text-[#1877F2]"><FaFacebook /></a>}
            {venue.instagram && <a aria-label="Instagram" href={venue.instagram} target="_blank" rel="noopener" className="hover:text-pink-500"><FaInstagram /></a>}
            {venue.tiktok && <a aria-label="TikTok" href={venue.tiktok} target="_blank" rel="noopener" className="hover:text-white"><FaTiktok /></a>}
        </div>
      </div>
    </div>
  );
};
