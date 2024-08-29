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

		console.log('confirm user data', data);
		console.log('confirm user error', error);

		if (data?.user?.id) {
			// add user to the user settings table
			const { error: insertUserError } = await supabase.from('user-settings').upsert({
				user_id: data.user.id,
			});

			if (insertUserError) {
				console.error('insert user data to user settings error', insertUserError);
			}

			// add ward data to the ward-bulletin table
			const { error: insertWardError } = await supabase.from('ward-bulletin').upsert({
				ward_id: data?.user?.id,
			});

			if (insertWardError) {
				console.error('insert ward data to ward-bulletin error', insertWardError);
			}
		}

		if (!error) {
			// redirect user to specified redirect URL or root of app
			return redirect(next);
		}
	}

	// redirect the user to an error page with some instructions
	redirect('/error');
}
