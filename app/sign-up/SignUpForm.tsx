'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SetStateAction, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button, TextField, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';

const styles = css`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	max-width: 300px;
	margin: 0 auto;
	//center in the screen
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	button {
		background-color: #1976d2; /* Green */
	}
`;

const SignUpForm = () => {
	const [inputValues, setInputValues] = useState({
		email: '',
		password: '',
		password2: '',
	});
	const [captchaToken, setCaptchaToken] = useState<string | undefined>();

	const { email, password, password2 } = inputValues;
	const supabase = createClient();

	const handleSignUp = async () => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { captchaToken },
		});

		console.log('data', data);
		console.log('error', error);
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
			/>
			<TextField
				type="password"
				name="password"
				label="Password"
				value={password}
				onChange={handleChange}
				required
			/>
			<TextField
				type="password"
				name="password2"
				label="Verify Password"
				value={password}
				onChange={handleChange}
				required
			/>
			<Button type="submit" variant="contained" color="primary" onClick={handleSignUp}>
				Sign Up
			</Button>
			<Turnstile
				siteKey="0x4AAAAAAAiOM8bbMsmvNPK6"
				onSuccess={(token) => {
					setCaptchaToken(token);
				}}
			/>
		</form>
	);
};

export default SignUpForm;
