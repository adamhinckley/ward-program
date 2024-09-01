'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import EasterEgg from './EasterEgg';

const styles = css`
	.image-container {
		width: fit-content;
		margin: 0 auto;
		position: relative;
		display: inline-block;
	}

	.responsive-image {
		display: block;
		height: auto;
	}
	.hidden-container {
		// make the container the same size as the image
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
	}

	.left,
	.right,
	.top-bottom-container {
		width: 33.3%;
	}

	.top,
	.bottom {
		height: 50%;
	}
`;

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
		<div css={styles}>
			<div className="image-container">
				<div className="hidden-container">
					<div className="left" onClick={(e) => handleClick(e, 'left')} />
					<div className="top-bottom-container">
						<div className="top" onClick={(e) => handleClick(e, 'up')} />
						<div className="bottom" onClick={(e) => handleClick(e, 'down')} />
					</div>
					<div className="right" onClick={(e) => handleClick(e, 'right')} />
				</div>
				{content.imageUrl ? (
					<Image
						src={content.imageUrl}
						alt=""
						width={550}
						height={550}
						className="responsive-image"
					/>
				) : null}
			</div>
			{showEasterEgg ? <EasterEgg setShowEasterEgg={setShowEasterEgg} /> : null}
		</div>
	);
};
export default FrontPage;
