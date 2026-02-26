'use client';
import Image from 'next/image';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import EasterEgg from './EasterEgg';

const FrontPage = () => {
	const { content } = useAppContext();
	const [showEasterEgg, setShowEasterEgg] = useState(false);

	const konamiCodeString = 'upupdowndownleftrightleftright';
	let string = '';

	const handleClick = (e: { preventDefault: () => void }, zone: any) => {
		e.preventDefault();
		// add the zone to the string
		string += zone;
		// if the string isn't matching the konami code, reset it
		if (!konamiCodeString.startsWith(string)) {
			string = '';
		}
		// if the string matches the konami code string, show the easter egg
		if (string === konamiCodeString) {
			setShowEasterEgg(true);
		}
	};

	return (
		<div>
			<div className="relative mx-auto inline-block w-fit">
				<div className="absolute inset-0 flex">
					<div className="w-1/3" onClick={(e) => handleClick(e, 'left')} />
					<div className="w-1/3">
						<div className="h-1/2" onClick={(e) => handleClick(e, 'up')} />
						<div className="h-1/2" onClick={(e) => handleClick(e, 'down')} />
					</div>
					<div className="w-1/3" onClick={(e) => handleClick(e, 'right')} />
				</div>
				{content.imageUrl ? (
					<Image
						src={content.imageUrl}
						alt=""
						width={550}
						height={550}
						className="block h-auto"
						loading="eager"
					/>
				) : null}
			</div>
			{showEasterEgg ? <EasterEgg setShowEasterEgg={setShowEasterEgg} /> : null}
		</div>
	);
};
export default FrontPage;
