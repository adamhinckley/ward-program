'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { createClient } from '@/utils/supabase/client';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { containsScriptTagAttempt, sanitizeAnnouncementHtml } from '@/utils/sanitization';

const styles = css`
	.save-button {
		margin: 12px 0;
		max-width: 80px;
		background-color: var(--editor-strong-bg);
		color: var(--editor-strong-fg);
		box-shadow: none;

		&:hover {
			background-color: var(--editor-strong-bg);
		}

		.MuiLoadingButton-loadingIndicator {
			color: var(--editor-strong-fg);
		}
	}
`;

const SaveButton = () => {
	const supabase = createClient();
	const { content, editorContentRef, userData } = useAppContext();
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(false);

	const handleSave = async () => {
		if (!userData) {
			return;
		}
		try {
			setSaving(true);
			const currentEditorContent = editorContentRef.current ?? '';
			const hasScriptTag = containsScriptTagAttempt(currentEditorContent);
			if (hasScriptTag) {
				window.alert('Script tags are not allowed. Please remove them before saving.');
				setSaving(false);
				return;
			}
			const sanitizedAnnouncements = sanitizeAnnouncementHtml(currentEditorContent);
			// save the announcement content before saving the entire content
			const contentToSave = { ...content, announcements: sanitizedAnnouncements };
			const { data: bulletinData, error: bulletinError } = await supabase
				.from('ward-bulletin')
				.update({ bulletin: contentToSave }) // Assuming 'bulletin' is the column you want to update.
				.eq('id', userData.id)
				.select();

			if (bulletinError) {
				console.error('Error updating bulletin:', error);
				setError(true);
				setSaving(false);
				return;
			}
		} catch (error) {
			console.error('Error caught:', error);
			setSaving(false);
			return;
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
				sx={{ margin: '12px 0', maxWidth: '80px' }}
				loading={saving}
				className="save-button"
			>
				Save
			</LoadingButton>
		</div>
	);
};

export default SaveButton;
