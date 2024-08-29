import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from './submit-button';
import Textfield from '@mui/material/TextField';

export default function Login({ searchParams }: { searchParams: { message: string } }) {
	const signIn = async (formData: FormData) => {
		'use server';

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const supabase = createClient();

		const { error, ...rest } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error('error signing in', error);
			return redirect('/login?message=Could not authenticate user');
		}

		return redirect('/protected');
	};

	const signUp = async (formData: FormData) => {
		'use server';

		const origin = headers().get('origin');
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const supabase = createClient();

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
		<div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 m-auto mt-40">
			<h1 className="text-4xl  text-foreground text-gray-900">Sign In</h1>
			<form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
				<Textfield name="email" required label="Email" />
				<Textfield type="password" name="password" required label="Password" />
				<SubmitButton
					formAction={signIn}
					className="bg-blue-500 rounded-md px-4 py-2 text-foreground mb-2"
					pendingText="Signing In..."
				>
					Sign In
				</SubmitButton>
				{/* <SubmitButton
					formAction={signUp}
					className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 text-gray-800 bg-green-400 "
					pendingText="Signing Up..."
				>
					Sign Up
				</SubmitButton> */}
				{searchParams?.message && (
					<p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
						{searchParams.message}
					</p>
				)}
			</form>
		</div>
	);
}
