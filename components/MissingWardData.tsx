'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Logo from './Logo';
import { Typography } from '@mui/material';

const styles = css`
	max-width: 800px;
	margin: 0 auto;

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px;
	}

	main {
		margin: 0 auto;
		padding: 20px 12px;
		// center in the viewport
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.input-container {
		display: flex;
		flex-direction: column;
		gap: 16px;

		button {
			background-color: #000000;
		}

		.MuiLoadingButton-loadingIndicator {
			color: #ffffff;
		}
	}

	h1 {
		font-family: 'Roboto', sans-serif;
		font-size: 2rem;
	}
`;

const MissingWardData = () => {
	const router = useRouter();
	const [isRoutingToLogin, setIsRoutingToLogin] = useState(false);

	const handleRouteToLoginPage = () => {
		setIsRoutingToLogin(true);
		router.push('/protected');
	};

	return (
		<div css={styles}>
			<div className="top-bar">
				<Logo />
				<div className="input-container">
					<LoadingButton
						loading={isRoutingToLogin}
						variant="contained"
						color="primary"
						onClick={handleRouteToLoginPage}
					>
						Admin Login
					</LoadingButton>
				</div>
			</div>
			<main>
				<Typography variant="h1">
					If you need access to your program, please contact the responsible member in
					your ward or branch for a direct link.
				</Typography>
			</main>
		</div>
	);
};

export default MissingWardData;
