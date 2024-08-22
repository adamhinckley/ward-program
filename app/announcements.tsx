'use client';
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

	a {
		color: #1e40af;
		text-decoration: underline;
	}
`;

const Announcements = () => {
	const { content } = useAppContext();

	useEffect(() => {
		if (typeof document !== 'undefined') {
			const announcementEl = document.getElementById('announcement') as HTMLElement;
			// add the html from content.announcements to the announcement element
			if (announcementEl) {
				announcementEl.innerHTML = content.announcements as string;
			}
		}
	}, [content.announcements]);

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

	return <div className="mx-4" id="announcement" css={announcementStyles}></div>;
};

export default Announcements;
