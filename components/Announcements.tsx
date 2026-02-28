'use client';
import { useAppContext } from '@/context/AppContext';
import { sanitizeAnnouncementHtml } from '@/utils/sanitization';

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
			className="flex flex-col pb-3 [&_a]:text-[var(--program-link)] [&_a]:underline [&_hr]:my-3 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[#ccc] [&_img]:self-center"
			dangerouslySetInnerHTML={{ __html: sanitizedAnnouncements }}
		></div>
	);
};

export default Announcements;
