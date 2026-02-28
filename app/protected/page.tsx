'use server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Editor from '@/components/Editor';
import { AppContextProvider } from '@/context/AppContext';
import { AppState } from '@/utils/types';

export default async function ProtectedPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect('/login');
	}

	let initialState: Partial<AppState> = {};

	const { data: userSettings, error } = await supabase
		.from('user-settings')
		.select('*')
		.eq('id', user.id)
		.single();

	if (error) {
		console.error('Error fetching user settings:', error.message);
		return <div>Error fetching user settings</div>;
	}

	if (userSettings) {
		initialState.userSettings = userSettings;
		try {
			const { data: bulletinData, error: bulletinError } = await supabase
				.from('ward-bulletin')
				.select()
				.eq('id', userSettings.id);

			if (bulletinError) {
				console.error('Error fetching bulletin:', bulletinError.message);
			} else {
				initialState.bulletinData = bulletinData;
			}
		} catch (error) {
			console.error('Error fetching bulletin:', (error as Error)?.message);
		}
	}
	if (!initialState.bulletinData || !initialState?.userSettings) {
		return null;
	}

	return (
		<AppContextProvider initialState={initialState as AppState}>
			<Editor />
		</AppContextProvider>
	);
}
