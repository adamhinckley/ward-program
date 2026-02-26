/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const styles = (hideComponent: Boolean) => css`
	height: 100vh;
	width: 100vw;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	margin: 0 auto;
	padding: 12px;

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
			<p className="title">🎉 Congratulations! 🎉</p>
			<p>Enter code "Think Celestial" on the church website for a 10% discount on tithing!</p>
			<div className="flex justify-center mt-4">
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
	);
};

export default EasterEgg;
