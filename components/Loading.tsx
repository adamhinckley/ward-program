/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Loader2 } from 'lucide-react';

const loadingStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Loading = () => {
	return (
		<div css={loadingStyles}>
			<Loader2 className="h-8 w-8 animate-spin" aria-hidden="true" />
		</div>
	);
};

export default Loading;
