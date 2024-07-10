'use client';
import Textfield from '@mui/material/TextField';
import { Button, Divider, IconButton, TextareaAutosize, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import Switch from '@mui/material/Switch';
import { useAppContext } from '../../context/AppContext';
import Leaders from '@/components/editor/leaders';
import Music from '@/components/editor/music';
import Prayers from '@/components/editor/prayers';
import Block from '@/components/editor/block';
import AnnouncementEditor from '@/components/editor/announcement';
import LessonEditor from '@/components/editor/lesson';
import CampaignIcon from '@mui/icons-material/Campaign';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const blankLessonBlock = {
	type: 'lesson',
	title: 'lesson placeholder',
	lessons: [
		{
			link: '',
			text: '',
		},
	],
};

const blankAnnouncementBlock = {
	type: 'announcement',
	title: 'announcement placeholder',
	text: [''],
};

const Editor = () => {
	const { content, setContent } = useAppContext();

	// return loading if content is not available
	// check if content is an empty object
	if (Object.keys(content).length === 0) {
		return <div>Loading...</div>;
	}
	/**
	 *
	 * @param {*} e
	 * @param {string}
	 * @param {*} index
	 * @returns
	 */

	const handleChange = (e, block, index) => {
		if (block) {
			if (block === 'intermediateMusic') {
				setContent({
					...content,
					[block]: { ...content[block], [e.target.name]: e.target.value },
				});
				return;
			}
			if (Array.isArray(content[block]) && typeof content[block][0] === 'string') {
				// Check if content[block] is an array of strings
				const newBlock = content[block].map((item, i) => {
					if (i === index) {
						return e.target.value; // Update the string at the specified index
					}
					return item;
				});
				setContent({ ...content, [block]: newBlock });
			} else {
				// Existing logic for an array of objects
				const newBlock = content[block].map((block, i) => {
					if (i === index) {
						return { ...block, [e.target.name]: e.target.value };
					}
					return block;
				});
				setContent({ ...content, [block]: newBlock });
			}
			return;
		}
		setContent({ ...content, [e.target.name]: e.target.value });
	};

	const handleCheckboxChange = (e) => {
		setContent({ ...content, [e.target.name]: e.target.checked });
	};

	const handleAddBlockIndex = (block) => {
		if (block === 'intermediateMusicPerformers') {
			const newPerformer = content.intermediateMusicPerformers.concat('');
			setContent({ ...content, intermediateMusicPerformers: newPerformer });
			return;
		}

		setContent({ ...content, [block]: [...content[block], { left: '', right: '' }] });
	};

	const addNewAnnouncementOrLessonBlock = (block) => {
		// push the new block to content.announcementsAndLessons
		if (block === 'announcement') {
			setContent({
				...content,
				announcementsAndLessons: [
					...content.announcementsAndLessons,
					blankAnnouncementBlock,
				],
			});
		} else {
			setContent({
				...content,
				announcementsAndLessons: [...content.announcementsAndLessons, blankLessonBlock],
			});
		}
	};

	const handleDeleteBlockIndex = (block, index) => {
		if (block === 'intermediateMusicPerformers') {
			const newPerformers = content.intermediateMusicPerformers.filter((_, i) => i !== index);
			setContent({ ...content, intermediateMusicPerformers: newPerformers });
		} else {
			const newBlock = content[block].filter((_, i) => i !== index);
			setContent({ ...content, [block]: newBlock });
		}
	};
	return (
		<div className="max-w-4xl flex justify-center flex-col m-auto p-4">
			<div className="bg-white p-4 mb-4">
				<div className="flex">
					<Typography variant="h6">Testimony Meeting</Typography>
					<Switch
						checked={content.isTestimonyMeeting}
						onChange={handleCheckboxChange}
						name="isTestimonyMeeting"
						inputProps={{ 'aria-label': 'controlled' }}
					/>
				</div>
				<Textfield
					name="title"
					value={content.title}
					onChange={handleChange}
					fullWidth
					label="title"
					sx={{ mb: 2 }}
				/>
				<Textfield
					name="imageUrl"
					value={content.imageUrl}
					onChange={handleChange}
					fullWidth
					label="Image URL"
					sx={{ mb: 2 }}
				/>
			</div>
			<Leaders handleChange={handleChange} />
			<Music
				handleChange={handleChange}
				handleDeleteBlockIndex={handleDeleteBlockIndex}
				handleAddBlockIndex={handleAddBlockIndex}
			/>
			<Prayers handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} />
			<Block
				handleChange={handleChange}
				handleDeleteBlockIndex={handleDeleteBlockIndex}
				handleAddBlockIndex={handleAddBlockIndex}
				blockName="blockOne"
			/>
			<Block
				handleChange={handleChange}
				handleDeleteBlockIndex={handleDeleteBlockIndex}
				handleAddBlockIndex={handleAddBlockIndex}
				blockName="blockTwo"
			/>
			<Block
				handleChange={handleChange}
				handleDeleteBlockIndex={handleDeleteBlockIndex}
				handleAddBlockIndex={handleAddBlockIndex}
				blockName="blockThree"
			/>
			<Typography variant="h6" sx={{ margin: '12px 0' }}>
				Announcements and Lessons:
			</Typography>
			{content.announcementsAndLessons.map((data, index) => {
				// return <div key={index}>{data.type}</div>;
				return data.type === 'announcement' ? (
					<AnnouncementEditor data={data} index={index} key={index} />
				) : (
					<LessonEditor data={data} index={index} key={index} />
				);
			})}
			<div className="flex justify-around py-4">
				<Button
					variant="contained"
					className="bg-gray-400 hover:bg-gray-500 flex items-center"
					onClick={() => addNewAnnouncementOrLessonBlock('announcement')}
					disableRipple
				>
					<CampaignIcon
						sx={{ fontSize: '1.5rem', color: '#FFA500', margin: '-4px 12px 0px 0' }}
					/>
					Add Announcement
				</Button>
				<Button
					variant="contained"
					className="bg-gray-400 hover:bg-gray-600"
					onClick={() => addNewAnnouncementOrLessonBlock('lesson')}
					disableRipple
				>
					<AutoStoriesIcon
						sx={{ fontSize: '1.5rem', color: '#035efc', margin: '-4px 12px 0px 0' }}
					/>
					Add Lesson
				</Button>
			</div>
		</div>
	);
};

export default Editor;
