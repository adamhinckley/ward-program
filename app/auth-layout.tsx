'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useProgramTheme } from '@/context/ProgramThemeContext';

const authStyles = css`
	background-color: var(--editor-bg);
	color: var(--editor-fg);
	min-height: 100vh;

	.auth-container {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		margin: 0 auto;
		max-width: 28rem;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 10rem;
	}

	h1 {
		color: var(--editor-fg);
	}

	p {
		color: var(--editor-fg);
	}

	a {
		color: var(--editor-link);

		&:hover {
			text-decoration: underline;
		}
	}

	.message-box {
		background-color: var(--editor-muted-bg);
		border: 1px solid var(--editor-border);
		border-radius: 4px;
		padding: 1rem;
		margin-top: 1rem;
		color: var(--editor-fg);
	}

	.MuiTextField-root {
		.MuiOutlinedInput-root {
			background-color: var(--editor-control-bg);
			color: var(--editor-fg);
		}

		.MuiOutlinedInput-notchedOutline {
			border-color: var(--editor-border);
		}

		.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
			border-color: var(--editor-tab-active);
		}

		.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
			border-color: var(--editor-tab-active);
		}

		.MuiInputLabel-root {
			color: var(--editor-tab-inactive);
		}

		.MuiInputLabel-root.Mui-focused {
			color: var(--editor-tab-active);
		}
	}

	button {
		background-color: var(--editor-strong-bg) !important;
		color: var(--editor-strong-fg) !important;

		&:hover {
			background-color: var(--editor-strong-bg) !important;
			opacity: 0.9;
		}
	}
`;

interface AuthLayoutProps {
	children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
	const { isThemeHydrated } = useProgramTheme();

	if (!isThemeHydrated) {
		return null;
	}

	return <div css={authStyles}>{children}</div>;
}
