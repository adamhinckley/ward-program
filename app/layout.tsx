import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
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
	const gaId = process.env.REACT_APP_GA_ID;
	const analyticsDisabled = process.env.NEXT_PUBLIC_DISABLE_ANALYTICS === 'true';
	const shouldLoadAnalytics = !isLocal && !analyticsDisabled && !!gaId;

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
				{shouldLoadAnalytics ? (
					<>
						<Script
							id="ga-loader"
							strategy="lazyOnload"
							src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
						/>
						<Script
							id="ga-init"
							strategy="lazyOnload"
							dangerouslySetInnerHTML={{
								__html: `
									window.dataLayer = window.dataLayer || [];
									function gtag(){dataLayer.push(arguments);}
									gtag('js', new Date());
									gtag('config', '${gaId}');
								`,
							}}
						/>
					</>
				) : null}
			</head>
			<body>
				<ProgramThemeProvider>{children}</ProgramThemeProvider>
			</body>
		</html>
	);
}
