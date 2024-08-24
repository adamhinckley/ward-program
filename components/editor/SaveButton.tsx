'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { createClient } from '@/utils/supabase/client';
import { useAppContext } from '../../context/AppContext';
import { useState, useContext } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const styles = css`
	.save-button {
		margin: 12px 0;
		max-width: 80px;
		background-color: #1976d2;
		box-shadow: none;
	}
`;

const SaveButton = () => {
	const supabase = createClient();
	const { content, editorContentRef, userData } = useAppContext();
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(false);

	const handleSave = async () => {
		try {
			setSaving(true);
			// save the announcement content before saving the entire content
			const contentToSave = { ...content, announcements: editorContentRef.current };
			SVGTextContentElement;
			const { data: bulletinData, error: bulletinError } = await supabase
				.from('ward-bulletin')
				.update({ bulletin: contentToSave }) // Assuming 'bulletin' is the column you want to update.
				.eq('ward', userData.ward)
				.eq('stake', userData.stake)
				.select();

			if (bulletinError) {
				console.error('Error updating bulletin:', error);
				setError(true);
				return;
			}
		} catch (error) {
			console.error('Error caught:', error);
		}

		setSaving(false);
	};

	// const insertData = async () => {
	// 	const { data, error } = await supabase
	// 		.from('ward-bulletin')
	// 		.insert([{ bulletin: content, stake: 'Test', ward: 'test' }]);

	// 	if (error) {
	// 		console.error('Error inserting data:', error);
	// 		setError(true);
	// 		return;
	// 	}
	// };

	return (
		<div css={styles}>
			<LoadingButton
				variant="contained"
				disabled={saving}
				onClick={handleSave}
				sx={{ margin: '12px 0', maxWidth: '80px', backgroundColor: '#4caf50' }}
				loading={saving}
				className="save-button"
			>
				Save
			</LoadingButton>
		</div>
	);
};

export default SaveButton;
