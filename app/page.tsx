'use client';
import Agenda from './agenda';
import Announcements from './announcements';
import FrontPage from './frontPage';
import PageThree from './pageThree';

export default function Home() {
	return (
		<main className="max-w-lg m-auto">
			<FrontPage />
			<Agenda />
			<hr />
			<Announcements />
			<hr />
			<PageThree />
		</main>
	);
}
