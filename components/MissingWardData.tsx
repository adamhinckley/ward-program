'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export const LAST_PROGRAM_ID_STORAGE_KEY = 'ward-program:last-id';

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
		<div className="mx-auto max-w-[800px]">
			<div className="flex items-center justify-between p-3">
				<Logo />
				<div className="flex flex-col gap-4">
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
			<main className="mx-auto flex h-screen flex-col items-center justify-center px-3 py-5">
				<h1 className="text-2xl" style={{ fontFamily: 'Roboto, sans-serif' }}>
					If you need access to your program, please contact the responsible member in
					your ward or branch for a direct link.
				</h1>

				<div className="mt-4 flex w-full justify-around gap-4">
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
