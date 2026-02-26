import { useAppContext } from '../../context/AppContext';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
				<h3 className="text-base font-semibold">{blockHeader[blockName].header}</h3>
				<p className="mb-2 text-xs">{blockHeader[blockName].content}</p>
			</div>
			{Array.isArray(content[blockName]) &&
				(content[blockName] as Array<any>).map((block: BlockOneItem, index) => (
					<div
						className="flex relative justify-between content-center min-w-full items-center mb-6"
						key={index}
					>
						<div className="grid w-[46%] gap-2">
							<Label htmlFor={`${blockName}-${index}-left`}>{leftLabel}</Label>
							<Input
								id={`${blockName}-${index}-left`}
								name="left"
								value={block.left || ''}
								onChange={(e) => handleChange(e, blockName, index)}
							/>
						</div>
						<div className="grid w-[46%] gap-2">
							<Label htmlFor={`${blockName}-${index}-right`}>{rightLabel}</Label>
							<Input
								id={`${blockName}-${index}-right`}
								name="right"
								value={block.right || ''}
								onChange={(e) => handleChange(e, blockName, index)}
							/>
						</div>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-10 w-10 text-red-500 mt-5"
							onClick={() =>
								handleDeleteBlockIndex && handleDeleteBlockIndex(blockName, index)
							}
						>
							<Trash2 className="h-5 w-5" />
						</Button>
					</div>
				))}
			<div className="flex justify-center">
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={() => handleAddBlockIndex && handleAddBlockIndex(blockName)}
					className="mb-3"
				>
					<Plus className="h-5 w-5" />
				</Button>
			</div>
		</>
	);
};

export default Block;
