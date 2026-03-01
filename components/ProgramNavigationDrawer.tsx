'use client';

import { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import type { ProgramSection } from '@/components/WardFacingProgram';
import type { ProgramTheme } from '@/context/ProgramThemeContext';
import { cn } from '@/lib/utils';
import { LAST_PROGRAM_ID_STORAGE_KEY } from './MissingWardData';
import { getWardIdFromLocation } from '@/utils/wardUrl';
import ShareQrCard from './ShareQrCard';

type BeforeInstallPromptEvent = Event & {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type ProgramNavigationDrawerProps = {
	isMenuOpen: boolean;
	onClose: () => void;
	activeSection: ProgramSection;
	onSectionSelect: (section: ProgramSection) => void;
	themeMode: ProgramTheme;
	setThemeMode: (theme: ProgramTheme) => void;
	sectionLabels: Record<ProgramSection, string>;
};

const ProgramNavigationDrawer = ({
	isMenuOpen,
	onClose,
	activeSection,
	onSectionSelect,
	themeMode,
	setThemeMode,
	sectionLabels,
}: ProgramNavigationDrawerProps) => {
	const [isClosing, setIsClosing] = useState(false);
	const [deferredInstallPrompt, setDeferredInstallPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [isStandalone, setIsStandalone] = useState(false);
	const [installNotice, setInstallNotice] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}
		try {
			const id = getWardIdFromLocation(window.location);
			if (!id) {
				return;
			}
			window.localStorage.setItem(LAST_PROGRAM_ID_STORAGE_KEY, id);
		} catch {
			// Fail silently if storage is unavailable or access throws
			console.warn('Unable to access localStorage to save last program ID.');
		}
	}, []);

	useEffect(() => {
		setIsClosing(false);
	}, [isMenuOpen]);

	const handleClose = useCallback(() => {
		if (isClosing) {
			return;
		}

		setIsClosing(true);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [isClosing, onClose]);

	useEffect(() => {
		if (!isMenuOpen) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isMenuOpen, handleClose]);

	useEffect(() => {
		const checkStandaloneMode = () => {
			const standaloneByDisplayMode = window.matchMedia('(display-mode: standalone)').matches;
			const standaloneByNavigator =
				'standalone' in window.navigator &&
				Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);

			setIsStandalone(standaloneByDisplayMode || standaloneByNavigator);
		};

		const displayModeQuery = window.matchMedia('(display-mode: standalone)');
		const onDisplayModeChange = () => checkStandaloneMode();

		const onBeforeInstallPrompt = (event: Event) => {
			const installPromptEvent = event as BeforeInstallPromptEvent;
			installPromptEvent.preventDefault();
			setDeferredInstallPrompt(installPromptEvent);
		};

		const onAppInstalled = () => {
			setDeferredInstallPrompt(null);
			setIsStandalone(true);
			setInstallNotice('Added to home screen.');
		};

		checkStandaloneMode();
		displayModeQuery.addEventListener('change', onDisplayModeChange);
		window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
		window.addEventListener('appinstalled', onAppInstalled);

		return () => {
			displayModeQuery.removeEventListener('change', onDisplayModeChange);
			window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
			window.removeEventListener('appinstalled', onAppInstalled);
		};
	}, []);

	const handleAddToHomeScreen = useCallback(async () => {
		if (isStandalone) {
			setInstallNotice('Already on your home screen.');
			return;
		}

		if (deferredInstallPrompt) {
			await deferredInstallPrompt.prompt();
			const { outcome } = await deferredInstallPrompt.userChoice;

			setInstallNotice(outcome === 'accepted' ? 'Installing app…' : 'Install canceled.');
			setDeferredInstallPrompt(null);
			return;
		}

		const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
		if (isIOS) {
			setInstallNotice('On iPhone, tap Share then “Add to Home Screen”.');
			return;
		}

		setInstallNotice('Use your browser menu and choose “Install app” or “Add to home screen”.');
	}, [deferredInstallPrompt, isStandalone]);

	const isDarkMode = themeMode === 'dark';
	const drawerBackground = isDarkMode ? '#1b1c1f' : '#ffffff';
	const drawerForeground = isDarkMode ? '#f1f1f4' : '#141417';
	const drawerBorder = isDarkMode ? 'rgba(148, 163, 184, 0.28)' : 'rgba(100, 116, 139, 0.25)';
	const drawerUtilityButtonBackground = isDarkMode
		? 'rgba(148, 163, 184, 0.12)'
		: 'rgba(100, 116, 139, 0.1)';

	if (!isMenuOpen && !isClosing) {
		return null;
	}

	return (
		<div
			role="presentation"
			onClick={handleClose}
			className={`${isClosing ? 'animate-drawer-backdrop-out' : 'animate-drawer-backdrop-in'} [animation-fill-mode:forwards]`}
			style={{
				position: 'fixed',
				inset: 0,
				backgroundColor: 'rgba(0, 0, 0, 0.35)',
				zIndex: 30,
			}}
		>
			<aside
				role="dialog"
				aria-label="Program navigation"
				onClick={(event) => event.stopPropagation()}
				className={`${isClosing ? 'animate-drawer-slide-out' : 'animate-drawer-slide-in'} [animation-fill-mode:forwards]`}
				style={{
					width: 240,
					height: '100dvh',
					backgroundColor: drawerBackground,
					color: drawerForeground,
					borderRight: `1px solid ${drawerBorder}`,
					padding: '8px 0',
					boxSizing: 'border-box',
				}}
			>
				<nav aria-label="Program sections" className="px-2">
					{(Object.keys(sectionLabels) as ProgramSection[]).map((section) => {
						const isSelected = activeSection === section;
						return (
							<button
								key={section}
								type="button"
								onClick={() => {
									onSectionSelect(section);
									handleClose();
								}}
								className={cn(
									'w-full text-left border-0 rounded-lg px-3 py-2.5 mb-1 text-inherit cursor-pointer bg-transparent',
									isSelected
										? isDarkMode
											? 'bg-[rgba(147,197,253,0.18)]'
											: 'bg-[rgba(30,64,175,0.10)]'
										: isDarkMode
											? '[@media(hover:hover)]:hover:bg-[rgba(148,163,184,0.14)]'
											: '[@media(hover:hover)]:hover:bg-[rgba(15,23,42,0.06)]',
								)}
							>
								{sectionLabels[section]}
							</button>
						);
					})}
				</nav>

				<div className="px-4 py-3">
					<div
						className={cn(
							'grid grid-cols-2 gap-1.5 p-1.5 rounded-full',
							isDarkMode
								? 'bg-[rgba(148,163,184,0.12)]'
								: 'bg-[rgba(100,116,139,0.12)]',
						)}
					>
						<button
							type="button"
							onClick={() => setThemeMode('light')}
							aria-label="Switch to light mode"
							className={cn(
								'flex items-center justify-center gap-1.5 rounded-full border-0 px-2.5 py-2 font-semibold text-inherit cursor-pointer',
								themeMode === 'light'
									? isDarkMode
										? 'bg-[rgba(147,197,253,0.22)]'
										: 'bg-[rgba(30,64,175,0.12)]'
									: 'bg-transparent',
							)}
						>
							<Sun aria-hidden="true" size={16} />
							<span className="text-xs">Light</span>
						</button>
						<button
							type="button"
							onClick={() => setThemeMode('dark')}
							aria-label="Switch to dark mode"
							className={cn(
								'flex items-center justify-center gap-1.5 rounded-full border-0 px-2.5 py-2 font-semibold text-inherit cursor-pointer',
								themeMode === 'dark'
									? isDarkMode
										? 'bg-[rgba(147,197,253,0.22)]'
										: 'bg-[rgba(30,64,175,0.12)]'
									: 'bg-transparent',
							)}
						>
							<Moon aria-hidden="true" size={16} />
							<span className="text-xs">Dark</span>
						</button>
					</div>
				</div>

				{!isStandalone && (
					<div style={{ padding: '8px 16px 0' }}>
						<button
							type="button"
							onClick={handleAddToHomeScreen}
							aria-label="Add this app to your home screen"
							style={{
								width: '100%',
								border: 0,
								borderRadius: 8,
								padding: '10px 12px',
								fontWeight: 600,
								backgroundColor: drawerUtilityButtonBackground,
								color: drawerForeground,
								cursor: isStandalone ? 'not-allowed' : 'pointer',
								opacity: isStandalone ? 0.65 : 1,
							}}
						>
							Add to Home Screen
						</button>
						{installNotice ? (
							<p
								style={{
									marginTop: 8,
									fontSize: 12,
									lineHeight: 1.4,
								}}
							>
								{installNotice}
							</p>
						) : null}
					</div>
				)}
				<ShareQrCard isDarkMode={isDarkMode} />
			</aside>
		</div>
	);
};

export default ProgramNavigationDrawer;
