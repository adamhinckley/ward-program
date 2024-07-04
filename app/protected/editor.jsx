'use client';
import Textfield from '@mui/material/Textfield';
import { Button, Divider, IconButton, TextareaAutosize, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import Switch from '@mui/material/Switch';
import { useAppContext } from '@/components/context/AppContext';
import Leaders from '@/components/editor/leaders';
import Music from '@/components/editor/music';
import Prayers from '@/components/editor/prayers';
import { createClient } from '@/utils/supabase/client';
import Block from '@/components/editor/block';
import { defaultContent } from '@/utils/defaultContent';
import AnnouncementEditor from '@/components/editor/announcement';
const Editor = () => {
	const supabase = createClient();
	const { content, setContent } = useAppContext();

	// return loading if content is not available
	// check if content is an empty object
	// if (Object.keys(content).length === 0) {
	// 	return <div>Loading...</div>;
	// }
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
				console.log('array of strings');
				const newBlock = content[block].map((item, i) => {
					if (i === index) {
						return e.target.value; // Update the string at the specified index
					}
					return item;
				});
				console.log('newBlock', newBlock);
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
		console.log('value', e.target.value);
		console.log('block', block);
		console.log('index', index);
		setContent({ ...content, [e.target.name]: e.target.value });
	};

	const handleSave = async () => {
		try {
			const { data, error } = await supabase
				.from('ward-bulletin')
				.update({ bulletin: content }) // Assuming 'bulletin' is the column you want to update.
				.eq('id', 2)
				.select();

			if (error) {
				console.error('Error updating data:', error);
				return;
			}

			console.log('Data updated successfully:', data);
		} catch (error) {
			console.error('Error caught:', error);
		}
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
		if (
			block === 'wardAnnouncements' ||
			block === 'reliefSocietyActivities' ||
			block === 'priesthoodActivities' ||
			block === 'primaryAnnouncements' ||
			block === 'buildingCleaningSchedule' ||
			block === 'familyHistoryCorner' ||
			block === 'wardFocusTempleCorner'
		) {
			const newAnnouncement = content[block].concat('');
			setContent({ ...content, [block]: newAnnouncement });
			return;
		}
		console.log('fired');
		setContent({ ...content, [block]: [...content[block], { left: '', right: '' }] });
	};
	const handleDeleteBlockIndex = (block, index) => {
		if (block === 'intermediateMusicPerformers') {
			const newPerformers = content.intermediateMusicPerformers.filter((_, i) => i !== index);
			setContent({ ...content, intermediateMusicPerformers: newPerformers });
		} else {
			console.log('content', block, content);
			const newBlock = content[block].filter((_, i) => i !== index);
			setContent({ ...content, [block]: newBlock });
		}
	};
	return (
		<div className="max-w-lg flex justify-center flex-col m-auto p-4">
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
				name="imageUrl"
				value={content.imageUrl}
				onChange={handleChange}
				fullWidth
				label="Image URL"
				sx={{ mb: 2 }}
			/>
			<Leaders handleChange={handleChange} />
			<Music
				handleChange={handleChange}
				handleDeleteBlockIndex={handleDeleteBlockIndex}
				handleAddBlockIndex={handleAddBlockIndex}
				handleCheckboxChange={handleCheckboxChange}
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
			{content.announcementsAndLessons.map((data, index) => {
				// return <div key={index}>{data.type}</div>;
				return data.type === 'announcement' ? (
					<AnnouncementEditor data={data} index={index} key={index} />
				) : (
					<div key={index}>{content.title}</div>
				);
			})}

			<Typography variant="h6">Ward Announcements</Typography>
			{content.wardAnnouncements.map((announcement, index) => (
				<div className="flex relative" key={index}>
					<TextareaAutosize
						name={`wardAnnouncements ${index}`}
						value={announcement}
						onChange={(e) => handleChange(e, 'wardAnnouncements', index)}
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
						onClick={() => handleDeleteBlockIndex('wardAnnouncements', index)}
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
					onClick={() => handleAddBlockIndex('wardAnnouncements')}
					sx={{ width: '40px', marginTop: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>
			<Typography variant="h6">Relief Society Lessons</Typography>
			{content.reliefSocietyLessons.map((lesson, index) => (
				<div className="flex relative" key={index}>
					<div className="min-w-full">
						<Textfield
							name={`link`}
							value={lesson.link}
							onChange={(e) => handleChange(e, 'reliefSocietyLessons', index)}
							fullWidth
							label="Link"
							sx={{ mb: 2 }}
						/>
						<Textfield
							name={`text`}
							value={lesson.text}
							onChange={(e) => handleChange(e, 'reliefSocietyLessons', index)}
							fullWidth
							label="Text"
							sx={{ mb: 2 }}
						/>
						{index < content.reliefSocietyLessons.length - 1 && (
							<Divider sx={{ margin: '12px 0' }} />
						)}
					</div>
					<IconButton
						onClick={() => handleDeleteBlockIndex('reliefSocietyLessons', index)}
						sx={{
							height: '40px',
							margin: '42px 0 0',
							position: 'absolute',
							right: '-40px',
						}}
					>
						<DeleteForeverIcon color="error" />
					</IconButton>
				</div>
			))}
			<div className="flex justify-center">
				<IconButton
					onClick={() => handleAddBlockIndex('reliefSocietyLessons')}
					sx={{ width: '40px', marginTop: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>
			<Typography variant="h6">Relief Society Activities</Typography>
			{content.reliefSocietyActivities.map((activity, index) => (
				<div className="flex relative" key={index}>
					<TextareaAutosize
						name={`reliefSocietyActivities ${index}`}
						value={activity}
						onChange={(e) => handleChange(e, 'reliefSocietyActivities', index)}
						minRows={3}
						maxRows={6}
						style={{
							width: '100%',
							marginBottom: '12px',
							border: '1px solid #ccc',
							borderRadius: '4px',
						}}
					/>
					<IconButton
						onClick={() => handleDeleteBlockIndex('reliefSocietyActivities', index)}
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
					onClick={() => handleAddBlockIndex('reliefSocietyActivities')}
					sx={{ width: '40px', marginTop: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>
			<Typography variant="h6">Priesthood Lessons</Typography>
			{content.priesthoodLessons.map((lesson, index) => (
				<div className="flex relative" key={index}>
					<div className="min-w-full">
						<Textfield
							name={`link`}
							value={lesson.link}
							onChange={(e) => handleChange(e, 'priesthoodLessons', index)}
							fullWidth
							label="Link"
							sx={{ mb: 2 }}
						/>
						<Textfield
							name={`text`}
							value={lesson.text}
							onChange={(e) => handleChange(e, 'priesthoodLessons', index)}
							fullWidth
							label="Text"
							sx={{ mb: 2 }}
						/>
						{index < content.priesthoodLessons.length - 1 && (
							<Divider sx={{ margin: '12px 0' }} />
						)}
					</div>
					<IconButton
						onClick={() => handleDeleteBlockIndex('priesthoodLessons', index)}
						sx={{
							height: '40px',
							margin: '42px 0 0',
							position: 'absolute',
							right: '-40px',
						}}
					>
						<DeleteForeverIcon color="error" />
					</IconButton>
				</div>
			))}
			<div className="flex justify-center">
				<IconButton
					onClick={() => handleAddBlockIndex('priesthoodLessons')}
					sx={{ width: '40px', marginTop: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>
			<Typography variant="h6">Priesthood Activities</Typography>
			{content.priesthoodActivities.map((activity, index) => (
				<div className="flex relative" key={index}>
					<TextareaAutosize
						name={`priesthoodActivities ${index}`}
						value={activity}
						onChange={(e) => handleChange(e, 'priesthoodActivities', index)}
						minRows={3}
						maxRows={6}
						style={{
							width: '100%',
							marginBottom: '12px',
							border: '1px solid #ccc',
							borderRadius: '4px',
						}}
					/>
					<IconButton
						onClick={() => handleDeleteBlockIndex('priesthoodActivities', index)}
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
					onClick={() => handleAddBlockIndex('priesthoodActivities')}
					sx={{ width: '40px', marginTop: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>
			<Typography variant="h6">Sunday School Lessons</Typography>
			{content.sundaySchoolLessons.map((lesson, index) => (
				<div className="flex relative" key={index}>
					<div className="min-w-full">
						<Textfield
							name={`link`}
							value={lesson.link}
							onChange={(e) => handleChange(e, 'sundaySchoolLessons', index)}
							fullWidth
							label="Link"
							sx={{ mb: 2 }}
						/>
						<Textfield
							name={`text`}
							value={lesson.text}
							onChange={(e) => handleChange(e, 'sundaySchoolLessons', index)}
							fullWidth
							label="Text"
							sx={{ mb: 2 }}
						/>
						{index < content.sundaySchoolLessons.length - 1 && (
							<Divider sx={{ margin: '12px 0' }} />
						)}
					</div>
					<IconButton
						onClick={() => handleDeleteBlockIndex('sundaySchoolLessons', index)}
						sx={{
							height: '40px',
							margin: '42px 0 0',
							position: 'absolute',
							right: '-40px',
						}}
					>
						<DeleteForeverIcon color="error" />
					</IconButton>
				</div>
			))}
			<div className="flex justify-center">
				<IconButton
					onClick={() => handleAddBlockIndex('sundaySchoolLessons')}
					sx={{ width: '40px', marginTop: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>
			<Typography variant="h6">Primary Announcements</Typography>
			{content.primaryAnnouncements.map((announcement, index) => (
				<div className="flex relative" key={index}>
					<TextareaAutosize
						name={`primaryAnnouncements ${index}`}
						value={announcement}
						onChange={(e) => handleChange(e, 'primaryAnnouncements', index)}
						minRows={3}
						maxRows={6}
						style={{
							width: '100%',
							marginBottom: '12px',
							border: '1px solid #ccc',
							borderRadius: '4px',
						}}
					/>
					<IconButton
						onClick={() => handleDeleteBlockIndex('primaryAnnouncements', index)}
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
					onClick={() => handleAddBlockIndex('primaryAnnouncements')}
					sx={{ width: '40px', marginTop: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>
			<Typography variant="h6">Building Cleaning Schedule</Typography>
			{content.buildingCleaningSchedule.map((schedule, index) => (
				<div className="flex relative" key={index}>
					<TextareaAutosize
						name={`buildingCleaningSchedule ${index}`}
						value={schedule}
						onChange={(e) => handleChange(e, 'buildingCleaningSchedule', index)}
						minRows={3}
						maxRows={6}
						style={{
							width: '100%',
							marginBottom: '12px',
							border: '1px solid #ccc',
							borderRadius: '4px',
						}}
					/>
					<IconButton
						onClick={() => handleDeleteBlockIndex('buildingCleaningSchedule', index)}
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
					onClick={() => handleAddBlockIndex('buildingCleaningSchedule')}
					sx={{ width: '40px', marginTop: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>
			<Typography variant="h6">Family History Corner</Typography>
			{content.familyHistoryCorner.map((corner, index) => (
				<div className="flex relative" key={index}>
					<TextareaAutosize
						name={`familyHistoryCorner ${index}`}
						value={corner}
						onChange={(e) => handleChange(e, 'familyHistoryCorner', index)}
						minRows={3}
						maxRows={6}
						style={{
							width: '100%',
							marginBottom: '12px',
							border: '1px solid #ccc',
							borderRadius: '4px',
						}}
					/>
					<IconButton
						onClick={() => handleDeleteBlockIndex('familyHistoryCorner', index)}
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
					onClick={() => handleAddBlockIndex('familyHistoryCorner')}
					sx={{ width: '40px', marginTop: '12px' }}
				>
					<AddIcon />
				</IconButton>
			</div>

			<Button type="submit" onClick={handleSave}>
				Save
			</Button>
		</div>
	);
};

export default Editor;
