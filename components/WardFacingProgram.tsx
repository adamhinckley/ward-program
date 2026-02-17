/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TabPanel from '@/components/editor/TabPanel';
import WardContacts from '@/components/WardContacts';
import {
	Box,
	Divider,
	Drawer,
	FormControl,
	IconButton,
	ButtonBase,
	InputLabel,
	List,
	ListItemButton,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useEffect, useMemo, useState } from 'react';
import Agenda from '@/components/agenda';
import AgendaV2 from '@/components/agendaV2';
import Announcements from '@/components/announcements';
import FrontPage from '@/components/frontPage';

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
type ProgramTheme = 'light' | 'dark';
type ProgramLayout = 'legacy' | 'updated';
type ProgramFontSize = 'small' | 'medium' | 'large';

const sectionLabels: Record<ProgramSection, string> = {
	agenda: 'Agenda',
	announcements: 'Announcements',
	contacts: 'Contacts',
};

const fontSizeMap: Record<ProgramFontSize, string> = {
	small: '14px',
	medium: '16px',
	large: '18px',
};

const storageKeys = {
	theme: 'ward-program-theme',
	layout: 'ward-program-layout',
	fontSize: 'ward-program-font-size',
} as const;

const storedTheme = window.localStorage.getItem(storageKeys.theme) as ProgramTheme | 'light';
const storedLayout = window.localStorage.getItem(storageKeys.layout) as ProgramLayout | '';
const preferredDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme: ProgramTheme =
	storedTheme === 'light' || storedTheme === 'dark'
		? storedTheme
		: preferredDarkScheme
			? 'dark'
			: 'light';

const defaultLayout: ProgramLayout =
	storedLayout === 'legacy' || storedLayout === 'updated' ? storedLayout : 'updated';
const WardFacingProgram = () => {
	const [activeSection, setActiveSection] = useState<ProgramSection>('agenda');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [themeMode, setThemeMode] = useState<ProgramTheme>(defaultTheme);
	const [layoutMode, setLayoutMode] = useState<ProgramLayout>(defaultLayout);
	const [fontSize, setFontSize] = useState<ProgramFontSize>('medium');

	console.log('themeMode', themeMode);

	console.log('layoutMode', layoutMode);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const storedLayout = window.localStorage.getItem(
			storageKeys.layout,
		) as ProgramLayout | null;
		const storedFontSize = window.localStorage.getItem(
			storageKeys.fontSize,
		) as ProgramFontSize | null;

		if (storedTheme === 'light' || storedTheme === 'dark') {
			setThemeMode(storedTheme);
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setThemeMode('dark');
		}

		if (storedLayout === 'legacy' || storedLayout === 'updated') {
			setLayoutMode(storedLayout);
		}

		if (
			storedFontSize === 'small' ||
			storedFontSize === 'medium' ||
			storedFontSize === 'large'
		) {
			setFontSize(storedFontSize);
		}
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(storageKeys.theme, themeMode);
		}
	}, [themeMode]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(storageKeys.layout, layoutMode);
		}
	}, [layoutMode]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(storageKeys.fontSize, fontSize);
		}
	}, [fontSize]);

	const themeVars = useMemo(
		() =>
			({
				'--program-bg': themeMode === 'dark' ? '#111214' : '#ffffff',
				'--program-fg': themeMode === 'dark' ? '#f1f1f4' : '#141417',
				'--program-card-bg': themeMode === 'dark' ? '#1b1c1f' : '#ffffff',
				'--program-panel-bg': themeMode === 'dark' ? '#17181b' : '#fbfcff',
				'--program-panel-border':
					themeMode === 'dark' ? 'rgba(144, 164, 174, 0.28)' : 'rgba(51, 65, 85, 0.18)',
				'--program-group-bg':
					themeMode === 'dark' ? 'rgba(30, 41, 59, 0.58)' : 'rgba(226, 232, 240, 0.62)',
				'--program-group-border':
					themeMode === 'dark'
						? 'rgba(148, 163, 184, 0.32)'
						: 'rgba(100, 116, 139, 0.28)',
				'--program-link': themeMode === 'dark' ? '#93c5fd' : '#1e40af',
				'--program-font-size': fontSizeMap[fontSize],
			}) as React.CSSProperties,
		[themeMode, fontSize],
	);

	const handleSectionSelect = (section: ProgramSection) => {
		setActiveSection(section);
		setIsMenuOpen(false);
	};

	const handleLayoutChange = (event: SelectChangeEvent) => {
		setLayoutMode(event.target.value as ProgramLayout);
	};

	const handleFontSizeChange = (event: SelectChangeEvent) => {
		setFontSize(event.target.value as ProgramFontSize);
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

	console.log('isMenuOpen', isMenuOpen);

	return (
		<main css={styles} style={themeVars}>
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
					<Divider />
					<Box sx={{ p: 2, display: 'grid', gap: 1.5 }}>
						<Typography variant="subtitle2" fontWeight={600}>
							Display Settings
						</Typography>
						<FormControl size="small" fullWidth>
							<InputLabel id="layout-mode-label">Layout</InputLabel>
							<Select
								labelId="layout-mode-label"
								value={layoutMode}
								label="Layout"
								onChange={handleLayoutChange}
							>
								<MenuItem value="legacy">Legacy</MenuItem>
								<MenuItem value="updated">Updated</MenuItem>
							</Select>
						</FormControl>
						<Box>
							<Typography variant="body2" fontWeight={500} mb={0.75}>
								Theme
							</Typography>
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
						<FormControl size="small" fullWidth>
							<InputLabel id="font-size-label">Font Size</InputLabel>
							<Select
								labelId="font-size-label"
								value={fontSize}
								label="Font Size"
								onChange={handleFontSizeChange}
							>
								<MenuItem value="small">Small</MenuItem>
								<MenuItem value="medium">Medium</MenuItem>
								<MenuItem value="large">Large</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Box>
			</Drawer>

			<div className="main-content">
				<TabPanel value={activeSection === 'agenda' ? 0 : 1} index={0}>
					<FrontPage />
					{layoutMode === 'updated' ? <AgendaV2 /> : <Agenda />}
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
