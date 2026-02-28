'use client';

import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

type EasterEggProps = {
	targetId: string;
};

const EasterEgg = ({ targetId }: EasterEggProps) => {
	const [showEasterEgg, setShowEasterEgg] = useState(false);
	const [isTargetMounted, setIsTargetMounted] = useState(false);
	const inputStringRef = useRef('');
	const konamiCodeString = 'upupdowndownleftrightleftright';
	console.log('egg');

	useEffect(() => {
		setIsTargetMounted(Boolean(document.getElementById('front-page-image')));
	}, [targetId]);

	const handleClick = (e: React.MouseEvent<HTMLDivElement>, zone: string) => {
		e.preventDefault();
		inputStringRef.current += zone;

		if (!konamiCodeString.startsWith(inputStringRef.current)) {
			inputStringRef.current = '';
		}

		if (inputStringRef.current === konamiCodeString) {
			setShowEasterEgg(true);
			inputStringRef.current = '';
		}
	};

	return (
		<>
			{isTargetMounted ? (
				<div className="absolute inset-0 z-10 flex">
					<div className="w-1/3" onClick={(e) => handleClick(e, 'left')} />
					<div className="w-1/3">
						<div className="h-1/2" onClick={(e) => handleClick(e, 'up')} />
						<div className="h-1/2" onClick={(e) => handleClick(e, 'down')} />
					</div>
					<div className="w-1/3" onClick={(e) => handleClick(e, 'right')} />
				</div>
			) : null}
			{showEasterEgg ? (
				<div className="fixed inset-0 z-[2147483647] flex h-dvh w-dvw flex-col justify-center overflow-auto bg-[var(--program-bg)] p-3 text-[var(--program-fg)]">
					<p className="text-center text-[2rem]">🎉 Congratulations! 🎉</p>
					<p className="text-center">
						Enter code "Think Celestial" on the church website for a 10% discount on
						tithing!
					</p>
					<div className="mt-4 flex justify-center">
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={() => setShowEasterEgg(false)}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</div>
			) : null}
		</>
	);
};

export default EasterEgg;
