'use client';
import { createClient } from '@/utils/supabase/client';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';
import { containsScriptTagAttempt, sanitizeAnnouncementHtml } from '@/utils/sanitization';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

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
		<div>
			<Button type="button" disabled={saving} onClick={handleSave} className="my-3 min-w-20">
				{saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : 'Save'}
			</Button>
		</div>
	);
};

export default SaveButton;
