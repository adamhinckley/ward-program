import { AuthLayout } from '@/app/auth-layout';
import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '../login/submit-button';
import Textfield from '@mui/material/TextField';

export default function ForgotPassword({ searchParams }: { searchParams: { message: string } }) {
	const requestPasswordReset = async (formData: FormData) => {
		'use server';

		const email = formData.get('email') as string;
		const origin = (await headers()).get('origin');
		const supabase = await createClient();

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${origin}/reset-password`,
		});

		if (error) {
			return redirect('/forgot-password?message=Could not send reset email');
		}

		return redirect('/forgot-password?message=Check your email for the password reset link');
	};

	return (
		<AuthLayout>
			<div className="auth-container">
				<Link href="/login" className="text-sm mb-4">
					← Back to Login
				</Link>
				<h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
				<p className="text-sm mb-4">
					Enter your email address and we'll send you a link to reset your password.
				</p>
				<form className="flex flex-col w-full justify-center gap-4">
					<Textfield name="email" required label="Email" type="email" />
					<SubmitButton
						formAction={requestPasswordReset}
						className="rounded-md px-4 py-2 mb-2"
						pendingText="Sending..."
					>
						Send Reset Link
					</SubmitButton>
					{searchParams?.message && (
						<p className="message-box text-center">{searchParams.message}</p>
					)}
				</form>
			</div>
		</AuthLayout>
	);
}
