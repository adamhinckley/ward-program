'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SetStateAction, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button, TextField, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';
import { isDevEnv } from '@/utils/helpers';

const styles = css`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 300px;
	margin: 0 auto;
	//center in the screen
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	button {
		background-color: #1976d2;
	}
`;

const SignUpForm = () => {
	const [inputValues, setInputValues] = useState({
		email: '',
		password: '',
		password2: '',
	});
	const [captchaToken, setCaptchaToken] = useState<string | undefined>();
	const [successMessage, setSuccessMessage] = useState('');

	const { email, password, password2 } = inputValues;
	const supabase = createClient();

	const handleSignUp = async (e: { preventDefault: () => void; stopPropagation: () => void }) => {
		e.preventDefault();
		e.stopPropagation();
		if (password !== password2) {
			alert('Passwords do not match');
			return;
		}
		// validate email with regex
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(email)) {
			alert('Invalid email');
			return;
		}

		if (!captchaToken && !isDevEnv) {
			alert('Please complete the captcha');
			return;
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			...(isDevEnv ? {} : { options: { captchaToken } }),
		});

		if (error) {
			alert('There was an error, please try again');
			console.error('error on sign up:', error);
		}

		if (data) {
			setSuccessMessage('Please check your email to verify your account');
		}
	};

	const handleChange = (e: { target: { name: string; value: SetStateAction<string> } }) => {
		const { value } = e.target;
		const { name } = e.target;

		setInputValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<form css={styles}>
			<Typography variant="h5">Sign Up</Typography>
			<TextField
				type="email"
				name="email"
				label="Email"
				value={email}
				onChange={handleChange}
				required
				fullWidth
			/>
			<TextField
				type="password"
				name="password"
				label="Password"
				value={password}
				onChange={handleChange}
				required
				fullWidth
			/>
			<TextField
				type="password"
				name="password2"
				label="Verify Password"
				value={password2}
				onChange={handleChange}
				required
				fullWidth
			/>
			<Button type="submit" variant="contained" color="primary" onClick={handleSignUp}>
				Sign Up
			</Button>
			{!isDevEnv ? (
				<Turnstile
					siteKey="0x4AAAAAAAiOM8bbMsmvNPK6"
					onSuccess={(token) => {
						setCaptchaToken(token);
					}}
					options={{
						theme: 'light',
					}}
				/>
			) : null}
			{successMessage ? <Typography>{successMessage}</Typography> : null}
		</form>
	);
};

export default SignUpForm;
