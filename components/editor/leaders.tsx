import Textfield from '@mui/material/TextField';
import { useAppContext } from '@/context/AppContext';

import type { EditorChildren } from '@/utils/types';
import Box from '@mui/material/Box';

const Leaders = ({ handleChange }: EditorChildren) => {
	const { content } = useAppContext();
	return (
		<Box sx={{ marginTop: '16px' }}>
			<Textfield
				name="presiding"
				value={content.presiding}
				onChange={handleChange}
				fullWidth
				label="Presiding"
				sx={{ mb: 2 }}
			/>
			<Textfield
				name="conducting"
				value={content.conducting}
				onChange={handleChange}
				fullWidth
				label="Conducting"
				sx={{ mb: 2 }}
			/>
			<Textfield
				name="musicLeader"
				value={content.musicLeader}
				onChange={handleChange}
				fullWidth
				label="Music Leader"
				sx={{ mb: 2 }}
			/>
			<Textfield
				name="accompanist"
				value={content.accompanist}
				onChange={handleChange}
				fullWidth
				label="Accompanist"
				sx={{ mb: 2 }}
			/>
		</Box>
	);
};

export default Leaders;
