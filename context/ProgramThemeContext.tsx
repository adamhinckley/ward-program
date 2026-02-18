'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ProgramTheme = 'light' | 'dark';

const STORAGE_KEY = 'ward-program-theme';

type ProgramThemeContextValue = {
	themeMode: ProgramTheme;
	setThemeMode: (theme: ProgramTheme) => void;
	isThemeHydrated: boolean;
};

const ProgramThemeContext = createContext<ProgramThemeContextValue | undefined>(undefined);

export function ProgramThemeProvider({ children }: { children: React.ReactNode }) {
	const [themeMode, setThemeMode] = useState<ProgramTheme>('light');
	const [isThemeHydrated, setIsThemeHydrated] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const storedTheme = window.localStorage.getItem(STORAGE_KEY) as ProgramTheme | null;
		const preferredDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const defaultTheme: ProgramTheme =
			storedTheme === 'light' || storedTheme === 'dark'
				? storedTheme
				: preferredDarkScheme
					? 'dark'
					: 'light';

		setThemeMode(defaultTheme);
		setIsThemeHydrated(true);
	}, []);

	useEffect(() => {
		if (!isThemeHydrated || typeof window === 'undefined') {
			return;
		}

		window.localStorage.setItem(STORAGE_KEY, themeMode);
		document.documentElement.setAttribute('data-program-theme', themeMode);
	}, [themeMode, isThemeHydrated]);

	const value = useMemo(
		() => ({
			themeMode,
			setThemeMode,
			isThemeHydrated,
		}),
		[themeMode, isThemeHydrated],
	);

	return <ProgramThemeContext.Provider value={value}>{children}</ProgramThemeContext.Provider>;
}

export function useProgramTheme() {
	const context = useContext(ProgramThemeContext);

	if (!context) {
		throw new Error('useProgramTheme must be used within a ProgramThemeProvider');
	}

	return context;
}
