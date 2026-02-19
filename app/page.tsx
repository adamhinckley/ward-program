'use server';
import MissingWardData from '@/components/MissingWardData';
import { ClientProvider } from './ClientProvider';
import { createClient } from '@/utils/supabase/server';

export default async function Home({
	searchParams,
}: {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const supabase = await createClient();
	let initialState;
	const resolvedSearchParams = (await searchParams) ?? {};
	const idParam = resolvedSearchParams.id;
	const id = Array.isArray(idParam) ? idParam[0] : idParam;

	if (id) {
		try {
			const { data, error } = await supabase.from('ward-bulletin').select().eq('id', id);

			if (error) {
				console.error('error getting bulletin:', error);
				return <MissingWardData />;
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
