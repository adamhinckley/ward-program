import Textfield from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppContext } from '@/context/AppContext';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { hymnsArray } from '@/utils/hymns';
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

	const linkWarning =
		'Links are automatically added to the hymn titles except for hymn numbers 1,000 and up.  If you are using one of those hymns, add the link here.  Make sure to test the links and make sure they are working as expected.';

	type HymnValue = { number: number; title: string };
	const handleHymnChange = (selectedOption: HymnValue | null, key: string) => {
		if (selectedOption) {
			const hymnNumber = { [`${key}Number`]: selectedOption.number.toString() };
			const hymnTitle = { [`${key}Title`]: selectedOption.title };
			setContent({ ...content, ...hymnNumber, ...hymnTitle });
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

	const LinkWarning = () => (
		<Typography
			className="z-0 relative"
			sx={{ mb: 1, mt: 1, fontSize: `${14 / 16}rem`, color: 'blue' }}
		>
			{linkWarning}
		</Typography>
	);

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
				options={hymnsArray}
				getOptionLabel={(option) => `${option.number} - ${option.title}`}
				renderInput={(params) => <Textfield {...params} label="Opening Hymn" />}
				onChange={(e, value) => handleHymnChange(value, 'openingHymn')}
				value={
					content.openingHymnNumber
						? {
								number: Number(content.openingHymnNumber),
								title: content.openingHymnTitle as string,
						  }
						: null
				}
				isOptionEqualToValue={(option, value) => option.number === value.number}
			/>
			<div className="flex items-center">
				<Typography sx={{ fontSize: `${12 / 16}rem`, pt: 0.5 }}>
					Using a new opening hymn?
				</Typography>
				<Switch
					checked={Boolean(content.openingHymnLink)}
					onChange={() =>
						handleLinkToggle('openingHymnLink', content.openingHymnLink as string)
					}
				/>
			</div>
			{content.openingHymnLink && (
				<div className="z-10 relative">
					<LinkWarning />
					<Textfield
						name="openingHymnLink"
						value={content.openingHymnLink}
						onChange={handleChange}
						fullWidth
						label="Opening Hymn Link"
						sx={{ mb: 2 }}
						helperText={linkHelperText}
					/>
				</div>
			)}

			<Divider sx={{ my: 2 }} />

			{/* SACRAMENT HYMN */}
			<Typography sx={{ mb: 1 }}>Sacrament Hymn</Typography>
			<Autocomplete
				options={hymnsArray}
				getOptionLabel={(option) => `${option.number} - ${option.title}`}
				renderInput={(params) => <Textfield {...params} label="Sacrament Hymn" />}
				onChange={(e, value) => handleHymnChange(value, 'sacramentHymn')}
				value={
					content.sacramentHymnNumber
						? {
								number: Number(content.sacramentHymnNumber),
								title: content.sacramentHymnTitle as string,
						  }
						: null
				}
				isOptionEqualToValue={(option, value) => option.number === value.number}
			/>
			<div className="flex items-center">
				<Typography sx={{ fontSize: `${12 / 16}rem`, pt: 0.5 }}>
					Using a new sacrament hymn?
				</Typography>
				<Switch
					checked={Boolean(content.sacramentHymnLink)}
					onChange={() =>
						handleLinkToggle('sacramentHymnLink', content.sacramentHymnLink as string)
					}
				/>
			</div>
			{content.sacramentHymnLink && (
				<>
					<LinkWarning />
					<Textfield
						name="sacramentHymnLink"
						value={content.sacramentHymnLink}
						onChange={handleChange}
						fullWidth
						label="Sacrament Hymn Link"
						sx={{ mb: 2 }}
						helperText={linkHelperText}
					/>
				</>
			)}

			<Divider sx={{ my: 2 }} />

			{/* INTERMEDIATE MUSIC */}
			<div className="flex flex-col">
				<Typography sx={{ alignSelf: 'center' }}>Intermediate Music</Typography>
				<div className="flex items-center justify-center">
					<ButtonGroup
						variant="contained"
						aria-label="Basic button group"
						sx={{ margin: '12px 0' }}
					>
						<Button
							sx={{
								backgroundColor: isHymn ? '#1E40AF !important' : 'gray !important',
								'&:hover': {
									backgroundColor: isHymn
										? '#1565c0 !important'
										: '#999797 !important',
								},
							}}
							onClick={handleToggle}
						>
							Congregational Hymn
						</Button>
						<Button
							sx={{
								backgroundColor: !isHymn ? '#1E40AF !important' : 'gray !important',
								'&:hover': {
									backgroundColor: !isHymn
										? '#1565c0 !important'
										: '#999797 !important',
								},
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
							options={hymnsArray}
							getOptionLabel={(option) => `${option.number} - ${option.title}`}
							renderInput={(params) => (
								<Textfield {...params} label="Intermediate Hymn" />
							)}
							onChange={(e, value) => handleHymnChange(value, 'intermediateHymn')}
							value={
								content.intermediateHymnNumber
									? {
											number: Number(content.intermediateHymnNumber),
											title: content.intermediateHymnTitle as string,
									  }
									: null
							}
							isOptionEqualToValue={(option, value) => option.number === value.number}
						/>
						<div className="flex items-center">
							<Typography sx={{ fontSize: `${12 / 16}rem`, pt: 0.5 }}>
								Using a new intermediate hymn?
							</Typography>
							<Switch
								checked={Boolean(content.intermediateHymnLink)}
								onChange={() =>
									handleLinkToggle(
										'intermediateHymnLink',
										content.intermediateHymnLink as string,
									)
								}
							/>
						</div>
						{content.intermediateHymnLink && (
							<div className="z-10 relative">
								<LinkWarning />
								<Textfield
									name="intermediateHymnLink"
									value={content.intermediateHymnLink}
									onChange={handleChange}
									fullWidth
									label="Intermediate Hymn Link"
									sx={{ mb: 2 }}
									helperText={linkHelperText}
								/>
							</div>
						)}
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
								sx={{ margin: '12px' }}
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
			<Typography sx={{ mb: 1 }}>Closing Hymn</Typography>

			<Autocomplete
				options={hymnsArray}
				getOptionLabel={(option) => `${option.number} - ${option.title}`}
				renderInput={(params) => <Textfield {...params} label="Closing Hymn" />}
				onChange={(e, value) => handleHymnChange(value, 'closingHymn')}
				value={
					content.closingHymnNumber
						? {
								number: Number(content.closingHymnNumber),
								title: content.closingHymnTitle as string,
						  }
						: null
				}
				isOptionEqualToValue={(option, value) => option.number === value.number}
			/>
			<div className="flex items-center">
				<Typography sx={{ fontSize: `${12 / 16}rem`, pt: 0.5 }}>
					Using a new closing hymn?
				</Typography>
				<Switch
					checked={Boolean(content.closingHymnLink)}
					onChange={() =>
						handleLinkToggle('closingHymnLink', content.closingHymnLink as string)
					}
				/>
			</div>
			{content.closingHymnLink && (
				<>
					<LinkWarning />
					<Textfield
						name="closingHymnLink"
						value={content.closingHymnLink}
						onChange={handleChange}
						fullWidth
						label="Closing Hymn Link"
						sx={{ mb: 2 }}
						helperText={linkHelperText}
					/>
				</>
			)}
		</Box>
	);
};

export default MusicEditor;
