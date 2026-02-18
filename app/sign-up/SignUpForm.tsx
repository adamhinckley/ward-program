'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SetStateAction, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button, TextField, Typography } from '@mui/material';
import Logo from '@/components/Logo';
import { AuthLayout } from '@/app/auth-layout';
import { useProgramTheme } from '@/context/ProgramThemeContext';

const styles = css`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 300px;
	margin: 0 auto;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	button {
		background-color: var(--editor-strong-bg) !important;
		color: var(--editor-strong-fg) !important;

		&:hover {
			background-color: var(--editor-strong-bg) !important;
			opacity: 0.9;
		}
	}

	.MuiTextField-root {
		.MuiOutlinedInput-root {
			background-color: var(--editor-control-bg);
			color: var(--editor-fg);
		}

		.MuiOutlinedInput-notchedOutline {
			border-color: var(--editor-border);
		}

		.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
			border-color: var(--editor-tab-active);
		}

		.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
			border-color: var(--editor-tab-active);
		}

		.MuiInputLabel-root {
			color: var(--editor-tab-inactive);
		}

		.MuiInputLabel-root.Mui-focused {
			color: var(--editor-tab-active);
		}
	}

	h5 {
		color: var(--editor-fg);
	}
`;

const SignUpForm = () => {
	const { isThemeHydrated } = useProgramTheme();
	const [inputValues, setInputValues] = useState({
		email: '',
		password: '',
		password2: '',
	});
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

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
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

	if (!isThemeHydrated) {
		return null;
	}

	return (
		<AuthLayout>
			<form css={styles}>
				<Logo />
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

				{successMessage ? <Typography>{successMessage}</Typography> : null}
			</form>
		</AuthLayout>
	);
};

export default SignUpForm;
