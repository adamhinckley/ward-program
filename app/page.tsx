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
	const { ward, stake } = searchParams || {};

	if (ward && stake) {
		const { data, error } = await supabase
			.from('ward-bulletin')
			.select()
			.eq('ward', ward)
			.eq('stake', stake);

		if (error) {
			console.error('error getting bulletin:', error);
		}

		if (data) {
			initialState = !data.length ? 'no data' : { bulletinData: data };
		}
		return <ClientProvider initialState={initialState} />;
	}

	return <MissingWardData />;
}
