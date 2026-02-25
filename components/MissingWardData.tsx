'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Logo from './Logo';
import { Button, Link, Typography } from '@mui/material';

export const LAST_PROGRAM_ID_STORAGE_KEY = 'ward-program:last-id';

const styles = css`
	max-width: 800px;
	margin: 0 auto;

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px;
	}

	main {
		margin: 0 auto;
		padding: 20px 12px;
		// center in the viewport
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.input-container {
		display: flex;
		flex-direction: column;
		gap: 16px;

		button {
			background-color: #000000;
		}

		.MuiLoadingButton-loadingIndicator {
			color: #ffffff;
		}
	}

	h1 {
		font-family: 'Roboto', sans-serif;
		font-size: 1.5rem;
	}

	.button-container {
		display: flex;
		gap: 16px;
		margin-top: 16px;
		justify-content: space-around;
		width: 100%;
		button {
			background-color: #000000;
			color: #ffffff;
			padding: 8px 16px;
		}
	}
`;

const MissingWardData = () => {
	const router = useRouter();
	const [isRoutingToLogin, setIsRoutingToLogin] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const idFromUrl = new URLSearchParams(window.location.search).get('id');
		if (idFromUrl?.trim()) {
			return;
		}

		try {
			const standaloneByDisplayMode =
				typeof window.matchMedia === 'function' &&
				window.matchMedia('(display-mode: standalone)').matches;
			const standaloneByNavigator =
				'standalone' in window.navigator &&
				Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);

			if (!standaloneByDisplayMode && !standaloneByNavigator) {
				return;
			}

			const storedId = window.localStorage.getItem(LAST_PROGRAM_ID_STORAGE_KEY);
			if (!storedId) {
				return;
			}

			router.replace(`/?id=${encodeURIComponent(storedId)}`);
		} catch {
			return;
		}
	}, [router]);

	const handleRouteToLoginPage = () => {
		setIsRoutingToLogin(true);
		router.push('/protected');
	};

	return (
		<div css={styles}>
			<div className="top-bar">
				<Logo />
				<div className="input-container">
					<LoadingButton
						loading={isRoutingToLogin}
						variant="contained"
						color="primary"
						onClick={handleRouteToLoginPage}
					>
						Admin Login
					</LoadingButton>
				</div>
			</div>
			<main>
				<Typography variant="h1">
					If you need access to your program, please contact the responsible member in
					your ward or branch for a direct link.
				</Typography>

				<div className="button-container">
					<Link href="/demo/program">
						<Button>Demo Program</Button>
					</Link>
					<Link href="demo/editor">
						<Button>Demo Editor</Button>
					</Link>
				</div>
			</main>
		</div>
	);
};

export default MissingWardData;
