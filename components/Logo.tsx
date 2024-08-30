/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { Typography } from '@mui/material';

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
		<MenuBookOutlinedIcon fontSize="large" />
		<div className="text-container">
			<Typography className="">Ward Program</Typography>
			{/* <hr />
			<Typography variant="caption" className="">
      Plain as Paper
			</Typography> */}
		</div>
	</div>
);

export default Logo;
