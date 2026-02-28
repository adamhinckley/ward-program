'use client';
import { ReactNode } from 'react';
import { AppContextProvider } from '../context/AppContext';
import MissingWardData from '@/components/MissingWardData';
import WardFacingProgram from '@/components/WardFacingProgram';

export function ClientProvider({
	initialState,
	frontPage,
}: {
	initialState: any;
	frontPage: ReactNode;
}) {
	if (initialState === 'no data') {
		return <MissingWardData />;
	}

	return (
		<AppContextProvider initialState={initialState}>
			<WardFacingProgram frontPage={frontPage} />
		</AppContextProvider>
	);
}
