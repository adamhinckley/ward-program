import Textfield from '@mui/material/TextField';
import { useAppContext } from '../../context/AppContext';

import type { EditorChildren } from '../../utils/types';
import Box from '@mui/material/Box';

const Prayers = ({ handleChange }: EditorChildren) => {
	const { content } = useAppContext();
	return (
		<Box sx={{ marginTop: '16px' }}>
			<Textfield
				name="openingPrayer"
				value={content.openingPrayer}
				onChange={handleChange}
				fullWidth
				label="Opening Prayer"
				sx={{ mb: 2 }}
			/>

			<Textfield
				name="closingPrayer"
				value={content.closingPrayer}
				onChange={handleChange}
				fullWidth
				label="Closing Prayer"
				sx={{ mb: 2 }}
			/>
		</Box>
	);
};

export default Prayers;
