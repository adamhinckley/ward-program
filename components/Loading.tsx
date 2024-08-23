/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CircularProgress from '@mui/material/CircularProgress';

const loadingStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Loading = () => {
	return (
		<div css={loadingStyles}>
			<CircularProgress />
		</div>
	);
};

export default Loading;
