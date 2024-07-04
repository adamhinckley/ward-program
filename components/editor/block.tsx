import Textfield from '@mui/material/Textfield';
import Typography from '@mui/material/Typography';
import { useAppContext } from '../context/AppContext';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Divider from '@mui/material/Divider';

import type { EditorChildren, BlockName } from '@/utils/types';
import type { BlockOneItem } from '@/utils/defaultContent';

type ExtendedEditorChildren = EditorChildren & { blockName: BlockName };

const Block = ({
	handleChange,
	handleDeleteBlockIndex,
	handleAddBlockIndex,
	blockName,
}: ExtendedEditorChildren) => {
	const { content } = useAppContext();

	const blockHeader = {
		blockOne: {
			header: 'Block One',
			content: 'Before passing of the sacrament',
		},
		blockTwo: {
			header: 'Block Two',
			content: 'After passing of the sacrament',
		},
		blockThree: {
			header: 'Block Three',
			content: 'After intermediate music',
		},
	};

	return (
		<Accordion sx={{ padding: '0 12px 6px 12px' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<div className="flex flex-col">
					<Typography variant="h6">{blockHeader[blockName].header}</Typography>
					<Typography sx={{ mb: 2, fontSize: `${12 / 16}rem` }}>
						{blockHeader[blockName].content}
					</Typography>
				</div>
			</AccordionSummary>
			{Array.isArray(content[blockName]) &&
				(content[blockName] as Array<any>).map((block: BlockOneItem, index) => (
					<div className="flex relative" key={index}>
						<div className="min-w-full">
							<Textfield
								name="left"
								value={block.left}
								onChange={(e) => handleChange(e, blockName, index)}
								fullWidth
								label="left side"
								sx={{ mb: 2 }}
							/>
							<Textfield
								name="right"
								value={block.right}
								onChange={(e) => handleChange(e, blockName, index)}
								label="right side"
								fullWidth
							/>
							{Array.isArray(content.blockOne) &&
								index < content.blockOne.length - 1 && (
									<Divider sx={{ margin: '12px 0' }} />
								)}
						</div>
						<IconButton
							onClick={() =>
								handleDeleteBlockIndex && handleDeleteBlockIndex(blockName, index)
							}
							sx={{
								height: '40px',
								margin: '42px 0 0',
								position: 'absolute',
								right: '-40px',
							}}
						>
							<DeleteForeverIcon color="error" />
						</IconButton>
					</div>
				))}
			<div className="flex justify-center">
				<IconButton
					onClick={() => handleAddBlockIndex && handleAddBlockIndex(blockName)}
					sx={{ width: '40px', marginTop: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>
		</Accordion>
	);
};

export default Block;
