import Textfield from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAppContext } from '../../context/AppContext';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
			content: 'Before passing of the sacrament, i.e. confirmation, baby blessing, etc.',
		},
		blockTwo: {
			header: 'Block Two',
			content: 'After passing of the sacrament.',
		},
		blockThree: {
			header: 'Block Three',
			content: 'After intermediate music.',
		},
		wardContacts: {
			header: 'Ward Contacts',
			content: 'Shows up in contacts tab',
		},
	};

	const leftLabel = blockName === 'wardContacts' ? 'Name' : 'Left side';
	const rightLabel = blockName === 'wardContacts' ? 'Phone' : 'Right side';

	return (
		<>
			<div className="flex flex-col">
				<Typography variant="h6">{blockHeader[blockName].header}</Typography>
				<Typography sx={{ mb: 2, fontSize: `${12 / 16}rem` }}>
					{blockHeader[blockName].content}
				</Typography>
			</div>
			{Array.isArray(content[blockName]) &&
				(content[blockName] as Array<any>).map((block: BlockOneItem, index) => (
					<div
						className="flex relative justify-between content-center min-w-full items-center"
						key={index}
					>
						{/* <div className="min-w-full flex justify-between content-center"> */}
						<Textfield
							name="left"
							value={block.left || ''}
							onChange={(e) => handleChange(e, blockName, index)}
							label={leftLabel}
							sx={{ mb: 2, width: '46%' }}
						/>
						<Textfield
							name="right"
							value={block.right || ''}
							onChange={(e) => handleChange(e, blockName, index)}
							label={rightLabel}
							sx={{ mb: 2, width: '46%' }}
						/>
						<IconButton
							onClick={() =>
								handleDeleteBlockIndex && handleDeleteBlockIndex(blockName, index)
							}
							sx={{
								height: '40px',
							}}
						>
							<DeleteForeverIcon sx={{ color: '#ef4444 !important' }} />
						</IconButton>
					</div>
				))}
			<div className="flex justify-center">
				<IconButton
					onClick={() => handleAddBlockIndex && handleAddBlockIndex(blockName)}
					sx={{ width: '40px', marginBottom: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>
		</>
	);
};

export default Block;
