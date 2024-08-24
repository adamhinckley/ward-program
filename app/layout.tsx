import type { Metadata } from 'next';
import './globals.css';
import { AppContextProvider } from '@/context/AppContext';
import Head from 'next/head';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
	title: 'Ward Program',
	description: 'Sacrament Meeting Agenda for Florence Ward',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isLocal = process.env.NODE_ENV === 'development';
	return (
		<html lang="en">
			<Head>
				<title>{metadata.title as string}</title>
				<meta name="description" content={metadata.description as string} />
				<meta property="og:title" content={metadata.title as string} />
				<meta property="og:description" content={metadata.description as string} />
				<meta property="og:image" content="../assets/florence-ward.png" />
				{/* Step 3: Add og:image meta tag */}
				{/* Add more meta tags as needed */}
			</Head>
			<AppContextProvider>
				<body className="bg-white">{children}</body>
			</AppContextProvider>
			{!isLocal && process.env.REACT_APP_GA_ID && (
				<GoogleAnalytics gaId={process.env.REACT_APP_GA_ID} />
			)}
		</html>
	);
}
