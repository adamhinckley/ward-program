'use client';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';
import { containsScriptTagAttempt, sanitizeAnnouncementHtml } from '@/utils/sanitization';
import { normalizeBulletin } from '@/utils/normalizeBulletin';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const SaveButton = () => {
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
			const contentToSave = normalizeBulletin({
				...content,
				announcements: sanitizedAnnouncements,
			});
			const response = await fetch('/api/bulletin', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ bulletin: contentToSave }),
			});

			if (!response.ok) {
				console.error('Error updating bulletin:', response.status, response.statusText);
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

	return (
		<div>
			<Button type="button" disabled={saving} onClick={handleSave} className="my-3 min-w-20">
				{saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : 'Save'}
			</Button>
		</div>
	);
};

export default SaveButton;
