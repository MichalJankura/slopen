import React from 'react';
import { VenueWithStatus, WeeklyHours, DayKey } from '../types';
import { FaFacebook, FaInstagram, FaGlobe, FaTiktok, FaStar, FaRegStar, FaStarHalf } from 'react-icons/fa6';

interface Props {
  venue: VenueWithStatus;
  onClose: () => void;
}

const dayOrder: DayKey[] = ['mon','tue','wed','thu','fri','sat','sun'];
const dayLabels: Record<DayKey, string> = { mon: 'Po', tue: 'Ut', wed: 'St', thu: 'Št', fri: 'Pi', sat: 'So', sun: 'Ne' };

function buildWeeklyLines(weekly: WeeklyHours) {
  return dayOrder.map(d => {
    const entry = weekly[d];
    return { key: d, label: dayLabels[d], value: entry ? `${entry.open} – ${entry.close}` : 'Zatvorené' };
  });
}

export const VenueDetailModal: React.FC<Props> = ({ venue, onClose }) => {

  const weekly = buildWeeklyLines(venue.weeklyHours || {});
  const todayIndex = new Date().getDay(); // 0 Sun ... 6 Sat
  const dayMap: DayKey[] = ['sun','mon','tue','wed','thu','fri','sat'];
  const todayKey: DayKey = dayMap[todayIndex];

  return (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-label={venue.name} onClick={onClose}>
      <div className="relative w-full max-w-xl bg-neutral-900 rounded-xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <button aria-label="Zavrieť" onClick={onClose} className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-neutral-300 hover:text-white transition-colors text-lg font-bold">
          ×
        </button>
        <div className="h-56 w-full overflow-hidden">
          <img src={venue.image} alt={venue.name} className="h-full w-full object-cover" />
        </div>
        <div className="p-6 flex flex-col gap-4">
                        {/* Type badges */}
            <div className="flex flex-wrap gap-2 -mt-1">
              {venue.types?.map(t => (
                <span key={t} className="text-[10px] uppercase tracking-wide bg-primary px-2 py-1 rounded font-bold text-black">
                  {t === 'restaurant' ? 'Reštaurácia' : t === 'cafe' ? 'Kaviareň' : t === 'pub' ? 'Pub' : t === 'bar' ? 'Bar' : t === 'bakery' ? 'Pekáreň' : t === 'club' ? 'Klub' : t}
                </span>
              ))}
            </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold leading-tight">{venue.name}</h3>
            {venue.rating && (
              <div className="flex items-center gap-2 text-xs" aria-label={`Hodnotenie ${venue.rating} z 5 na základe ${venue.ratingCount} hodnotení`}>
                <span className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => venue.rating && venue.rating >= i ? <FaStar key={i} className="text-yellow-400" /> : venue.rating && venue.rating >= i - 0.5 ? <FaStarHalf key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-yellow-600/30" />)}
                </span>
                <span className="font-medium tabular-nums">{venue.rating.toFixed(1)}</span>
                {venue.ratingCount != null && <span className="text-neutral-500">({venue.ratingCount})</span>}
              </div>
            )}
            {venue.restaurantType && (
              <p className="text-[11px] text-neutral-400">Typ kuchyne: {venue.restaurantType === 'normal' ? 'klasická' : venue.restaurantType}</p>
            )}
            <p className="text-sm text-neutral-400">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {venue.address}
              </a>
            </p>
            <p className="text-sm">
              <span className={venue.isOpen ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
                {venue.isOpen ? 'OTVORENÉ' : 'ZATVORENÉ'}
              </span>
              <span className="text-neutral-500 ml-2">{venue.todayHoursLabel}</span>
            </p>
            {venue.kitchenTodayLabel && (
              <p className="text-[11px] text-neutral-500">Kuchyňa: {venue.kitchenTodayLabel}</p>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-sm tracking-wide text-neutral-300 mb-2">Otváracie hodiny</h4>
            <ul className="space-y-1 text-xs sm:text-sm">
              {weekly.map(line => (
                <li
                  key={line.key}
                  className={`flex justify-between gap-4 rounded px-2 py-1 ${todayKey === line.key ? 'bg-white/5 text-white font-medium' : 'text-neutral-400'}`}
                >
                  <span className="w-10 shrink-0">{line.label}</span>
                  <span className="flex-1 text-right tabular-nums tracking-wide">{line.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            {venue.menu && (
              <a href={venue.menu} target="_blank" rel="noopener" className="px-4 py-2 rounded bg-primary text-black text-sm font-semibold hover:opacity-90 transition">Menu</a>
            )}
            {venue.dailyMenu && (
              <a href={venue.dailyMenu} target="_blank" rel="noopener" className="px-4 py-2 rounded bg-primary/80 text-black text-sm font-semibold hover:bg-primary transition">Denné menu</a>
            )}
          </div>
          <div className="flex gap-4 text-lg text-neutral-300">
            {venue.website && <a aria-label="Web" href={venue.website} target="_blank" rel="noopener" className="hover:text-white transition-colors"><FaGlobe /></a>}
            {venue.facebook && <a aria-label="Facebook" href={venue.facebook} target="_blank" rel="noopener" className="hover:text-[#1877F2]"><FaFacebook /></a>}
            {venue.instagram && <a aria-label="Instagram" href={venue.instagram} target="_blank" rel="noopener" className="hover:text-pink-500"><FaInstagram /></a>}
            {venue.tiktok && <a aria-label="TikTok" href={venue.tiktok} target="_blank" rel="noopener" className="hover:text-white"><FaTiktok /></a>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailModal;
