'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';
import QRCode from 'react-qr-code';
import { cn } from '@/lib/utils';

type ShareQrCardProps = {
	isDarkMode: boolean;
};

const ShareQrCard = ({ isDarkMode }: ShareQrCardProps) => {
	const [currentUrl, setCurrentUrl] = useState<string>('');
	const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');
	const [shareNotice, setShareNotice] = useState<string | null>(null);
	const shareNoticeTimeoutRef = useRef<number | null>(null);

	const clearShareNoticeTimeout = useCallback(() => {
		if (shareNoticeTimeoutRef.current !== null) {
			window.clearTimeout(shareNoticeTimeoutRef.current);
			shareNoticeTimeoutRef.current = null;
		}
	}, []);

	const showShareNotice = useCallback(
		(message: string, nextCopyState: 'idle' | 'success' | 'error' = 'idle') => {
			clearShareNoticeTimeout();
			setShareNotice(message);
			setCopyState(nextCopyState);
			shareNoticeTimeoutRef.current = window.setTimeout(() => {
				setShareNotice(null);
				setCopyState('idle');
			}, 2200);
		},
		[clearShareNoticeTimeout],
	);

	useEffect(() => {
		setCurrentUrl(window.location.href);
	}, []);

	useEffect(() => {
		return () => {
			clearShareNoticeTimeout();
		};
	}, [clearShareNoticeTimeout]);

	const handleCopyLink = useCallback(async () => {
		if (!currentUrl) {
			showShareNotice('No link available to copy.', 'error');
			return;
		}

		try {
			if (window.isSecureContext && navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(currentUrl);
			} else {
				const textarea = document.createElement('textarea');
				textarea.value = currentUrl;
				textarea.setAttribute('readonly', '');
				textarea.style.position = 'absolute';
				textarea.style.left = '-9999px';
				document.body.appendChild(textarea);
				textarea.select();
				const successful = document.execCommand('copy');
				document.body.removeChild(textarea);
				if (!successful) {
					throw new Error('Copy command failed');
				}
			}

			showShareNotice('Link copied to clipboard.', 'success');
		} catch {
			showShareNotice('Could not copy link.', 'error');
		}
	}, [currentUrl, showShareNotice]);

	const handleNativeShare = useCallback(async () => {
		if (!currentUrl) {
			showShareNotice('No link available to share.', 'error');
			return;
		}

		if (typeof navigator.share !== 'function') {
			await handleCopyLink();
			return;
		}

		try {
			await navigator.share({
				title: 'Ward Program',
				url: currentUrl,
			});
			showShareNotice('Share sheet opened.');
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				return;
			}
			showShareNotice('Could not open share sheet.', 'error');
		}
	}, [currentUrl, handleCopyLink, showShareNotice]);

	const canUseNativeShare =
		typeof navigator !== 'undefined' && typeof navigator.share === 'function';

	if (!currentUrl) {
		return null;
	}

	return (
		<div
			className={`mt-4 rounded-lg flex flex-col items-center gap-2 px-3 py-3 pb-6 mr-4 ml-4 ${
				isDarkMode ? 'bg-white/10' : 'bg-black/[0.03]'
			}`}
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
			<div className="mt-1 flex w-full flex-col gap-1.5">
				{canUseNativeShare ? (
					<button
						type="button"
						onClick={handleNativeShare}
						className={cn(
							'flex w-full items-center justify-center gap-1.5 rounded-md border-0 px-3 py-2 text-xs font-semibold cursor-pointer',
							isDarkMode ? 'bg-white/15 text-white' : 'bg-black/[0.08] text-black/80',
						)}
					>
						<Share2 aria-hidden="true" size={14} />
						Share
					</button>
				) : null}
				<button
					type="button"
					onClick={handleCopyLink}
					className={cn(
						'flex w-full items-center justify-center gap-1.5 rounded-md border-0 px-3 py-2 text-xs font-semibold cursor-pointer',
						isDarkMode ? 'bg-white/15 text-white' : 'bg-black/[0.08] text-black/80',
					)}
				>
					{copyState === 'success' ? (
						<Check aria-hidden="true" size={14} />
					) : (
						<Copy aria-hidden="true" size={14} />
					)}
					{copyState === 'success' ? 'Copied!' : 'Copy link'}
				</button>
			</div>
			{shareNotice ? (
				<p className="m-0 text-[11px] leading-4 opacity-85 text-center">{shareNotice}</p>
			) : null}
		</div>
	);
};

export default ShareQrCard;
