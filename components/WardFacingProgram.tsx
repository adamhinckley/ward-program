/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';
import dynamic from 'next/dynamic';
import TabPanel from '@/components/editor/TabPanel';
import { useState } from 'react';
import AgendaV2 from '@/components/agendaV2';
import FrontPage from '@/components/frontPage';
import { useProgramTheme } from '@/context/ProgramThemeContext';

const Announcements = dynamic(() => import('@/components/announcements'));
const WardContacts = dynamic(() => import('@/components/WardContacts'));
const ProgramNavigationDrawer = dynamic(() => import('./ProgramNavigationDrawer'), {
	ssr: false,
});

const styles = css`
	max-width: 550px;
	margin: 0 auto;
	padding: 0 12px 12px;
	background-color: var(--program-bg);
	color: var(--program-fg);
	min-height: 100dvh;
	font-size: var(--program-font-size);

	.menu-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 0;
		margin-bottom: 4px;
		position: sticky;
		top: 0;
		background-color: var(--program-bg);
		z-index: 2;
	}

	.main-content {
		padding-bottom: 8px;
	}

	.menu-title {
		font-size: 1rem;
		font-weight: 600;
	}

	.menu-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		padding: 0;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: var(--program-fg);
		cursor: pointer;
	}

	.menu-button:hover {
		background-color: rgba(127, 127, 127, 0.16);
	}

	.menu-icon {
		font-size: 2rem;
		line-height: 1;
	}

	.menu-spacer {
		width: 32px;
		height: 32px;
	}

	a {
		color: var(--program-link);
	}

	@media (min-width: 550px) {
		font-size: 1rem;
	}
`;

export type ProgramSection = 'agenda' | 'announcements' | 'contacts';

const sectionLabels: Record<ProgramSection, string> = {
	agenda: 'Agenda',
	announcements: 'Announcements',
	contacts: 'Contacts',
};

const WardFacingProgram = () => {
	const [activeSection, setActiveSection] = useState<ProgramSection>('agenda');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { themeMode, setThemeMode, isThemeHydrated } = useProgramTheme();

	const handleSectionSelect = (section: ProgramSection) => {
		setActiveSection(section);
		setIsMenuOpen(false);
	};

	// Prevent flash of wrong theme during hydration
	if (!isThemeHydrated) {
		return null;
	}

	return (
		<main css={styles}>
			<header className="menu-header">
				<button
					className="menu-button"
					aria-label="Open navigation menu"
					onClick={() => setIsMenuOpen(true)}
				>
					<span className="menu-icon" aria-hidden="true">
						☰
					</span>
				</button>
				<h1 className="menu-title">{sectionLabels[activeSection]}</h1>
				<div className="menu-spacer" aria-hidden="true" />
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

			<div className="main-content">
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
