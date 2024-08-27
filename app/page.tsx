'use server';
import MissingWardData from '@/components/MissingWardData';
import { ClientProvider } from './ClientProvider';
import { createClient } from '@/utils/supabase/server';

export default async function Home({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const supabase = createClient();
	let initialState;
	const { id } = searchParams || {};

	if (id) {
		try {
			const { data, error } = await supabase.from('ward-bulletin').select().eq('id', id);

			if (error) {
				console.error('error getting bulletin:', error);
			}

			if (data) {
				initialState = !data.length ? 'no data' : { bulletinData: data };
			}
		} catch (error) {
			console.error('error getting bulletin:', error);
		}
		return <ClientProvider initialState={initialState} />;
	}

	return <MissingWardData />;
}
