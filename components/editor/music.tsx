import Textfield from '@mui/material/Textfield';
import Typography from '@mui/material/Typography';
import { useAppContext } from '../context/AppContext';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Switch from '@mui/material/Switch';

import type { EditorChildren } from '@/utils/types';
import { Collapse } from '@mui/material';

const MusicEditor = ({
	handleChange,
	handleDeleteBlockIndex,
	handleAddBlockIndex,
	handleCheckboxChange,
}: EditorChildren) => {
	const { content } = useAppContext();
	return (
		<Accordion sx={{ padding: '0 12px 6px 12px' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="h6">Music</Typography>
			</AccordionSummary>
			<Textfield
				name="openingHymn"
				value={content.openingHymn}
				onChange={handleChange}
				fullWidth
				label="Opening Hymn Number"
				sx={{ mb: 2 }}
				type="number"
			/>
			<Textfield
				name="openingHymnTitle"
				value={content.openingHymnTitle}
				onChange={handleChange}
				fullWidth
				label="Opening Hymn Title"
				sx={{ mb: 2 }}
			/>
			<Textfield
				name="sacramentHymn"
				value={content.sacramentHymn}
				onChange={handleChange}
				fullWidth
				label="Sacrament Hymn Number"
				sx={{ mb: 2 }}
				type="number"
			/>
			<Textfield
				name="sacramentHymnTitle"
				value={content.sacramentHymnTitle}
				onChange={handleChange}
				fullWidth
				label="Sacrament Hymn Title"
				sx={{ mb: 2 }}
			/>
			<div className="flex items-center mb-">
				<Typography variant="h6">Intermediate Music</Typography>
				<Switch
					checked={Boolean(content.isIntermediateMusicActive)}
					onChange={handleCheckboxChange}
					name="isIntermediateMusicActive"
					inputProps={{ 'aria-label': 'controlled' }}
				/>
			</div>
			{content.isIntermediateMusicActive && (
				<>
					<Textfield
						name="intermediateMusic.title"
						// @ts-ignore
						value={content.intermediateMusic.title}
						onChange={handleChange}
						fullWidth
						label="Title"
						sx={{ mb: 2 }}
					/>
					<Textfield
						name="intermediateMusic.songTitle"
						// @ts-ignore
						value={content.intermediateMusic.songTitle}
						onChange={handleChange}
						fullWidth
						label="Song Title"
						sx={{ mb: 2 }}
					/>
					{Array.isArray(content.intermediateMusicPerformers) &&
						content.intermediateMusicPerformers.length === 0 && (
							<Textfield
								name="intermediateMusic.hymnNumber"
								// @ts-ignore
								value={content.intermediateMusic.hymnNumber}
								onChange={handleChange}
								fullWidth
								label="Hymn Number"
								sx={{ mb: 2 }}
								type="number"
							/>
						)}

					{Array.isArray(content.intermediateMusicPerformers) &&
						content.intermediateMusicPerformers.map((performer, index) => {
							return (
								<div key={index} className="flex relative">
									<Textfield
										name={`performer ${index + 1}`}
										value={performer}
										onChange={(e) =>
											handleChange(e, 'intermediateMusicPerformers', index)
										}
										fullWidth
										label={`Performer ${index + 1}`}
										sx={{ mb: 2 }}
									/>
									<IconButton
										onClick={() =>
											handleDeleteBlockIndex &&
											handleDeleteBlockIndex(
												'intermediateMusicPerformers',
												index,
											)
										}
										sx={{
											height: '40px',
											margin: '42px 0 0',
											position: 'absolute',
											right: '2px',
											top: '-34px',
										}}
									>
										<DeleteForeverIcon color="error" />
									</IconButton>
								</div>
							);
						})}
					<div className="flex justify-center">
						<Button
							onClick={() =>
								handleAddBlockIndex &&
								handleAddBlockIndex('intermediateMusicPerformers')
							}
							sx={{ margin: '12px' }}
						>
							<AddIcon />
							Add Performer
						</Button>
					</div>
				</>
			)}
			<Textfield
				name="closingHymn"
				value={content.closingHymn}
				onChange={handleChange}
				fullWidth
				label="Closing Hymn Number"
				sx={{ mb: 2 }}
				type="number"
			/>
			<Textfield
				name="closingHymnTitle"
				value={content.closingHymnTitle}
				onChange={handleChange}
				fullWidth
				label="Closing Hymn Title"
				sx={{ mb: 2 }}
			/>
		</Accordion>
	);
};

export default MusicEditor;
