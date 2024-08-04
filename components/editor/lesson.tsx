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
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Controls from './controls';

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

	const handleDeleteLessonIndex = (index: number) => {
		const newContent = cloneDeep(content);
		const narrowedAnnouncementsAndLessons =
			newContent.announcementsAndLessons as AnnouncementsAndLessons;
		const narrowedIndex = narrowedAnnouncementsAndLessons[titleIndex] as Lesson;
		narrowedIndex.lessons.splice(index, 1);
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
						<AutoStoriesIcon
							sx={{ fontSize: '1.5rem', color: '#035efc', marginRight: '12px' }}
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

			{<Divider sx={{ margin: '12px 0 24px 0' }} />}

			{data.lessons.map((lesson, index) => {
				return (
					<div key={index}>
						<div className="min-w-full flex">
							<div className="min-w-full mr-10">
								<Textfield
									name={`link`}
									value={lesson.link}
									onChange={(e) => handleChange(e, index, 'link')}
									fullWidth
									label="Link"
									sx={{ mb: 2, paddingRight: '40px' }}
								/>
								<Textfield
									name={`text`}
									value={lesson.text}
									onChange={(e) => handleChange(e, index, 'text')}
									fullWidth
									label="Text"
									sx={{ mb: 2, paddingRight: '40px' }}
								/>
							</div>
							<Tooltip title="Delete Lesson">
								<IconButton
									onClick={() => handleDeleteLessonIndex(index)}
									sx={{
										marginLeft: ' -74px',
										height: '40px',
										alignSelf: 'center',
									}}
								>
									<ClearIcon color="error" />
								</IconButton>
							</Tooltip>
						</div>
						<Divider sx={{ margin: '12px 0 24px 0' }} />
					</div>
				);
			})}
			<div className="flex justify-center">
				<Tooltip title="Add Lesson">
					<IconButton
						onClick={handleAddLessonIndex}
						sx={{ width: '40px', margin: '12px 0' }}
					>
						<AddIcon />
					</IconButton>
				</Tooltip>
			</div>
		</Accordion>
	);
};

export default LessonEditor;
