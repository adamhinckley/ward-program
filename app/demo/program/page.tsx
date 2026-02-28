import WardFacingProgram from '@/components/WardFacingProgram';
import { AppContextProvider } from '@/context/AppContext';
import FrontPage from '@/components/frontPage';
import { initialStateForDemo } from '@/utils/helpers';

export default function Home() {
	const demoImageUrl = initialStateForDemo.bulletinData[0].bulletin.imageUrl;

	return (
		<AppContextProvider initialState={initialStateForDemo}>
			<WardFacingProgram frontPage={<FrontPage imageUrl={demoImageUrl} />} />
		</AppContextProvider>
	);
}
