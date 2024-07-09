import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppContextProvider } from '@/context/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Ward Program',
	description: 'Sacrament Meeting Agenda for Florence Ward',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<AppContextProvider>
				<body className={inter.className}>{children}</body>
			</AppContextProvider>
		</html>
	);
}
