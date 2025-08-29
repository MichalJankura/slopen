import React, { useEffect, useMemo, useState } from 'react';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

type FixedHoliday = {
	day: number;
	month: number; // 1-12
	name: string;
};

type MovableHoliday = {
	date: Date;
	name: string;
};

const monthsSk = [
	'január', 'február', 'marec', 'apríl', 'máj', 'jún',
	'júl', 'august', 'september', 'október', 'november', 'december'
];

// Anonymous Gregorian algorithm to compute Easter Sunday (Western) for a given year
function easterSunday(year: number): Date {
	const a = year % 19;
	const b = Math.floor(year / 100);
	const c = year % 100;
	const d = Math.floor(b / 4);
	const e = b % 4;
	const f = Math.floor((b + 8) / 25);
	const g = Math.floor((b - f + 1) / 3);
	const h = (19 * a + b - d - g + 15) % 30;
	const i = Math.floor(c / 4);
	const k = c % 4;
	const l = (32 + 2 * e + 2 * i - h - k) % 7;
	const m = Math.floor((a + 11 * h + 22 * l) / 451);
	const month = Math.floor((h + l - 7 * m + 114) / 31); // 3=March, 4=April
	const day = ((h + l - 7 * m + 114) % 31) + 1;
	return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
	const d = new Date(date);
	d.setDate(d.getDate() + days);
	return d;
}

const fixedHolidays: FixedHoliday[] = [
	// Štátne sviatky
	{ day: 1, month: 1, name: 'Deň vzniku Slovenskej republiky' },
	{ day: 5, month: 7, name: 'Sviatok svätého Cyrila a Metoda' },
	{ day: 29, month: 8, name: 'Výročie SNP' },
	{ day: 1, month: 9, name: 'Deň Ústavy Slovenskej republiky (nie je dňom pracovného pokoja)' },
	{ day: 28, month: 10, name: 'Deň vzniku samostatného česko-slovenského štátu (nie je dňom pracovného pokoja)' },
	{ day: 17, month: 11, name: 'Deň boja za slobodu a demokraciu' },
	// Dni pracovného pokoja
	{ day: 6, month: 1, name: 'Zjavenie Pána (Traja králi)' },
	{ day: 1, month: 5, name: 'Sviatok práce' },
	{ day: 8, month: 5, name: 'Deň víťazstva nad fašizmom' },
	{ day: 15, month: 9, name: 'Sedembolestná Panna Mária' },
	{ day: 1, month: 11, name: 'Sviatok všetkých svätých' },
	{ day: 24, month: 12, name: 'Štedrý deň' },
	{ day: 25, month: 12, name: 'Prvý sviatok vianočný' },
	{ day: 26, month: 12, name: 'Druhý sviatok vianočný' },
];

function formatDateSk(day: number, month: number): string {
	return `${day}. ${monthsSk[month - 1]}`;
}

function useQuery(): URLSearchParams | null {
	if (typeof window === 'undefined') return null;
	return new URLSearchParams(window.location.search);
}

// Core matcher: returns holiday name if the given date is a Slovak holiday.
function getHolidayForDate(date: Date): string | null {
	const y = date.getFullYear();
	const d = date.getDate();
	const m = date.getMonth() + 1;

	// Check fixed holidays
	const fixed = fixedHolidays.find(h => h.day === d && h.month === m);
	if (fixed) return fixed.name;

	// Movable: Good Friday (Veľký piatok) and Easter Monday (Veľkonočný pondelok)
	const easter = easterSunday(y);
	const goodFriday = addDays(easter, -2);
	const easterMonday = addDays(easter, 1);

	if (d === goodFriday.getDate() && m === goodFriday.getMonth() + 1) return 'Veľký piatok';
	if (d === easterMonday.getDate() && m === easterMonday.getMonth() + 1) return 'Veľkonočný pondelok';

	return null;
}

