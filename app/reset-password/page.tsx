import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '../login/submit-button';
import Textfield from '@mui/material/TextField';

export default function ResetPassword({ searchParams }: { searchParams: { message?: string } }) {
	const updatePassword = async (formData: FormData) => {
		'use server';

		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;
		const supabase = createClient();

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
		<div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 m-auto mt-40">
			<h1 className="text-2xl font-bold mb-4 ">Reset Password</h1>
			<p className="text-sm  mb-4">Enter your new password below.</p>
			<form className="flex-1 flex flex-col w-full justify-center gap-2 ">
				<Textfield name="password" type="password" required label="New Password" />
				<Textfield
					name="confirmPassword"
					type="password"
					required
					label="Confirm New Password"
				/>
				<SubmitButton
					formAction={updatePassword}
					className="bg-gray-900 rounded-md px-4 py-2  mb-2"
					pendingText="Updating..."
				>
					Update Password
				</SubmitButton>
				{searchParams?.message && (
					<p className="mt-4 p-4 text-black text-center">{searchParams.message}</p>
				)}
			</form>
		</div>
	);
}
