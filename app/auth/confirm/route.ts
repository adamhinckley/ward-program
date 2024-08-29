import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const token_hash = searchParams.get('token_hash');
	const type = searchParams.get('type') as EmailOtpType | null;
	const next = searchParams.get('next') ?? '/';

	if (token_hash && type) {
		const supabase = createClient();

		const { data, error } = await supabase.auth.verifyOtp({
			type,
			token_hash,
		});

		if (error) {
			console.error('Error verifying OTP:', error);
			// Redirect the user to an error page with some instructions
			redirect('/error');
		}

		if (data?.user?.id) {
			const { id } = data.user;
			try {
				// Add user to the user settings table
				const { data: insertUserData, error: insertUserError } = await supabase
					.from('user-settings')
					.upsert({
						id,
					});

				if (insertUserError) {
					throw insertUserError;
				}

				console.log('add user to user settings data', insertUserData);

				// Add ward data to the ward-bulletin table
				const { data: insertWardData, error: insertWardError } = await supabase
					.from('ward-bulletin')
					.upsert({
						id,
					});

				if (insertWardError) {
					throw insertWardError;
				}

				console.log('add ward data to ward bulletin data', insertWardData);

				// Redirect user to specified redirect URL or root of app
				redirect(next);
			} catch (error) {
				console.error('Error inserting data:', error);
				// Redirect the user to an error page with some instructions
				redirect('/error');
			}
		} else {
			// Redirect the user to an error page with some instructions
			redirect('/error');
		}
	}
	// redirect the user to an error page with some instructions
	redirect('/error');
}
