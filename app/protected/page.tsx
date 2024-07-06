'use server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Editor from './editor';
import TopBar from '@/components/editor/topBar';

export default async function ProtectedPage() {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect('/login');
	}

	return (
		<div>
			<TopBar />
			<Editor />
		</div>
	);
}
