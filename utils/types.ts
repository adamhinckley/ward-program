export type EditorChildren = {
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		block?: string,
		index?: number,
	) => void;
	handleAddBlockIndex?: (block: string) => void;
	handleDeleteBlockIndex?: (block: string, index: number) => void;
	handleCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type BlockName = 'blockOne' | 'blockTwo' | 'blockThree';
