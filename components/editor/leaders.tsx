import Textfield from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAppContext } from '@/context/AppContext';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import type { EditorChildren } from '@/utils/types';

const Leaders = ({ handleChange }: EditorChildren) => {
	const { content } = useAppContext();
	return (
		<>
			<Typography variant="h6">Leaders</Typography>
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
		</>
	);
};

export default Leaders;
