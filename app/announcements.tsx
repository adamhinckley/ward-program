/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';

const announcementStyles = css`
	hr {
		border: 0;
		border-top: 1px solid #ccc;
		margin: 12px 0;
	}
`;

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

	return <div className="mx-4" id="announcement" css={announcementStyles}></div>;
};

export default Announcements;
