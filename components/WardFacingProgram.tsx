/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';
import TabPanel from '@/components/editor/TabPanel';
import WardContacts from '@/components/WardContacts';
import {
	Box,
	Drawer,
	IconButton,
	ButtonBase,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useState } from 'react';
import AgendaV2 from '@/components/agendaV2';
import Announcements from '@/components/announcements';
import FrontPage from '@/components/frontPage';
import { useProgramTheme } from '@/context/ProgramThemeContext';

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
		color: var(--program-fg);
	}

	.menu-button:hover {
		background-color: rgba(127, 127, 127, 0.16);
	}

	a {
		color: var(--program-link);
	}

	.MuiPaper-root {
		background-color: var(--program-card-bg);
		color: var(--program-fg);
	}

	@media (min-width: 550px) {
		font-size: 1rem;
	}
`;

type ProgramSection = 'agenda' | 'announcements' | 'contacts';

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

	const isDarkMode = themeMode === 'dark';
	const drawerBackground = isDarkMode ? '#1b1c1f' : '#ffffff';
	const drawerForeground = isDarkMode ? '#f1f1f4' : '#141417';
	const drawerBorder = isDarkMode ? 'rgba(148, 163, 184, 0.28)' : 'rgba(100, 116, 139, 0.25)';
	const drawerSelectedBackground = isDarkMode
		? 'rgba(147, 197, 253, 0.18)'
		: 'rgba(30, 64, 175, 0.1)';
	const drawerHoverBackground = isDarkMode
		? 'rgba(148, 163, 184, 0.14)'
		: 'rgba(15, 23, 42, 0.06)';
	const drawerThemeToggleBackground = isDarkMode
		? 'rgba(148, 163, 184, 0.12)'
		: 'rgba(100, 116, 139, 0.12)';
	const drawerThemeToggleActiveBackground = isDarkMode
		? 'rgba(147, 197, 253, 0.22)'
		: 'rgba(30, 64, 175, 0.12)';

	// Prevent flash of wrong theme during hydration
	if (!isThemeHydrated) {
		return null;
	}

	return (
		<main css={styles}>
			<header className="menu-header">
				<IconButton
					className="menu-button"
					aria-label="Open navigation menu"
					onClick={() => setIsMenuOpen(true)}
					size="small"
				>
					<MenuIcon htmlColor="currentColor" />
				</IconButton>
				<Typography className="menu-title">{sectionLabels[activeSection]}</Typography>
				<Box sx={{ width: 32 }} />
			</header>

			<Drawer
				anchor="left"
				open={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				sx={{
					'& .MuiDrawer-paper': {
						backgroundColor: drawerBackground,
						color: drawerForeground,
						borderRight: `1px solid ${drawerBorder}`,
					},
					'& .MuiDivider-root': {
						borderColor: drawerBorder,
					},
					'& .MuiListItemButton-root:hover': {
						backgroundColor: drawerHoverBackground,
					},
					'& .MuiListItemButton-root.Mui-selected': {
						backgroundColor: drawerSelectedBackground,
					},
					'& .MuiListItemButton-root.Mui-selected:hover': {
						backgroundColor: drawerSelectedBackground,
					},
					'& .MuiInputLabel-root': {
						color: drawerForeground,
					},
					'& .MuiInputLabel-root.Mui-focused': {
						color: drawerForeground,
					},
					'& .MuiOutlinedInput-root': {
						color: drawerForeground,
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: drawerBorder,
					},
					'& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: drawerForeground,
					},
					'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: drawerForeground,
					},
					'& .MuiSelect-icon': {
						color: drawerForeground,
					},
				}}
			>
				<Box sx={{ width: 240 }} role="presentation">
					<List>
						{(Object.keys(sectionLabels) as ProgramSection[]).map((section) => (
							<ListItemButton
								key={section}
								selected={activeSection === section}
								onClick={() => handleSectionSelect(section)}
							>
								<ListItemText primary={sectionLabels[section]} />
							</ListItemButton>
						))}
					</List>
					<Box sx={{ px: 2, display: 'grid', gap: 1.5 }}>
						<Box>
							<Box
								sx={{
									display: 'grid',
									gridTemplateColumns: '1fr 1fr',
									gap: 0.75,
									p: 0.75,
									borderRadius: 999,
									backgroundColor: drawerThemeToggleBackground,
								}}
							>
								<ButtonBase
									onClick={() => setThemeMode('light')}
									aria-label="Switch to light mode"
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 0.5,
										borderRadius: 999,
										py: 0.75,
										px: 1,
										fontWeight: 600,
										color: drawerForeground,
										backgroundColor:
											themeMode === 'light'
												? drawerThemeToggleActiveBackground
												: 'transparent',
									}}
								>
									<LightModeOutlinedIcon fontSize="small" />
									<Typography variant="caption" fontWeight={600}>
										Light
									</Typography>
								</ButtonBase>
								<ButtonBase
									onClick={() => setThemeMode('dark')}
									aria-label="Switch to dark mode"
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 0.5,
										borderRadius: 999,
										py: 0.75,
										px: 1,
										fontWeight: 600,
										color: drawerForeground,
										backgroundColor:
											themeMode === 'dark'
												? drawerThemeToggleActiveBackground
												: 'transparent',
									}}
								>
									<DarkModeOutlinedIcon fontSize="small" />
									<Typography variant="caption" fontWeight={600}>
										Dark
									</Typography>
								</ButtonBase>
							</Box>
						</Box>
					</Box>
				</Box>
			</Drawer>

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
