import { AppContextProvider } from '@/context/AppContext';
import Editor from '@/components/Editor';
import { initialStateForDemo } from '@/utils/helpers';

export default function Home() {
	return (
		<AppContextProvider initialState={initialStateForDemo}>
			<Editor />
		</AppContextProvider>
	);
}
