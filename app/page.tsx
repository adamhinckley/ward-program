'use client';
import Agenda from './agenda';
import Announcements from './announcements';
import FrontPage from './frontPage';
import PageThree from './pageThree';
import { useAppContext } from '../context/AppContext';
import { Divider } from '@mui/material';
import { AppContextProvider } from '@/context/AppContext';

export default function Home() {
	const { content } = useAppContext();

	if (!content) {
		return <div>Loading...</div>;
	}

	return (
		<main className="max-w-lg m-auto w-full ">
			<AppContextProvider>
				<FrontPage />
				<Agenda />
				<Divider sx={{ margin: '12px 0', borderColor: 'black' }} />
				<Announcements />
			</AppContextProvider>
		</main>
	);
}
