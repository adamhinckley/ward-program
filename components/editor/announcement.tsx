import IconButton from '@mui/material/IconButton';
import { TextareaAutosize } from '@mui/material';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { useAppContext } from '../context/AppContext';
import cloneDeep from 'lodash/cloneDeep';

import type { Announcement, AnnouncementsAndLessons } from '@/utils/defaultContent';

type AnnouncementProps = {
	data: Announcement;
	index: number;
};

const AnnouncementEditor = ({ data, index }: AnnouncementProps) => {
	const { setContent, content } = useAppContext();

	const narrowedAnnouncementEditorsAndLessons =
		content.announcementsAndLessons as AnnouncementsAndLessons;
	// find the index of the title in content.announcementsAndLessons
	const titleIndex = narrowedAnnouncementEditorsAndLessons.findIndex(
		(item) => item.title === data.title,
	);
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
		const newContent = { ...content };
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

	return (
		<>
			<Typography variant="h6">{data.title}</Typography>
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
		</>
	);
};

export default AnnouncementEditor;
