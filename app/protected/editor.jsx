'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Textfield from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import { useAppContext } from '../../context/AppContext';
import Leaders from '@/components/editor/leaders';
import Music from '@/components/editor/music';
import Prayers from '@/components/editor/prayers';
import Block from '@/components/editor/block';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Tiptap from '@/components/editor/Tiptap';
import SaveButton from '@/components/editor/SaveButton';

const styles = css`
	.MuiTabs-flexContainer {
		justify-content: space-between;
	}
`;

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
	const { content, setContent, currentTab, setCurrentTab } = useAppContext();

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

	const TabPanel = (props) => {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`sidebar-tabpanel-${index}`}
				aria-labelledby={`sidebar-tab-${index}`}
				{...other}
			>
				{value === index && <div>{children}</div>}
			</div>
		);
	};

	const a11yProps = (index) => {
		return {
			id: `tab-${index}`,
			'aria-controls': `tabpanel-${index}`,
		};
	};

	const handleTabChange = (_, newValue) => {
		setCurrentTab(newValue);
	};

	return (
		<div className="max-w-4xl flex justify-center flex-col m-auto p-4" css={styles}>
			<SaveButton />
			<Tabs
				value={currentTab}
				onChange={handleTabChange}
				aria-label="order customizer module tabs"
			>
				<Tab label="Settings" {...a11yProps(0)} />
				<Tab label="Leaders" {...a11yProps(1)} />
				<Tab label="Music" {...a11yProps(2)} />
				<Tab label="Prayers" {...a11yProps(3)} />
				<Tab label="Blocks" {...a11yProps(4)} />
				<Tab label="Announcements" {...a11yProps(5)} />
			</Tabs>
			<TabPanel value={currentTab} index={0}>
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
			</TabPanel>
			<TabPanel value={currentTab} index={1}>
				<Leaders handleChange={handleChange} />
			</TabPanel>
			<TabPanel value={currentTab} index={2}>
				<Music
					handleChange={handleChange}
					handleDeleteBlockIndex={handleDeleteBlockIndex}
					handleAddBlockIndex={handleAddBlockIndex}
				/>
			</TabPanel>
			<TabPanel value={currentTab} index={3}>
				<Prayers handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} />
			</TabPanel>
			<TabPanel value={currentTab} index={4}>
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
			</TabPanel>
			<TabPanel value={currentTab} index={5}>
				<Tiptap />
			</TabPanel>
		</div>
	);
};

export default Editor;