// Netflix-style center overlay
const Overlay: React.FC<{
	title: string;
	subtitle?: string; // backward compat
	holidayName?: string;
	dateText?: string;
	onClose: () => void;
	durationMs?: number;
}> = ({ title, subtitle, holidayName, dateText, onClose, durationMs = 7000 }) => {
	const [visible, setVisible] = useState(true);

	// Lock background scroll while the overlay is visible
	useLockBodyScroll(visible);

	useEffect(() => {
		const t = setTimeout(() => setVisible(false), durationMs);
		return () => clearTimeout(t);
	}, [durationMs]);

	useEffect(() => {
		if (!visible) {
			const t = setTimeout(() => onClose(), 350);
			return () => clearTimeout(t);
		}
	}, [visible, onClose]);

	return (
		<div
			className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'} bg-black/70 backdrop-blur-sm`}
			role="dialog"
			aria-modal="true"
			aria-label="Sviatočné upozornenie"
		>
			<div className="relative w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl rounded-lg overflow-hidden shadow-card">
				{/* red glow border */}
				<div className="absolute inset-0 pointer-events-none ring-1 ring-primary/30" />
				<div className="bg-gradient-to-b from-dark to-black text-white">
					<div className="px-6 sm:px-10 md:px-14 lg:px-20 pt-8 md:pt-12 pb-6 md:pb-10 text-center">
						<h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
							<span className="text-primary drop-shadow-[0_0_20px_rgba(229,9,20,0.5)]">{title}</span>
						</h2>
						{/* Prefer new props if provided; fallback to legacy subtitle */}
						{holidayName ? (
							<>
								<h3 className="mt-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
									{holidayName}
								</h3>
								{dateText && (
									<p className="mt-2 text-base sm:text-lg md:text-xl text-neutral-300">{dateText}</p>
								)}
							</>
						) : (
							subtitle && (
								<p className="mt-4 text-base sm:text-lg md:text-xl text-neutral-300">{subtitle}</p>
							)
						)}
						<p className="mt-6 md:mt-8 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary drop-shadow-[0_0_20px_rgba(229,9,20,0.5)]">
							Otváracie hodiny podnikov je potrebné si overiť na ich Facebookovom a Instagramovom profile.
						</p>
					</div>
					<div className="px-6 sm:px-10 md:px-14 lg:px-20 pb-6 md:pb-10 flex items-center justify-center gap-3">
						<button
							onClick={() => setVisible(false)}
							className="inline-flex items-center gap-2 rounded bg-primary hover:bg-accent transition-colors text-white font-semibold px-6 md:px-7 lg:px-8 py-2.5 md:py-3 text-base md:text-lg shadow-md"
							aria-label="Zavrieť upozornenie"
						>
							OK
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

// Small dev/test panel to set a manual day/month override (keeps current year)
const TestPanel: React.FC<{
	value: { day: number | null; month: number | null };
	onChange: (v: { day: number | null; month: number | null }) => void;
}> = ({ value, onChange }) => {
	const year = new Date().getFullYear();
	const m = value.month ?? (new Date().getMonth() + 1);
	const maxDay = daysInMonth(m, year);
	const dayOptions = Array.from({ length: maxDay }, (_, i) => i + 1);
	const monthOptions = monthsSk.map((label, idx) => ({ label, value: idx + 1 }));

	return (
		<div className="fixed left-4 bottom-4 z-[61] bg-black/80 backdrop-blur text-white rounded-lg shadow-card border border-white/10 p-3 sm:p-4">
			<div className="text-xs mb-2 opacity-80">Test sviatku (iba lokálne)</div>
			<div className="flex items-center gap-2">
				<select
					className="bg-black/60 border border-white/10 rounded px-2 py-1 text-sm"
					value={m}
					onChange={(e) => onChange({ day: null, month: Number(e.target.value) })}
				>
					{monthOptions.map(o => (
						<option key={o.value} value={o.value}>{o.label}</option>
					))}
				</select>
				<select
					className="bg-black/60 border border-white/10 rounded px-2 py-1 text-sm"
					value={value.day ?? ''}
					onChange={(e) => onChange({ day: Number(e.target.value), month: m })}
				>
					<option value="" disabled>deň</option>
					{dayOptions.map(d => (
						<option key={d} value={d}>{d}</option>
					))}
				</select>
			</div>
			<div className="mt-2 text-[11px] text-white/70">Rok: {year} (fixný)</div>
		</div>
	);
};

const Holiday: React.FC = () => {
	const query = useQuery();
	const [debugEnabled, setDebugEnabled] = useState<boolean>(() => {
		if (typeof window === 'undefined') return false;
		const qp = new URLSearchParams(window.location.search);
		return (import.meta as any).env?.DEV || qp.get('holidayTest') === '1';
	});

	// Manual override from UI (day/month) – uses current year
	const [manual, setManual] = useState<{ day: number | null; month: number | null }>({ day: null, month: null });

	// Optional query param override: ?date=YYYY-MM-DD (convenience)
	const queryDate: Date | null = useMemo(() => {
		const raw = query?.get('date');
		if (!raw) return null;
		const d = new Date(raw);
		return isNaN(d.getTime()) ? null : d;
	}, [query]);

	// Effective date we check
	const effectiveDate: Date = useMemo(() => {
		const now = new Date();
		if (manual.day && manual.month) return new Date(now.getFullYear(), manual.month - 1, manual.day);
		if (queryDate) return new Date(now.getFullYear(), queryDate.getMonth(), queryDate.getDate());
		return now;
	}, [manual, queryDate]);

	const todayHolidayName = useMemo(() => getHolidayForDate(effectiveDate), [effectiveDate]);
	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		setShow(Boolean(todayHolidayName));
	}, [todayHolidayName]);

	if (!show) {
		// Testing banner disabled
		// return debugEnabled ? (
		// 	<TestPanel value={manual} onChange={setManual} />
		// ) : null;
		return null;
	}

		const day = effectiveDate.getDate();
		const month = effectiveDate.getMonth() + 1;
		const holidayName = todayHolidayName ?? '';
		const dateText = formatDateSk(day, month);

	return (
		<>
			<Overlay title="Dnes je sviatok" holidayName={holidayName} dateText={dateText} onClose={() => setShow(false)} />
			{/* Testing banner disabled */}
			{/* {debugEnabled && <TestPanel value={manual} onChange={setManual} />} */}
		</>
	);
};

export default Holiday;

