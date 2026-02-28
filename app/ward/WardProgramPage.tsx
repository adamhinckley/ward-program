import { Suspense } from 'react';
import MissingWardData from '@/components/MissingWardData';
import { ClientProvider } from '../ClientProvider';
import HomeLoadingScreen from '@/components/HomeLoadingScreen';

const WARD_PAGE_REVALIDATE_SECONDS = 60 * 60;

type WardBulletinRow = {
	id: string;
	bulletin: unknown;
};

async function getWardBulletin(id: string): Promise<WardBulletinRow | null> {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		console.error('Missing Supabase environment variables for ward page data fetch.');
		return null;
	}

	const url = new URL('/rest/v1/ward-bulletin', supabaseUrl);
	url.searchParams.set('select', 'id,bulletin');
	url.searchParams.set('id', `eq.${id}`);
	url.searchParams.set('limit', '1');

	const response = await fetch(url.toString(), {
		headers: {
			apikey: supabaseAnonKey,
			Authorization: `Bearer ${supabaseAnonKey}`,
			Accept: 'application/json',
		},
		next: {
			revalidate: WARD_PAGE_REVALIDATE_SECONDS,
			tags: [`ward-bulletin:${id}`],
		},
	});

	if (!response.ok) {
		console.error('error getting bulletin:', response.status, response.statusText);
		return null;
	}

	const rows = (await response.json()) as WardBulletinRow[];
	return rows[0] ?? null;
}

async function WardProgramContent({ id }: { id?: string }) {
	if (!id) {
		return <MissingWardData />;
	}

	try {
		const data = await getWardBulletin(id);

		if (!data) {
			return <MissingWardData />;
		}

		const initialState = { bulletinData: [data] };
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
