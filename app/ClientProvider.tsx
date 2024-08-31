'use client';
import { AppContextProvider } from '../context/AppContext';
import MissingWardData from '@/components/MissingWardData';
import WardFacingProgram from '@/components/WardFacingProgram';

export function ClientProvider({ initialState }: { initialState: any }) {
	if (initialState === 'no data') {
		return <MissingWardData />;
	}

	return (
		<AppContextProvider initialState={initialState}>
			<WardFacingProgram />
		</AppContextProvider>
	);
}
