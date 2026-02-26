/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BookOpenText } from 'lucide-react';

const styles = css`
	display: flex;
	align-items: center;
	gap: 8px;
	width: fit-content;

	.text-container {
		display: flex;
		flex-direction: column;
		gap: 4px;
		align-items: center;
		hr {
			border-bottom: 1px solid #000;
			width: 100%;
		}
		p {
			margin-top: 4px;
		}
	}
`;

const Logo = () => (
	<div css={styles}>
		<BookOpenText size={30} aria-hidden="true" />
		<div className="text-container">
			<p>Ward Program</p>
			{/* <hr />
			<Typography variant="caption" className="">
      Plain as Paper
			</Typography> */}
		</div>
	</div>
);

export default Logo;
