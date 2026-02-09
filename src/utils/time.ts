import { WeeklyHours, DayKey } from '../types';

function hmToMinutes(hm: string) {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + m;
}

const dayOrder: DayKey[] = ['sun','mon','tue','wed','thu','fri','sat'];

export function computeStatusForWeekly(weekly: WeeklyHours | null | undefined | string, now: Date = new Date()) {
  // Add debugging
  console.log('computeStatusForWeekly called with:', weekly, 'type:', typeof weekly);
  
  // Handle null/undefined weekly hours
  if (!weekly) {
    console.log('No weekly hours provided, returning closed');
    return { isOpen: false, opensInMinutes: undefined, todayHoursLabel: 'Zatvorené' };
  }
  
  // Parse JSON string if needed
  let parsedWeekly: WeeklyHours;
  if (typeof weekly === 'string') {
    try {
      parsedWeekly = JSON.parse(weekly);
      console.log('Parsed JSON weekly hours:', parsedWeekly);
    } catch (e) {
      console.error('Failed to parse weekly hours JSON:', e);
      return { isOpen: false, opensInMinutes: undefined, todayHoursLabel: 'Zatvorené' };
    }
  } else if (typeof weekly === 'object') {
    parsedWeekly = weekly;
  } else {
    console.log('Invalid weekly hours format, returning closed');
    return { isOpen: false, opensInMinutes: undefined, todayHoursLabel: 'Zatvorené' };
  }
  
  const dayIndex = now.getDay(); // 0 Sunday
  const todayKey = dayOrder[dayIndex];
  const today = parsedWeekly[todayKey];
  const nowM = now.getHours() * 60 + now.getMinutes();

  console.log('Today is:', todayKey, 'Today hours:', today, 'Current time in minutes:', nowM);

  function buildLabel(entry: any): string {
    if (!entry) return 'Zatvorené';
    return `${entry.open} - ${entry.close}`;
  }

  if (today) {
    const openM = hmToMinutes(today.open);
    const closeM = hmToMinutes(today.close);
    const overnight = closeM < openM;
    let isOpen = false;
    let closesInMinutes: number | undefined;
    let opensInMinutes: number | undefined;
    if (overnight) {
      if (nowM >= openM || nowM < closeM) {
        isOpen = true;
        const target = nowM >= openM ? closeM + 24*60 : closeM; // after midnight wrap
        closesInMinutes = target - nowM;
      } else {
        const target = nowM < openM ? openM : openM + 24*60;
        opensInMinutes = target - nowM;
      }
    } else {
      if (nowM >= openM && nowM < closeM) {
        isOpen = true;
        closesInMinutes = closeM - nowM;
      } else {
        const target = nowM < openM ? openM : openM + 24*60; // tomorrow
        opensInMinutes = target - nowM;
      }
    }
    if (!isOpen && opensInMinutes == null) {
      // need to find next open day
      for (let offset=1; offset<=7; offset++) {
        const nextDay = dayOrder[(dayIndex + offset) % 7];
        const entry = parsedWeekly[nextDay];
        if (entry) {
          const open = hmToMinutes(entry.open) + offset*24*60;
          opensInMinutes = open - nowM;
          break;
        }
      }
    }
  return { isOpen, opensInMinutes, closesInMinutes, todayHoursLabel: buildLabel(today) };
  } else {
    // closed today, find next open
    let opensInMinutes: number | undefined;
    for (let offset=1; offset<=7; offset++) {
      const nextDay = dayOrder[(dayIndex + offset) % 7];
      const entry = parsedWeekly[nextDay];
      if (entry) {
        const open = hmToMinutes(entry.open) + offset*24*60;
        const nowM = now.getHours() * 60 + now.getMinutes();
        opensInMinutes = open - nowM;
        break;
      }
    }
    return { isOpen: false, opensInMinutes, todayHoursLabel: 'Zatvorené' };
  }
}

export function attachKitchenStatus(base: any, kitchenWeekly?: WeeklyHours | null | string, now: Date = new Date()) {
  if (!kitchenWeekly) return base;
  
  // Parse JSON string if needed
  let parsedKitchen: WeeklyHours;
  if (typeof kitchenWeekly === 'string') {
    try {
      parsedKitchen = JSON.parse(kitchenWeekly);
    } catch (e) {
      console.error('Failed to parse kitchen hours JSON:', e);
      return base;
    }
  } else if (typeof kitchenWeekly === 'object') {
    parsedKitchen = kitchenWeekly;
  } else {
    return base;
  }
  
  const dayIndex = now.getDay();
  const dayOrder: DayKey[] = ['sun','mon','tue','wed','thu','fri','sat'];
  const todayKey = dayOrder[dayIndex];
  const entry = parsedKitchen[todayKey];
  if (!entry) return { ...base, kitchenTodayLabel: 'Varí: Zatvorené' };
  const nowM = now.getHours()*60 + now.getMinutes();
  const openM = hmToMinutes(entry.open);
  const closeM = hmToMinutes(entry.close);
  const overnight = closeM < openM;
  let kitchenClosesInMinutes: number | undefined;
  let active = false;
  if (overnight) {
    if (nowM >= openM || nowM < closeM) {
      active = true;
      const target = nowM >= openM ? closeM + 24*60 : closeM;
      kitchenClosesInMinutes = target - nowM;
    }
  } else if (nowM >= openM && nowM < closeM) {
    active = true;
    kitchenClosesInMinutes = closeM - nowM;
  }
  return {
    ...base,
    kitchenClosesInMinutes,
    kitchenTodayLabel: `${entry.open} - ${entry.close}`,
    kitchenOpen: active
  };
}
