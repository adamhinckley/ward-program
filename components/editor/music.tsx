import Textfield from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppContext } from '@/context/AppContext';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { newHymnsArray } from '@/utils/hymns';
import Switch from '@mui/material/Switch';

import type { EditorChildren } from '@/utils/types';
import { Box, ButtonGroup, Divider } from '@mui/material';

const MusicEditor = ({
	handleChange,
	handleDeleteBlockIndex,
	handleAddBlockIndex,
}: EditorChildren) => {
	const { content, setContent } = useAppContext();
	const { intermediateMusicType } = content;

	type HymnValue = { number: number; title: string; link: string };
	const handleHymnChange = (selectedOption: HymnValue | null, key: string) => {
		if (selectedOption) {
			const hymnNumber = { [`${key}Number`]: selectedOption.number.toString() };
			const hymnTitle = { [`${key}Title`]: selectedOption.title };
			const hymnLink = { [`${key}Link`]: selectedOption.link };
			setContent({ ...content, ...hymnNumber, ...hymnTitle, ...hymnLink });
		} else {
			const hymnNumber = { [`${key}Number`]: '' };
			const hymnTitle = { [`${key}Title`]: '' };
			const hymnLink = { [`${key}Link`]: '' };
			setContent({ ...content, ...hymnNumber, ...hymnTitle, ...hymnLink });
		}
	};

	const handleLinkToggle = (key: string, link: string) => {
		if (link) {
			const newContent = { ...content, [key]: '' };
			setContent(newContent);
		} else {
			const newContent = { ...content, [key]: 'https://' };
			setContent(newContent);
		}
	};

	const linkHelperText = 'Optional';

	const handleToggle = () => {
		intermediateMusicType === 'hymn'
			? setContent({ ...content, intermediateMusicType: 'musicalNumber' })
			: setContent({ ...content, intermediateMusicType: 'hymn' });
	};

	const isHymn = intermediateMusicType === 'hymn';

	return (
		<Box sx={{ marginTop: '16px' }}>
			{/* OPENING HYMN */}
			<Autocomplete
				options={newHymnsArray}
				getOptionLabel={(option) => `${option.number} - ${option.title}`}
				renderInput={(params) => <Textfield {...params} label="Opening Hymn" />}
				onChange={(e, value) => handleHymnChange(value, 'openingHymn')}
				value={
					content.openingHymnNumber
						? {
								number: Number(content.openingHymnNumber),
								title: content.openingHymnTitle,
								link: content.openingHymnLink,
						  }
						: null
				}
				isOptionEqualToValue={(option, value) => option.number === value.number}
			/>

			<Divider sx={{ my: 2 }} />

			{/* SACRAMENT HYMN */}
			<Autocomplete
				options={newHymnsArray}
				getOptionLabel={(option) => `${option.number} - ${option.title}`}
				renderInput={(params) => <Textfield {...params} label="Sacrament Hymn" />}
				onChange={(e, value) => handleHymnChange(value, 'sacramentHymn')}
				value={
					content.sacramentHymnNumber
						? {
								number: Number(content.sacramentHymnNumber),
								title: content.sacramentHymnTitle,
								link: content.sacramentHymnLink,
						  }
						: null
				}
				isOptionEqualToValue={(option, value) => option.number === value.number}
			/>

			<Divider sx={{ my: 2 }} />

			{/* INTERMEDIATE MUSIC */}
			<div className="flex flex-col">
				<Typography sx={{ alignSelf: 'center' }}>Intermediate Music</Typography>
				<Typography sx={{ alignSelf: 'center', fontSize: `${12 / 16}rem` }}>
					To remove from the program, select "Musical Number" and clear the inputs.
				</Typography>
				<div className="flex items-center justify-center">
					<ButtonGroup
						variant="contained"
						aria-label="Basic button group"
						sx={{
							margin: '12px 0',
						}}
					>
						<Button
							sx={{
								backgroundColor: isHymn ? '#000000 !important' : 'gray !important',
								'&:hover': {
									backgroundColor: isHymn
										? '#4c4d4d important'
										: '#999797 !important',
								},
								borderColor: 'transparent !important',
							}}
							onClick={handleToggle}
						>
							Congregational Hymn
						</Button>
						<Button
							sx={{
								backgroundColor: !isHymn
									? '#000000  !important'
									: 'gray !important',
								'&:hover': {
									backgroundColor: !isHymn
										? '#4c4d4d!important'
										: '#999797 !important',
								},
								borderColor: 'transparent',
							}}
							onClick={handleToggle}
						>
							Musical Number
						</Button>
					</ButtonGroup>
				</div>
				{intermediateMusicType === 'hymn' ? (
					<>
						<Autocomplete
							options={newHymnsArray}
							getOptionLabel={(option) => `${option.number} - ${option.title}`}
							renderInput={(params) => (
								<Textfield {...params} label="Intermediate Hymn" />
							)}
							onChange={(e, value) => handleHymnChange(value, 'intermediateHymn')}
							value={
								content.intermediateHymnNumber
									? {
											number: Number(content.intermediateHymnNumber),
											title: content.intermediateHymnTitle,
											link: content.intermediateHymnLink,
									  }
									: null
							}
							isOptionEqualToValue={(option, value) => option.number === value.number}
						/>
					</>
				) : (
					<>
						<div className="flex relative justify-between content-center min-w-full items-center">
							<Textfield
								name="intermediateMusicLeftSide"
								// @ts-ignore
								value={content.intermediateMusicLeftSide || ''}
								onChange={(e) => handleChange(e)}
								fullWidth
								label="left side"
								sx={{ mb: 2, width: '49%' }}
								placeholder="special musical number"
							/>
							<Textfield
								name="intermediateMusicRightSide"
								// @ts-ignore
								value={content.intermediateMusicRightSide || ''}
								onChange={(e) => handleChange(e)}
								fullWidth
								label="right side"
								sx={{ mb: 2, width: '49%' }}
								placeholder="song title"
							/>
						</div>
						{Array.isArray(content.intermediateMusicPerformers) &&
							content.intermediateMusicPerformers.map((performer, index) => {
								return (
									<div key={index} className="flex relative">
										<Textfield
											name={`performer ${index + 1}`}
											value={performer}
											onChange={(e) =>
												handleChange(
													e,
													'intermediateMusicPerformers',
													index,
												)
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
								sx={{ margin: '12px', color: '#000000' }}
							>
								<AddIcon />
								Add Performer
							</Button>
						</div>
					</>
				)}
			</div>

			<Divider sx={{ my: 2 }} />

			{/* CLOSING HYMN */}
			<Autocomplete
				options={newHymnsArray}
				getOptionLabel={(option) => `${option.number} - ${option.title}`}
				renderInput={(params) => <Textfield {...params} label="Closing Hymn" />}
				onChange={(e, value) => handleHymnChange(value, 'closingHymn')}
				value={
					content.closingHymnNumber
						? {
								number: Number(content.closingHymnNumber),
								title: content.closingHymnTitle,
								link: content.closingHymnLink,
						  }
						: null
				}
				isOptionEqualToValue={(option, value) => option.number === value.number}
			/>
		</Box>
	);
};

export default MusicEditor;
