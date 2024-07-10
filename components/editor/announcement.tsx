import { MouseEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { useAppContext } from '@/context/AppContext';
import cloneDeep from 'lodash/cloneDeep';
import Textfield from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import CampaignIcon from '@mui/icons-material/Campaign';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import type { Announcement, AnnouncementsAndLessons } from '@/utils/defaultContent';
import Controls from './controls';

type AnnouncementProps = {
	data: Announcement;
	index: number;
};

const AnnouncementEditor = ({ data, index }: AnnouncementProps) => {
	const { setContent, content, handleDeleteBlock } = useAppContext();
	const [expanded, setExpanded] = useState(false);

	const narrowedAnnouncementEditorsAndLessons =
		content.announcementsAndLessons as AnnouncementsAndLessons;
	// find the index of the title in content.announcementsAndLessons
	const titleIndex = narrowedAnnouncementEditorsAndLessons.findIndex(
		(item) => item.title === data.title,
	);
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
		const newContent = cloneDeep(content);
		const narrowedAnnouncementsAndLessons =
			newContent.announcementsAndLessons as AnnouncementsAndLessons;
		const narrowedIndex = narrowedAnnouncementsAndLessons[titleIndex] as Announcement;
		narrowedIndex.text[index] = e.target.value;
		setContent(newContent);
	};

	const handleDeleteAnnouncementIndex = (index: number) => {
		const newContent = cloneDeep(content);
		const narrowedAnnouncementsAndLessons =
			newContent.announcementsAndLessons as AnnouncementsAndLessons;
		const narrowedIndex = narrowedAnnouncementsAndLessons[titleIndex] as Announcement;
		narrowedIndex.text.splice(index, 1);
		setContent(newContent);
	};

	const handleAddAnnouncementIndex = () => {
		const newContent = cloneDeep(content);
		const narrowedAnnouncementsAndLessons =
			newContent.announcementsAndLessons as AnnouncementsAndLessons;
		const narrowedIndex = narrowedAnnouncementsAndLessons[titleIndex] as Announcement;
		narrowedIndex.text.push('');
		setContent(newContent);
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newContent = cloneDeep(content);
		const narrowedAnnouncementsAndLessons =
			newContent.announcementsAndLessons as AnnouncementsAndLessons;
		const narrowedIndex = narrowedAnnouncementsAndLessons[titleIndex] as Announcement;
		narrowedIndex.title = e.target.value;
		setContent(newContent);
	};

	const handleReorder = (e: React.MouseEvent<HTMLButtonElement>, direction: 'up' | 'down') => {
		e.stopPropagation();
		const newContent = cloneDeep(content);
		const narrowedAnnouncementsAndLessons =
			newContent.announcementsAndLessons as AnnouncementsAndLessons;
		const newIndex = narrowedAnnouncementsAndLessons[titleIndex] as Announcement;
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

	return (
		<Accordion sx={{ padding: '0 12px 6px 12px' }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				className="flex justify-between w-full"
			>
				<div className="flex justify-between w-full items-center ">
					<div className="flex ">
						<CampaignIcon
							sx={{ fontSize: '1.5rem', color: '#FFA500', marginRight: '12px' }}
						/>
						<div>
							<Typography variant="h6">{data.title}</Typography>
						</div>
					</div>
					<Controls index={index} />
				</div>
			</AccordionSummary>
			<Textfield
				value={data.title}
				onChange={handleTitleChange}
				label="Announcement Title"
				sx={{ mb: 2, paddingRight: '40px' }}
				fullWidth
			/>
			{data.text.map((announcement, index) => (
				<div className="flex relative" key={index}>
					<TextareaAutosize
						name={`${data.title} ${index}`}
						value={announcement}
						onChange={(e) => handleChange(e, index)}
						minRows={3}
						maxRows={20}
						style={{
							width: '100%',
							marginBottom: '12px',
							border: '1px solid #ccc',
							borderRadius: '4px',
						}}
					/>
					<Tooltip title="Delete Announcement">
						<IconButton
							onClick={() => handleDeleteAnnouncementIndex(index)}
							sx={{
								height: '40px',
								alignSelf: 'center',
								marginBottom: '12px',
							}}
						>
							<ClearIcon color="error" />
						</IconButton>
					</Tooltip>
				</div>
			))}
			<div className="flex justify-center">
				<Tooltip title="Add Announcement">
					<IconButton
						onClick={() => handleAddAnnouncementIndex()}
						sx={{ width: '40px', marginBottom: '12px' }}
					>
						<AddIcon />
					</IconButton>
				</Tooltip>
			</div>
		</Accordion>
	);
};

export default AnnouncementEditor;
