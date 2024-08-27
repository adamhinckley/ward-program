'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import Textfield from '@mui/material/TextField';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

const styles = css`
	margin: 0 auto;
	max-width: 550px;
	padding: 20px 12px;
	// align vertically
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 24px;
	// center horizontally
	align-items: center;
	// full height
	height: 100vh;

	.input-container {
		display: flex;
		flex-direction: column;
		gap: 16px;

		button {
			background-color: #1976d2;
		}
	}
`;

const MissingWardData = () => {
	const router = useRouter();
	const [ward, setWard] = useState('');
	const [stake, setStake] = useState('');
	const [isRoutingToLogin, setIsRoutingToLogin] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === 'ward') {
			setWard(value);
		} else {
			setStake(value);
		}
	};

	const handleRedirect = () => {
		// redirect to the current url but add query params for stake and ward
		const url = new URL(window.location.href);
		url.searchParams.set('stake', stake.toLowerCase());
		url.searchParams.set('ward', ward.toLowerCase());
		const newUrl = `${url.protocol}//${url.host}${url.pathname}${url.search}`;
		window.location.href = newUrl;
	};

	const handleRouteToLoginPage = () => {
		setIsRoutingToLogin(true);
		router.push('/protected');
	};

	return (
		<div css={styles}>
			<h1>
				Missing or Invalid Ward Data. Check with your ward leadership to get a link for your
				program
			</h1>
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
	);
};

export default MissingWardData;
