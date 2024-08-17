import { useAppContext } from '@/context/AppContext';
import { Divider } from '@mui/material';
import type { Announcement, Lesson } from '@/utils/defaultContent';
import { use, useEffect } from 'react';

const Announcements = () => {
	const { content } = useAppContext();

	if (Object.keys(content).length === 0) {
		return null;
	}

	const { announcementsAndLessons } = content;
	if (!Array.isArray(announcementsAndLessons)) {
		return null;
	}
	if (!announcementsAndLessons.length) {
		return null;
	}

	const announcementEl = document.getElementById('announcement') as HTMLElement;

	console.log('content.announcements', content.announcements);

	useEffect(() => {
		// add the html from content.announcements to the announcement element
		if (announcementEl) {
			announcementEl.innerHTML = content.announcements as string;
		}
	}, [content.announcements, announcementEl]);

	console.log('content.announcements', content);

	return <div className="mx-4" id="announcement"></div>;
};

export default Announcements;
