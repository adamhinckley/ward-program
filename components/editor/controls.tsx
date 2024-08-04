import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
import { useAppContext } from '@/context/AppContext';
import cloneDeep from 'lodash/cloneDeep';

import type { AnnouncementsAndLessons, Announcement } from '@/utils/defaultContent';

type ControlsProps = {
	index: number;
};

const Controls = ({ index }: ControlsProps) => {
	const { setContent, content } = useAppContext();

	const contentArray = content.announcementsAndLessons as AnnouncementsAndLessons;

	const handleReorder = (e: React.MouseEvent<HTMLButtonElement>, direction: 'up' | 'down') => {
		e.stopPropagation();
		const newContent = cloneDeep(content);
		const narrowedAnnouncementsAndLessons =
			newContent.announcementsAndLessons as AnnouncementsAndLessons;
		const newIndex = narrowedAnnouncementsAndLessons[index] as Announcement;
		const currentIndex = narrowedAnnouncementsAndLessons.indexOf(newIndex);
		const newIndexPosition = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
		if (newIndexPosition < 0 || newIndexPosition >= narrowedAnnouncementsAndLessons.length) {
			return;
		}
		narrowedAnnouncementsAndLessons[currentIndex] =
			narrowedAnnouncementsAndLessons[newIndexPosition];
		narrowedAnnouncementsAndLessons[newIndexPosition] = newIndex;
		setContent(newContent);
	};

	const handleDeleteBlock = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.stopPropagation();

		const newContent = cloneDeep(content);
		Array.isArray(newContent.announcementsAndLessons) &&
			newContent.announcementsAndLessons.splice(index, 1);
		setContent(newContent);
	};

	return (
		<div>
			{index > 0 && (
				<Tooltip title="Move Up">
					<IconButton
						onClick={(e) => handleReorder(e, 'up')}
						sx={index >= contentArray.length - 1 ? { marginRight: '40px' } : null}
					>
						<ArrowUpwardIcon />
					</IconButton>
				</Tooltip>
			)}
			{index < contentArray.length - 1 && (
				<Tooltip title="Move Down">
					<IconButton onClick={(e) => handleReorder(e, 'down')}>
						<ArrowDownwardIcon />
					</IconButton>
				</Tooltip>
			)}
			<Tooltip title="Delete">
				<IconButton onClick={(e) => handleDeleteBlock(e, index)}>
					<DeleteForeverIcon color="error" />
				</IconButton>
			</Tooltip>
		</div>
	);
};

export default Controls;
