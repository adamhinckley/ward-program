'use client';
import { useProgramTheme } from '@/context/ProgramThemeContext';

interface AuthLayoutProps {
	children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
	const { isThemeHydrated } = useProgramTheme();

	if (!isThemeHydrated) {
		return null;
	}

	return (
		<div className="min-h-screen bg-[var(--editor-bg)] text-[var(--editor-fg)]">
			<div className="mx-auto mt-40 flex max-w-md flex-col gap-2 p-8 [&_.message-box]:mt-4 [&_.message-box]:rounded [&_.message-box]:border [&_.message-box]:border-[var(--editor-border)] [&_.message-box]:bg-[var(--editor-muted-bg)] [&_.message-box]:p-4 [&_.message-box]:text-[var(--editor-fg)] [&_a]:text-[var(--editor-link)] [&_a:hover]:underline [&_button]:bg-[var(--editor-strong-bg)] [&_button]:text-[var(--editor-strong-fg)] [&_button:hover]:bg-[var(--editor-strong-bg)] [&_button:hover]:opacity-90 [&_h1]:text-[var(--editor-fg)] [&_p]:text-[var(--editor-fg)]">
				{children}
			</div>
		</div>
	);
}
