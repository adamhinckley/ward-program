'use client';
import WardFacingProgram from '@/components/WardFacingProgram';
import { AppContextProvider } from '@/context/AppContext';
import { initialStateForDemo } from '@/utils/helpers';

export default function Home() {
	return (
		<AppContextProvider initialState={initialStateForDemo}>
			<WardFacingProgram />
		</AppContextProvider>
	);
}
