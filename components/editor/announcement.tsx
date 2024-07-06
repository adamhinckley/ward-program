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

import type { Announcement, AnnouncementsAndLessons } from '@/utils/defaultContent';
import { Label } from '@mui/icons-material';

type AnnouncementProps = {
	data: Announcement;
	index: number;
};

const AnnouncementEditor = ({ data, index }: AnnouncementProps) => {
	const { setContent, content, handleDeleteBlock } = useAppContext();

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

	return (
		<Accordion sx={{ padding: '0 12px 6px 12px' }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				className="flex justify-between w-full"
			>
				<div className="flex flex-col">
					<Typography variant="h6">Announcement Block</Typography>
					<Typography sx={{ fontSize: `${12 / 16}rem` }}>{data.title}</Typography>
				</div>
				<IconButton
					onClick={() => handleDeleteBlock(index)}
					sx={{
						height: '40px',
						position: 'absolute',
						right: '-55px',
						top: '17px',
					}}
				>
					<DeleteForeverIcon color="error" />
				</IconButton>
			</AccordionSummary>
			<Textfield
				value={data.title}
				onChange={handleTitleChange}
				label="Announcement Title"
				sx={{ mb: 2 }}
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
					<IconButton
						onClick={() => handleDeleteAnnouncementIndex(index)}
						sx={{
							height: '40px',
							margin: '42px 0 0',
							position: 'absolute',
							right: '-40px',
							top: '-22px',
						}}
					>
						<DeleteForeverIcon color="error" />
					</IconButton>
				</div>
			))}
			<div className="flex justify-center">
				<IconButton
					onClick={() => handleAddAnnouncementIndex()}
					sx={{ width: '40px', marginTop: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>
		</Accordion>
	);
};

export default AnnouncementEditor;
