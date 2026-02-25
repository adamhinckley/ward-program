'use client';

import { useCallback, useEffect, useState } from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import QRCode from 'react-qr-code';
import type { ProgramSection } from '@/components/WardFacingProgram';
import type { ProgramTheme } from '@/context/ProgramThemeContext';

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
	const [currentUrl, setCurrentUrl] = useState<string>('');

	useEffect(() => {
		// Set the current URL
		if (typeof window !== 'undefined') {
			setCurrentUrl(window.location.href);
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
				<nav aria-label="Program sections" style={{ padding: '0 8px' }}>
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
								style={{
									width: '100%',
									textAlign: 'left',
									border: 0,
									borderRadius: 8,
									padding: '10px 12px',
									marginBottom: 4,
									backgroundColor: isSelected
										? drawerSelectedBackground
										: 'transparent',
									color: drawerForeground,
									cursor: 'pointer',
								}}
								onMouseEnter={(event) => {
									if (!isSelected) {
										event.currentTarget.style.backgroundColor =
											drawerHoverBackground;
									}
								}}
								onMouseLeave={(event) => {
									event.currentTarget.style.backgroundColor = isSelected
										? drawerSelectedBackground
										: 'transparent';
								}}
							>
								{sectionLabels[section]}
							</button>
						);
					})}
				</nav>

				<div style={{ padding: '12px 16px' }}>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: 6,
							padding: 6,
							borderRadius: 999,
							backgroundColor: drawerThemeToggleBackground,
						}}
					>
						<button
							type="button"
							onClick={() => setThemeMode('light')}
							aria-label="Switch to light mode"
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 6,
								borderRadius: 999,
								border: 0,
								padding: '8px 10px',
								fontWeight: 600,
								backgroundColor:
									themeMode === 'light'
										? drawerThemeToggleActiveBackground
										: 'transparent',
								color: drawerForeground,
								cursor: 'pointer',
							}}
						>
							<LightModeOutlinedIcon aria-hidden="true" sx={{ fontSize: 16 }} />
							<span style={{ fontSize: 12 }}>Light</span>
						</button>
						<button
							type="button"
							onClick={() => setThemeMode('dark')}
							aria-label="Switch to dark mode"
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 6,
								borderRadius: 999,
								border: 0,
								padding: '8px 10px',
								fontWeight: 600,
								backgroundColor:
									themeMode === 'dark'
										? drawerThemeToggleActiveBackground
										: 'transparent',
								color: drawerForeground,
								cursor: 'pointer',
							}}
						>
							<DarkModeOutlinedIcon aria-hidden="true" sx={{ fontSize: 16 }} />
							<span style={{ fontSize: 12 }}>Dark</span>
						</button>
					</div>
				</div>

				{!isStandalone && (
					<div style={{ padding: '8px 16px 0' }}>
						<button
							type="button"
							onClick={handleAddToHomeScreen}
							// disabled={isStandalone}
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
				{currentUrl && (
					<div
						className={`mt-4 rounded-lg flex flex-col items-center gap-2 px-3 py-3 pb-6 mr-4 ml-4  ${isDarkMode ? 'bg-white/10' : 'bg-black/[0.03]'}`}
					>
						<p className="text-xs m-0 text-center opacity-80">Share with a friend</p>
						<div className="p-2 bg-white rounded">
							<QRCode
								value={currentUrl}
								size={160}
								level="M"
								fgColor="#000000"
								bgColor="#ffffff"
								aria-label="QR code for sharing the app"
							/>
						</div>
					</div>
				)}
			</aside>
		</div>
	);
};

export default ProgramNavigationDrawer;
