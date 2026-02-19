'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAppContext } from '@/context/AppContext';
import { sanitizeAnnouncementHtml } from '@/utils/sanitization';

const announcementStyles = css`
	display: flex;
	flex-direction: column;

	img {
		align-self: center;
	}

	hr {
		border: 0;
		border-top: 1px solid #ccc;
		margin: 12px 0;
	}

	a {
		color: var(--program-link);
		text-decoration: underline;
	}

	padding-bottom: 12px;
`;

const Announcements = () => {
	const { content } = useAppContext();
	const sanitizedAnnouncements = sanitizeAnnouncementHtml(
		(content.announcements as string) ?? '',
	);

	if (Object.keys(content).length === 0) {
		return null;
	}

	return (
		<div
			id="announcement"
			css={announcementStyles}
			dangerouslySetInnerHTML={{ __html: sanitizedAnnouncements }}
		></div>
	);
};

export default Announcements;
