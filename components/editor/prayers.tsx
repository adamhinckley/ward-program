import Textfield from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAppContext } from '../../context/AppContext';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';

import type { EditorChildren } from '../../utils/types';

const Prayers = ({ handleChange }: EditorChildren) => {
	const { content } = useAppContext();
	return (
		<Accordion sx={{ padding: '0 12px 6px 12px' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="h6">Prayers</Typography>
			</AccordionSummary>
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
		</Accordion>
	);
};

export default Prayers;
