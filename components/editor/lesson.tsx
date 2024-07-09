import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { useAppContext } from '@/context/AppContext';
import Textfield from '@mui/material/TextField';
import cloneDeep from 'lodash/cloneDeep';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import set from 'lodash/set';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';

import type { Lesson, AnnouncementsAndLessons, Lessons } from '@/utils/defaultContent';
import type { ChangeEvent } from 'react';

type LessonProps = {
	data: Lesson;
	index: number;
};

const LessonEditor = ({ data, index }: LessonProps) => {
	const { setContent, content, handleDeleteBlock } = useAppContext();

	const narrowedAnnouncementEditorsAndLessons =
		content.announcementsAndLessons as AnnouncementsAndLessons;
	// find the index of the title in content.announcementsAndLessons
	const titleIndex = narrowedAnnouncementEditorsAndLessons.findIndex(
		(item) => item.title === data.title,
	);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number,
		name: 'link' | 'text',
	) => {
		const { value } = e.target;
		const newContent = cloneDeep(content);
		const narrowedAnnouncementsAndLessons =
			newContent.announcementsAndLessons as AnnouncementsAndLessons;
		const narrowedIndex = narrowedAnnouncementsAndLessons[titleIndex] as Lesson;
		const narrowedLesson = narrowedIndex.lessons[index];
		set(narrowedLesson, name, value);

		setContent(newContent);
	};

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newContent = cloneDeep(content);
		const narrowedAnnouncementsAndLessons =
			newContent.announcementsAndLessons as AnnouncementsAndLessons;
		const narrowedIndex = narrowedAnnouncementsAndLessons[titleIndex] as Lesson;
		narrowedIndex.title = e.target.value;
		setContent(newContent);
	};

	const handleAddLessonIndex = () => {
		const newContent = cloneDeep(content);
		const narrowedAnnouncementsAndLessons =
			newContent.announcementsAndLessons as AnnouncementsAndLessons;
		const narrowedIndex = narrowedAnnouncementsAndLessons[titleIndex] as Lesson;
		narrowedIndex.lessons.push({ link: '', text: '' });
		setContent(newContent);
	};

	const handleDeleteLessonIndex = () => {
		const newContent = cloneDeep(content);
		const narrowedAnnouncementsAndLessons =
			newContent.announcementsAndLessons as AnnouncementsAndLessons;
		const narrowedIndex = narrowedAnnouncementsAndLessons[titleIndex] as Lesson;
		narrowedIndex.lessons.pop();
		setContent(newContent);
	};

	return (
		<Accordion sx={{ padding: '0 12px 6px 12px' }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				className="flex justify-between w-full"
			>
				<div className="flex flex-col">
					<Typography variant="h6">Lesson Block</Typography>
					<Typography sx={{ fontSize: `${12 / 16}rem` }}>{data.title}</Typography>
				</div>
				<Tooltip title="Delete Block">
					<IconButton
						onClick={() => handleDeleteBlock(index)}
						sx={{
							height: '40px',
							position: 'absolute',
							right: '-55px',
							top: '17px',
						}}
						className="text-red-600"
						color="error"
						// variant="contained"
					>
						<DeleteForeverIcon color="error" />
					</IconButton>
				</Tooltip>
			</AccordionSummary>
			<Textfield
				value={data.title}
				onChange={handleTitleChange}
				label="Announcement Title"
				sx={{ mb: 2 }}
				fullWidth
			/>
			{data.lessons.map((lesson, index) => {
				return (
					<div className="flex relative" key={index}>
						<div className="min-w-full">
							<Textfield
								name={`link`}
								value={lesson.link}
								onChange={(e) => handleChange(e, index, 'link')}
								fullWidth
								label="Link"
								sx={{ mb: 2 }}
							/>
							<Textfield
								name={`text`}
								value={lesson.text}
								onChange={(e) => handleChange(e, index, 'text')}
								fullWidth
								label="Text"
								sx={{ mb: 2 }}
							/>
							{index < data.lessons.length - 1 && (
								<Divider sx={{ margin: '12px 0' }} />
							)}
						</div>
						<Tooltip title="Delete Lesson">
							<IconButton
								onClick={handleDeleteLessonIndex}
								sx={{
									height: '40px',
									margin: '42px 0 0',
									position: 'absolute',
									right: '-40px',
								}}
							>
								<ClearIcon color="error" />
							</IconButton>
						</Tooltip>
					</div>
				);
			})}
			<div className="flex justify-center">
				<IconButton
					onClick={handleAddLessonIndex}
					sx={{ width: '40px', marginTop: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>
		</Accordion>
	);
};

export default LessonEditor;
