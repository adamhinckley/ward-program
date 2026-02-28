import { Suspense } from 'react';
import MissingWardData from '@/components/MissingWardData';
import { ClientProvider } from './ClientProvider';
import { createClient } from '@/utils/supabase/server';
import HomeLoadingScreen from '@/components/HomeLoadingScreen';
import FrontPage from '@/components/frontPage';

async function HomeContent({
	searchParams,
}: {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const resolvedSearchParams = (await searchParams) ?? {};
	const idParam = resolvedSearchParams.id;
	const id = Array.isArray(idParam) ? idParam[0] : idParam;

	if (!id) {
		return <MissingWardData />;
	}

	const supabase = await createClient();

	try {
		const { data, error } = await supabase
			.from('ward-bulletin')
			.select('id, bulletin')
			.eq('id', id)
			.maybeSingle();

		if (error) {
			console.error('error getting bulletin:', error);
			return <MissingWardData />;
		}

		const initialState = data ? { bulletinData: [data] } : 'no data';
		const imageUrl = data?.bulletin?.imageUrl ?? '';

		return (
			<ClientProvider
				initialState={initialState}
				frontPage={<FrontPage imageUrl={imageUrl} />}
			/>
		);
	} catch (error) {
		console.error('error getting bulletin:', error);
		return <MissingWardData />;
	}
}

export default function Home({
	searchParams,
}: {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	return (
		<Suspense fallback={<HomeLoadingScreen />}>
			<HomeContent searchParams={searchParams} />
		</Suspense>
	);
}
