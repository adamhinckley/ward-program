'use client';
/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useAppContext } from '@/context/AppContext';
import Leaders from '@/components/editor/leaders';
import Music from '@/components/editor/music';
import Prayers from '@/components/editor/prayers';
import Block from '@/components/editor/block';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Tiptap from '@/components/editor/Tiptap';
import SaveButton from '@/components/editor/SaveButton';
import TabPanel from '@/components/editor/TabPanel';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { createClient } from '@/utils/supabase/client';
import Settings from '@/components/editor/Settings';
import { useProgramTheme } from '@/context/ProgramThemeContext';

const styles = css`
	background-color: var(--editor-bg);
	color: var(--editor-fg);
	border-radius: 8px;

	.MuiTabs-flexContainer {
		justify-content: space-between;
	}

	.MuiTab-root {
		color: var(--editor-tab-inactive);
	}

	.MuiTab-root.Mui-selected {
		color: var(--editor-tab-active);
	}

	.MuiInputLabel-root,
	.MuiFormLabel-root {
		color: var(--editor-tab-inactive);
	}

	.MuiInputLabel-root.Mui-focused,
	.MuiFormLabel-root.Mui-focused {
		color: var(--editor-tab-active);
	}

	.MuiInputBase-root,
	.MuiOutlinedInput-root {
		color: var(--editor-fg);
		background-color: var(--editor-control-bg);
	}

	.MuiOutlinedInput-notchedOutline {
		border-color: var(--editor-border);
	}

	.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline,
	.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
		border-color: var(--editor-tab-active);
	}

	.MuiSvgIcon-root {
		color: currentColor;
	}

	.tabs {
		// display none below 750 px
		@media (max-width: 750px) {
			display: none;
		}
	}

	.mobile-menu-container {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		gap: 8px;

		@media (min-width: 751px) {
			display: none;
		}
		.hamburger {
			width: 40px;
			height: 40px;
			background-color: transparent;
			color: var(--editor-fg);

			.MuiSvgIcon-root {
				fill: currentColor;
			}
		}
	}

	.toolbar-actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.desktop-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		width: 100%;

		.tabs {
			flex: 1;
			min-width: 0;
		}

		@media (max-width: 750px) {
			display: none;
		}
	}

	.theme-toggle {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4px;
		padding: 4px;
		border-radius: 999px;
		background-color: var(--editor-muted-bg);
	}

	.theme-toggle-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		border-radius: 999px;
		padding: 6px 10px;
		border: 0;
		background-color: transparent;
		color: var(--editor-fg);
		cursor: pointer;
		white-space: nowrap;
	}

	.theme-toggle-label {
		display: inline;
	}

	@media (max-width: 960px) {
		.theme-toggle-label {
			display: none;
		}

		.theme-toggle-button {
			padding: 6px 8px;
		}
	}

	.theme-toggle-button.is-active {
		background-color: var(--editor-strong-bg);
		color: var(--editor-strong-fg);
	}

	.drawer {
		button {
			font-size: 1.5rem;
		}
	}

	.Mui-selected.Mui-selected {
		color: var(--editor-tab-active);
	}

	.MuiTabs-indicator {
		background-color: var(--editor-tab-active);
	}
`;

const loadingStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Editor = () => {
	const { content, setContent, currentTab, setCurrentTab, userData } = useAppContext();
	const { themeMode, setThemeMode, isThemeHydrated } = useProgramTheme();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const supabase = createClient();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	if (!isThemeHydrated) {
		return (
			<div css={loadingStyles}>
				<CircularProgress />
			</div>
		);
	}

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

	const themeToggle = (
		<div className="theme-toggle" role="group" aria-label="Theme selector">
			<button
				type="button"
				className={`theme-toggle-button ${themeMode === 'light' ? 'is-active' : ''}`}
				onClick={() => setThemeMode('light')}
				aria-label="Switch to light mode"
			>
				<LightModeOutlinedIcon fontSize="small" />
				{/* <span className="theme-toggle-label">Light</span> */}
			</button>
			<button
				type="button"
				className={`theme-toggle-button ${themeMode === 'dark' ? 'is-active' : ''}`}
				onClick={() => setThemeMode('dark')}
				aria-label="Switch to dark mode"
			>
				<DarkModeOutlinedIcon fontSize="small" />
				{/* <span className="theme-toggle-label">Dark</span> */}
			</button>
		</div>
	);

	// return loading if content is not available
	// check if content is an empty object
	if (Object.keys(content).length === 0) {
		return (
			<div css={loadingStyles}>
				<CircularProgress />
			</div>
		);
	}
	/**
	 *
	 * @param {*} e
	 * @param {string}
	 * @param {*} index
	 * @returns
	 */

	const handleChange = (e, block, index) => {
		if (block) {
			if (Array.isArray(content[block]) && typeof content[block][0] === 'string') {
				// Check if content[block] is an array of strings
				const newBlock = content[block].map((item, i) => {
					if (i === index) {
						return e.target.value; // Update the string at the specified index
					}
					return item;
				});
				setContent({ ...content, [block]: newBlock });
			} else {
				// Existing logic for an array of objects
				const newBlock = content[block].map((block, i) => {
					if (i === index) {
						return { ...block, [e.target.name]: e.target.value };
					}
					return block;
				});
				setContent({ ...content, [block]: newBlock });
			}
			return;
		}
		setContent({ ...content, [e.target.name]: e.target.value });
	};

	const handleCheckboxChange = (e) => {
		setContent({ ...content, [e.target.name]: e.target.checked });
	};

	const handleAddBlockIndex = (block) => {
		if (block === 'intermediateMusicPerformers') {
			const newPerformer = content.intermediateMusicPerformers.concat('');
			setContent({ ...content, intermediateMusicPerformers: newPerformer });
			return;
		}

		// add block array to content if it doesn't exist
		if (!content[block]) {
			setContent({ ...content, [block]: [{ left: '', right: '' }] });
			return;
		}

		setContent({ ...content, [block]: [...content[block], { left: '', right: '' }] });
	};

	const handleDeleteBlockIndex = (block, index) => {
		if (block === 'intermediateMusicPerformers') {
			const newPerformers = content.intermediateMusicPerformers.filter((_, i) => i !== index);
			setContent({ ...content, intermediateMusicPerformers: newPerformers });
		} else {
			const newBlock = content[block].filter((_, i) => i !== index);
			setContent({ ...content, [block]: newBlock });
		}
	};

	const a11yProps = (index) => {
		return {
			id: `tab-${index}`,
			'aria-controls': `tabpanel-${index}`,
		};
	};

	const handleTabChange = async (_, tabNumber) => {
		setCurrentTab(tabNumber);
		await supabase
			.from('user-settings')
			.update({ currentTab: tabNumber })
			.eq('id', userData.id)
			.select();
	};

	const handleDrawerButtonClick = async (tabNumber) => {
		setIsDrawerOpen(false);
		setCurrentTab(tabNumber);
		await supabase
			.from('user-settings')
			.update({ currentTab: tabNumber })
			.eq('id', userData.id)
			.select();
	};

	return (
		<div className="max-w-4xl flex justify-center flex-col m-auto p-4" css={styles}>
			<div className="mobile-menu-container">
				<IconButton className="hamburger" onClick={() => setIsDrawerOpen((prev) => !prev)}>
					<MenuIcon />
				</IconButton>
				<div className="toolbar-actions">
					{themeToggle}
					<SaveButton />
				</div>
			</div>
			<div className="desktop-toolbar">
				<Tabs
					value={currentTab}
					onChange={handleTabChange}
					aria-label="order customizer module tabs"
					className="tabs"
				>
					<Tab label="Settings" {...a11yProps(0)} />
					<Tab label="Leaders" {...a11yProps(1)} />
					<Tab label="Music" {...a11yProps(2)} />
					<Tab label="Prayers" {...a11yProps(3)} />
					<Tab label="Blocks" {...a11yProps(4)} />
					<Tab label="Announcements" {...a11yProps(5)} />
				</Tabs>
				<div className="toolbar-actions">
					{themeToggle}
					<SaveButton />
				</div>
			</div>
			<Drawer
				anchor="left"
				open={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
				className="drawer"
				// add styles to drawer
				sx={{
					'& .MuiDrawer-paper': {
						backgroundColor: drawerBackground,
						color: drawerForeground,
						borderRight: `1px solid ${drawerBorder}`,
					},
					button: {
						fontSize: '1.125rem',
						borderRadius: '0',
						margin: '12px 20px',
						justifyContent: 'flex-start',
						color: drawerForeground,
						'&:hover': {
							backgroundColor: drawerHoverBackground,
						},
					},
				}}
			>
				<Button
					variant="text"
					onClick={() => handleDrawerButtonClick(0)}
					sx={{
						borderBottom: currentTab === 0 ? `2px solid ${drawerForeground}` : '',
						backgroundColor:
							currentTab === 0 ? drawerSelectedBackground : 'transparent',
					}}
				>
					Settings
				</Button>
				<Button
					variant="text"
					color="primary"
					onClick={() => handleDrawerButtonClick(1)}
					sx={{
						borderBottom: currentTab === 1 ? `2px solid ${drawerForeground}` : '',
						backgroundColor:
							currentTab === 1 ? drawerSelectedBackground : 'transparent',
					}}
				>
					Leaders
				</Button>
				<Button
					variant="text"
					color="primary"
					onClick={() => handleDrawerButtonClick(2)}
					sx={{
						borderBottom: currentTab === 2 ? `2px solid ${drawerForeground}` : '',
						backgroundColor:
							currentTab === 2 ? drawerSelectedBackground : 'transparent',
					}}
				>
					Music
				</Button>
				<Button
					variant="text"
					color="primary"
					onClick={() => handleDrawerButtonClick(3)}
					sx={{
						borderBottom: currentTab === 3 ? `2px solid ${drawerForeground}` : '',
						backgroundColor:
							currentTab === 3 ? drawerSelectedBackground : 'transparent',
					}}
				>
					Prayers
				</Button>
				<Button
					variant="text"
					color="primary"
					onClick={() => handleDrawerButtonClick(4)}
					sx={{
						borderBottom: currentTab === 4 ? `2px solid ${drawerForeground}` : '',
						backgroundColor:
							currentTab === 4 ? drawerSelectedBackground : 'transparent',
					}}
				>
					Blocks
				</Button>
				<Button
					variant="text"
					color="primary"
					onClick={() => handleDrawerButtonClick(5)}
					sx={{
						borderBottom: currentTab === 5 ? `2px solid ${drawerForeground}` : '',
						backgroundColor:
							currentTab === 5 ? drawerSelectedBackground : 'transparent',
					}}
				>
					Announcements
				</Button>
			</Drawer>
			<TabPanel value={currentTab} index={0}>
				<Settings content={content} handleChange={handleChange} />
			</TabPanel>
			<TabPanel value={currentTab} index={1}>
				<Leaders handleChange={handleChange} />
			</TabPanel>
			<TabPanel value={currentTab} index={2}>
				<Music
					handleChange={handleChange}
					handleDeleteBlockIndex={handleDeleteBlockIndex}
					handleAddBlockIndex={handleAddBlockIndex}
				/>
			</TabPanel>
			<TabPanel value={currentTab} index={3}>
				<Prayers handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} />
			</TabPanel>
			<TabPanel value={currentTab} index={4}>
				<Block
					handleChange={handleChange}
					handleDeleteBlockIndex={handleDeleteBlockIndex}
					handleAddBlockIndex={handleAddBlockIndex}
					blockName="blockOne"
				/>
				<Block
					handleChange={handleChange}
					handleDeleteBlockIndex={handleDeleteBlockIndex}
					handleAddBlockIndex={handleAddBlockIndex}
					blockName="blockTwo"
				/>
				<Block
					handleChange={handleChange}
					handleDeleteBlockIndex={handleDeleteBlockIndex}
					handleAddBlockIndex={handleAddBlockIndex}
					blockName="blockThree"
				/>
				<Block
					handleChange={handleChange}
					handleDeleteBlockIndex={handleDeleteBlockIndex}
					handleAddBlockIndex={handleAddBlockIndex}
					blockName="wardContacts"
				/>
			</TabPanel>
			<TabPanel value={currentTab} index={5}>
				<Tiptap />
			</TabPanel>
		</div>
	);
};

export default Editor;
