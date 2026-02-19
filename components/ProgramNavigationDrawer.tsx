'use client';

import { useEffect, useState } from 'react';
import type { ProgramSection } from '@/components/WardFacingProgram';
import type { ProgramTheme } from '@/context/ProgramThemeContext';

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

	useEffect(() => {
		setIsClosing(false);
	}, [isMenuOpen]);

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			onClose();
		}, 300);
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

	if (!isMenuOpen && !isClosing) {
		return null;
	}

	const animations = `
		@keyframes drawerBackdropFadeIn {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}

		@keyframes drawerBackdropFadeOut {
			from {
				opacity: 1;
			}
			to {
				opacity: 0;
			}
		}

		@keyframes drawerSlideIn {
			from {
				transform: translateX(-100%);
			}
			to {
				transform: translateX(0);
			}
		}

		@keyframes drawerSlideOut {
			from {
				transform: translateX(0);
			}
			to {
				transform: translateX(-100%);
			}
		}
	`;

	return (
		<>
			<style>{animations}</style>
			<div
				role="presentation"
				onClick={handleClose}
				style={{
					position: 'fixed',
					inset: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.35)',
					zIndex: 30,
					animation: isClosing
						? 'drawerBackdropFadeOut 0.3s ease-out'
						: 'drawerBackdropFadeIn 0.3s ease-out',
				}}
			>
				<aside
					role="dialog"
					aria-label="Program navigation"
					onClick={(event) => event.stopPropagation()}
					style={{
						width: 240,
						height: '100dvh',
						backgroundColor: drawerBackground,
						color: drawerForeground,
						borderRight: `1px solid ${drawerBorder}`,
						padding: '8px 0',
						boxSizing: 'border-box',
						animation: isClosing
							? 'drawerSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
							: 'drawerSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
								<span aria-hidden="true">☀️</span>
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
								<span aria-hidden="true">🌙</span>
								<span style={{ fontSize: 12 }}>Dark</span>
							</button>
						</div>
					</div>
				</aside>
			</div>
		</>
	);
};

export default ProgramNavigationDrawer;
