import { AuthLayout } from '@/app/AuthLayout';
import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from './submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login({ searchParams }: { searchParams: { message: string } }) {
	const signIn = async (formData: FormData) => {
		'use server';

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const supabase = await createClient();

		const { error, ...rest } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return redirect('/login?message=Could not authenticate user');
		}

		return redirect('/protected');
	};

	const signUp = async (formData: FormData) => {
		'use server';

		const origin = (await headers()).get('origin');
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const supabase = await createClient();

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin}/auth/callback`,
			},
		});

		if (error) {
			return redirect('/login?message=Could not authenticate user');
		}

		return redirect('/login?message=Check email to continue sign in process');
	};

	return (
		<AuthLayout>
			<div className="auth-container">
				<form className="flex flex-col w-full justify-center gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" name="email" required type="email" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" name="password" required />
					</div>
					<SubmitButton
						formAction={signIn}
						className="rounded-md px-4 py-2 mb-2"
						pendingText="Signing In..."
					>
						Sign In
					</SubmitButton>
					<Link href="/forgot-password" className="text-sm text-center">
						Forgot your password?
					</Link>
					{searchParams?.message && (
						<p className="message-box text-center">{searchParams.message}</p>
					)}
				</form>
			</div>
		</AuthLayout>
	);
}
