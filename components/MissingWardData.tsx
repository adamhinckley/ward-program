'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

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
					<Button
						type="button"
						onClick={handleRouteToLoginPage}
						disabled={isRoutingToLogin}
					>
						{isRoutingToLogin ? (
							<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
						) : (
							'Admin Login'
						)}
					</Button>
				</div>
			</div>
			<main>
				<h1>
					If you need access to your program, please contact the responsible member in
					your ward or branch for a direct link.
				</h1>

				<div className="button-container">
					<Button asChild>
						<Link href="/demo/program">Demo Program</Link>
					</Button>
					<Button asChild>
						<Link href="/demo/editor">Demo Editor</Link>
					</Button>
				</div>
			</main>
		</div>
	);
};

export default MissingWardData;
