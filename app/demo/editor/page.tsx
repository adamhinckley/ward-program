import { AppContextProvider } from '@/context/AppContext';
import { Edit } from '@mui/icons-material';
import App from 'next/app';
import Editor from '@/components/editor';
import { initialStateForDemo } from '@/utils/helpers';

export default function Home() {
	return (
		<AppContextProvider initialState={initialStateForDemo}>
			<Editor />
		</AppContextProvider>
	);
}
