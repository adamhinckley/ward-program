/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const styles = (hideComponent: Boolean) => css`
	height: 100vh;
	width: 100vw;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	margin: 0 auto;

	// make this fill the screen
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1000;

	p {
		text-align: center;
	}

	.title {
		font-size: 2rem;
	}
`;

type EasterEggProps = {
	setShowEasterEgg: (value: boolean) => void;
};

const EasterEgg = ({ setShowEasterEgg }: EasterEggProps) => {
	const [hideComponent, setHideComponent] = useState(false);

	return (
		<div css={styles(hideComponent)}>
			<Typography className="title">🎉 Congratulations! 🎉</Typography>
			<Typography>
				Enter code "Think Celestial" on the church website for a 10% discount on tithing!
			</Typography>
			<IconButton onClick={() => setShowEasterEgg(false)}>
				<CloseIcon />
			</IconButton>
		</div>
	);
};

export default EasterEgg;
