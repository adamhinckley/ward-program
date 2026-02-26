'use client';
/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Menu, Moon, Sun, Loader2, X } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import Leaders from '@/components/editor/leaders';
import Music from '@/components/editor/music';
import Prayers from '@/components/editor/prayers';
import Block from '@/components/editor/block';
import Tiptap from '@/components/editor/Tiptap';
import SaveButton from '@/components/editor/SaveButton';
import { createClient } from '@/utils/supabase/client';
import Settings from '@/components/editor/Settings';
import { useProgramTheme } from '@/context/ProgramThemeContext';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const tabs = [
	{ value: '0', label: 'Settings' },
	{ value: '1', label: 'Leaders' },
	{ value: '2', label: 'Music' },
	{ value: '3', label: 'Prayers' },
	{ value: '4', label: 'Blocks' },
	{ value: '5', label: 'Announcements' },
];

const styles = css`
	background-color: var(--editor-bg);
	color: var(--editor-fg);
	border-radius: 8px;

	.update-banner {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 14px;
		margin-bottom: 12px;
		border-radius: 10px;
		border: 1px solid var(--editor-border);
		background-color: var(--editor-control-bg);
		color: var(--editor-fg);
	}

	.update-banner-title {
		font-size: 0.95rem;
		font-weight: 600;
		margin: 0;
	}

	.update-banner-text {
		font-size: 0.9rem;
		line-height: 1.4;
		margin: 2px 0 0;
		color: var(--editor-tab-inactive);
	}

	.update-banner-link {
		color: var(--editor-link);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.update-banner-dismiss {
		flex-shrink: 0;
		height: 32px;
		width: 32px;
	}

	[role='tablist'] {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;

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

	.theme-toggle-button.is-active {
		background-color: var(--editor-strong-bg);
		color: var(--editor-strong-fg);
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
	const pathname = usePathname();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [showUpdateBanner, setShowUpdateBanner] = useState(true);
	const supabase = createClient();
	const isDemoRoute = pathname?.startsWith('/demo');

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleDismissUpdateBanner = () => {
		setShowUpdateBanner(false);
	};

	if (!isMounted) {
		return null;
	}

	if (!isThemeHydrated) {
		return (
			<div css={loadingStyles}>
				<Loader2 className="h-8 w-8 animate-spin" aria-hidden="true" />
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
				<Sun size={16} />
			</button>
			<button
				type="button"
				className={`theme-toggle-button ${themeMode === 'dark' ? 'is-active' : ''}`}
				onClick={() => setThemeMode('dark')}
				aria-label="Switch to dark mode"
			>
				<Moon size={16} />
			</button>
		</div>
	);

	if (Object.keys(content).length === 0) {
		return (
			<div css={loadingStyles}>
				<Loader2 className="h-8 w-8 animate-spin" aria-hidden="true" />
			</div>
		);
	}

	const handleChange = (e, block, index) => {
		if (block) {
			if (Array.isArray(content[block]) && typeof content[block][0] === 'string') {
				const newBlock = content[block].map((item, i) => {
					if (i === index) {
						return e.target.value;
					}
					return item;
				});
				setContent({ ...content, [block]: newBlock });
			} else {
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
		setContent((previousContent) => ({
			...previousContent,
			[e.target.name]: e.target.checked,
		}));
	};

	const handleAddBlockIndex = (block) => {
		if (block === 'intermediateMusicPerformers') {
			setContent((previousContent) => ({
				...previousContent,
				intermediateMusicPerformers: previousContent.intermediateMusicPerformers.concat(''),
			}));
			return;
		}

		if (!content[block]) {
			setContent((previousContent) => ({
				...previousContent,
				[block]: [{ left: '', right: '' }],
			}));
			return;
		}

		setContent((previousContent) => ({
			...previousContent,
			[block]: [...previousContent[block], { left: '', right: '' }],
		}));
	};

	const handleDeleteBlockIndex = (block, index) => {
		if (block === 'intermediateMusicPerformers') {
			setContent((previousContent) => ({
				...previousContent,
				intermediateMusicPerformers: previousContent.intermediateMusicPerformers.filter(
					(_, i) => i !== index,
				),
			}));
		} else {
			setContent((previousContent) => ({
				...previousContent,
				[block]: previousContent[block].filter((_, i) => i !== index),
			}));
		}
	};

	const handleTabChange = async (tabValue) => {
		const tabNumber = parseInt(tabValue, 10);
		setCurrentTab(tabNumber);
		await supabase
			.from('user-settings')
			.update({ currentTab: tabNumber })
			.eq('id', userData.id)
			.select();
	};

	const handleDrawerButtonClick = async (tabValue) => {
		const tabNumber = parseInt(tabValue, 10);
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
			{showUpdateBanner && !isDemoRoute ? (
				<div className="update-banner" role="status" aria-live="polite">
					<div>
						<p className="update-banner-text">
							We’ve made a major refresh behind the scenes that should make the
							program load faster especially on older devices and slow connections.
							Things feel a little different, but all functionality in the editor
							"should" be the same 😉 If you spot a bug or have a suggestion, email{' '}
							<a
								href="mailto:adamhinckley@mac.com?subject=WARD%20PROGRAM"
								className="update-banner-link"
							>
								adamhinckley@mac.com
							</a>{' '}
							with “WARD PROGRAM” in the subject.
						</p>
					</div>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="update-banner-dismiss"
						onClick={handleDismissUpdateBanner}
						aria-label="Dismiss update message"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			) : null}
			<Tabs value={currentTab.toString()} onValueChange={handleTabChange}>
				<div className="mobile-menu-container">
					<Button
						variant="ghost"
						size="icon"
						className="hamburger"
						onClick={() => setIsDrawerOpen((prev) => !prev)}
					>
						<Menu />
					</Button>
					<div className="toolbar-actions">
						{themeToggle}
						<SaveButton />
					</div>
				</div>
				<div className="desktop-toolbar">
					<TabsList className="tabs">
						{tabs.map((tab) => (
							<TabsTrigger key={tab.value} value={tab.value}>
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
					<div className="toolbar-actions">
						{themeToggle}
						<SaveButton />
					</div>
				</div>
				{isDrawerOpen ? (
					<div
						style={{
							position: 'fixed',
							inset: 0,
							backgroundColor: 'rgba(0, 0, 0, 0.35)',
							zIndex: 40,
						}}
						onClick={() => setIsDrawerOpen(false)}
					>
						<aside
							style={{
								width: 260,
								height: '100dvh',
								backgroundColor: drawerBackground,
								color: drawerForeground,
								borderRight: `1px solid ${drawerBorder}`,
								padding: '8px 0',
								boxSizing: 'border-box',
							}}
							onClick={(event) => event.stopPropagation()}
						>
							<div className="flex justify-end px-3 pb-2">
								<Button
									type="button"
									size="icon"
									variant="ghost"
									onClick={() => setIsDrawerOpen(false)}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
							{tabs.map((tab) => (
								<button
									key={tab.value}
									type="button"
									onClick={() => handleDrawerButtonClick(tab.value)}
									style={{
										width: 'calc(100% - 24px)',
										fontSize: '1.125rem',
										margin: '8px 12px',
										padding: '10px 12px',
										border: 0,
										borderRadius: 8,
										textAlign: 'left',
										backgroundColor:
											currentTab.toString() === tab.value
												? drawerSelectedBackground
												: 'transparent',
										color: drawerForeground,
										cursor: 'pointer',
									}}
									onMouseEnter={(event) => {
										if (currentTab.toString() !== tab.value) {
											event.currentTarget.style.backgroundColor =
												drawerHoverBackground;
										}
									}}
									onMouseLeave={(event) => {
										event.currentTarget.style.backgroundColor =
											currentTab.toString() === tab.value
												? drawerSelectedBackground
												: 'transparent';
									}}
								>
									{tab.label}
								</button>
							))}
						</aside>
					</div>
				) : null}
				<TabsContent value="0">
					<Settings content={content} handleChange={handleChange} />
				</TabsContent>
				<TabsContent value="1">
					<Leaders handleChange={handleChange} />
				</TabsContent>
				<TabsContent value="2">
					<Music
						handleChange={handleChange}
						handleDeleteBlockIndex={handleDeleteBlockIndex}
						handleAddBlockIndex={handleAddBlockIndex}
					/>
				</TabsContent>
				<TabsContent value="3">
					<Prayers
						handleChange={handleChange}
						handleCheckboxChange={handleCheckboxChange}
					/>
				</TabsContent>
				<TabsContent value="4">
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
				</TabsContent>
				<TabsContent value="5">
					<Tiptap />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Editor;
