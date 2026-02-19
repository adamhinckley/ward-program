import type { Metadata } from 'next';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ProgramThemeProvider } from '@/context/ProgramThemeContext';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const themeInitScript = `
(() => {
	try {
		const storageKey = 'ward-program-theme';
		const storedTheme = window.localStorage.getItem(storageKey);
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const resolvedTheme =
			storedTheme === 'light' || storedTheme === 'dark'
				? storedTheme
				: (prefersDark ? 'dark' : 'light');
		document.documentElement.setAttribute('data-program-theme', resolvedTheme);
	} catch (_) {
		// Ignore localStorage/matchMedia access errors.
	}
})();
`;

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: 'Ward Program',
	description: 'Sacrament Meeting Agenda for Florence Ward',
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false,
		},
	},
	openGraph: {
		title: 'Ward Program',
		description: 'Sacrament Meeting Agenda for Florence Ward',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isLocal = process.env.NODE_ENV === 'development';
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body>
				<ProgramThemeProvider>{children}</ProgramThemeProvider>
			</body>
			{!isLocal && process.env.REACT_APP_GA_ID && (
				<GoogleAnalytics gaId={process.env.REACT_APP_GA_ID} />
			)}
		</html>
	);
}
