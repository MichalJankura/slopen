export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface DayHours {
  open: string; // HH:MM 24h
  close: string; // HH:MM 24h (can be less than open to indicate overnight)
}

export type WeeklyHours = Partial<Record<DayKey, DayHours | null>>; // null => closed that day

export type ReviewRating = '1*' | '2*' | '3*' | '4*' | '5*';

export type RestaurantType = 'tradičná' | 'ázijská' | 'normal';

export interface Venue {
  id: string;
  name: string;
  type: 'restaurant' | 'pub' | 'club' | 'cafe';
  address: string;
  reviews?: ReviewRating;
  weeklyHours: WeeklyHours; // precise weekly schedule
  weeklyKitchenHours?: WeeklyHours; // optional kitchen (food service) schedule
  website?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  image: string; // path or URL
  // (Deprecated) hours?: string; // legacy single range support

  restaurantType?: RestaurantType; // e.g. 'pizzeria', 'steakhouse', etc.
}

export interface VenueWithStatus extends Venue {
  isOpen: boolean;
  opensInMinutes?: number; // if closed, minutes until open
  closesInMinutes?: number; // if open, minutes until close
  todayHoursLabel: string; // e.g. '10:00 - 22:00' or 'Zatvorené'
  kitchenClosesInMinutes?: number;
  kitchenTodayLabel?: string;
}
