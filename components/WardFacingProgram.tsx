'use client';
import dynamic from 'next/dynamic';
import TabPanel from '@/components/editor/TabPanel';
import { useEffect, useState } from 'react';
import AgendaV2 from '@/components/agendaV2';
import FrontPage from '@/components/frontPage';
import { useProgramTheme } from '@/context/ProgramThemeContext';
import { Menu } from 'lucide-react';
import Announcements from '@/components/announcements';
import WardContacts from '@/components/WardContacts';
import { Button } from '@/components/ui/button';

const ProgramNavigationDrawer = dynamic(() => import('./ProgramNavigationDrawer'), {
	ssr: false,
});

export type ProgramSection = 'agenda' | 'announcements' | 'contacts';

const sectionLabels: Record<ProgramSection, string> = {
	agenda: 'Agenda',
	announcements: 'Announcements',
	contacts: 'Contacts',
};

const WardFacingProgram = () => {
	const [activeSection, setActiveSection] = useState<ProgramSection>('agenda');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isHeaderVisible, setIsHeaderVisible] = useState(true);
	const { themeMode, setThemeMode } = useProgramTheme();

	useEffect(() => {
		let previousScrollY = window.scrollY;
		// mobile scroll solution
		const hideHeaderOffset = 64;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// prevent header from hiding on mobile when user is at the top of the page and scroll down and page pops back up to the top
			if (currentScrollY <= 0) {
				setIsHeaderVisible(true);
				previousScrollY = 0;
				return;
			}

			const delta = currentScrollY - previousScrollY;

			if (Math.abs(delta) < 2) {
				return;
			}

			// also for the mobile issue mentioned above
			if (delta > 0 && currentScrollY > hideHeaderOffset) {
				setIsHeaderVisible(false);
			} else {
				setIsHeaderVisible(true);
			}

			previousScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleSectionSelect = (section: ProgramSection) => {
		setActiveSection(section);
		setIsMenuOpen(false);
	};

	return (
		<main className="mx-auto min-h-dvh max-w-[550px] bg-[var(--program-bg)] px-3 pb-3 text-[var(--program-fg)] [font-size:var(--program-font-size)] min-[550px]:text-base [&_a]:text-[var(--program-link)]">
			<header
				className={`sticky top-0 z-[2]  flex items-center justify-between bg-[var(--program-bg)] py-1 transition-transform duration-200 ${
					isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
				}`}
			>
				<Button
					variant="ghost"
					size="icon"
					aria-label="Open navigation menu"
					onClick={() => setIsMenuOpen(true)}
					className="h-8 w-8 rounded-full"
				>
					<Menu className="h-5 w-5 stroke-[2.5]" />
				</Button>
				<h1 className="text-base font-semibold">{sectionLabels[activeSection]}</h1>
				<div className="h-8 w-8" aria-hidden="true" />
			</header>

			<ProgramNavigationDrawer
				isMenuOpen={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				activeSection={activeSection}
				onSectionSelect={handleSectionSelect}
				themeMode={themeMode}
				setThemeMode={setThemeMode}
				sectionLabels={sectionLabels}
			/>

			<div className="pb-2">
				<TabPanel value={activeSection === 'agenda' ? 0 : 1} index={0}>
					<FrontPage />
					<AgendaV2 />
				</TabPanel>
				<TabPanel value={activeSection === 'announcements' ? 0 : 1} index={0}>
					<Announcements />
				</TabPanel>
				<TabPanel value={activeSection === 'contacts' ? 0 : 1} index={0}>
					<WardContacts />
				</TabPanel>
			</div>
		</main>
	);
};

export default WardFacingProgram;
