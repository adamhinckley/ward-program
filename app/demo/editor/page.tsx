import { AppContextProvider } from '@/context/AppContext';
import Editor from '@/components/editor';
import { initialStateForDemo } from '@/utils/helpers';

export const dynamic = 'force-dynamic';

export default function Home() {
	return (
		<AppContextProvider initialState={initialStateForDemo}>
			<Editor />
		</AppContextProvider>
	);
}
