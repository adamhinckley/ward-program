import { AuthLayout } from '@/app/auth-layout';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '../login/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPassword({ searchParams }: { searchParams: { message?: string } }) {
	const updatePassword = async (formData: FormData) => {
		'use server';

		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;
		const supabase = await createClient();

		if (password !== confirmPassword) {
			return redirect('/reset-password?message=Passwords do not match');
		}

		if (password.length < 6) {
			return redirect('/reset-password?message=Password must be at least 6 characters');
		}

		const { error } = await supabase.auth.updateUser({
			password: password,
		});

		if (error) {
			return redirect('/reset-password?message=Could not update password');
		}

		return redirect('/login?message=Password updated successfully');
	};

	return (
		<AuthLayout>
			<div className="auth-container">
				<h1 className="text-2xl font-bold mb-4">Reset Password</h1>
				<p className="text-sm mb-4">Enter your new password below.</p>
				<form className="flex flex-col w-full justify-center gap-4">
					<div className="grid gap-2">
						<Label htmlFor="password">New Password</Label>
						<Input id="password" name="password" type="password" required />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="confirmPassword">Confirm New Password</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
						/>
					</div>
					<SubmitButton
						formAction={updatePassword}
						className="rounded-md px-4 py-2 mb-2"
						pendingText="Updating..."
					>
						Update Password
					</SubmitButton>
					{searchParams?.message && (
						<p className="message-box text-center">{searchParams.message}</p>
					)}
				</form>
			</div>
		</AuthLayout>
	);
}
