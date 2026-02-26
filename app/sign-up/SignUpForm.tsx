'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SetStateAction, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Logo from '@/components/Logo';
import { AuthLayout } from '@/app/auth-layout';
import { useProgramTheme } from '@/context/ProgramThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const styles = css`
	display: flex;
		width: 100%;
	}

	h5 {
		color: var(--editor-fg);
	width: 300px;
	margin: 0 auto;
			opacity: 0.9;
	top: 50%;
	left: 50%;
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
				<h5>Sign Up</h5>
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						name="email"
						value={email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						type="password"
						name="password"
						value={password}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password2">Verify Password</Label>
					<Input
						id="password2"
						type="password"
						name="password2"
						value={password2}
						onChange={handleChange}
						required
					/>
				</div>
				<Button type="submit" onClick={handleSignUp}>
					Sign Up
				</Button>

				{successMessage ? <p>{successMessage}</p> : null}
			</form>
		</AuthLayout>
	);
};

export default SignUpForm;
