import { WeeklyHours, DayKey } from '../types';

function hmToMinutes(hm: string) {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + m;
}

const dayOrder: DayKey[] = ['sun','mon','tue','wed','thu','fri','sat'];

export function computeStatusForWeekly(weekly: WeeklyHours, now: Date = new Date()) {
  const dayIndex = now.getDay(); // 0 Sunday
  const todayKey = dayOrder[dayIndex];
  const today = weekly[todayKey];
  const nowM = now.getHours() * 60 + now.getMinutes();

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
        const entry = weekly[nextDay];
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
      const entry = weekly[nextDay];
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

export function attachKitchenStatus(base: any, kitchenWeekly?: WeeklyHours, now: Date = new Date()) {
  if (!kitchenWeekly) return base;
  const dayIndex = now.getDay();
  const dayOrder: DayKey[] = ['sun','mon','tue','wed','thu','fri','sat'];
  const todayKey = dayOrder[dayIndex];
  const entry = kitchenWeekly[todayKey];
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
