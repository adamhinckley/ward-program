import { Suspense } from 'react';
import MissingWardData from '@/components/MissingWardData';
import { ClientProvider } from '../ClientProvider';
import { createClient } from '@/utils/supabase/server';
import HomeLoadingScreen from '@/components/HomeLoadingScreen';

async function WardProgramContent({ id }: { id?: string }) {
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

		return <ClientProvider initialState={initialState} />;
	} catch (error) {
		console.error('error getting bulletin:', error);
		return <MissingWardData />;
	}
}

export function WardProgramPage({ id }: { id?: string }) {
	return (
		<Suspense fallback={<HomeLoadingScreen />}>
			<WardProgramContent id={id} />
		</Suspense>
	);
}
