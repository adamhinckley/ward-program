import { useAppContext } from '@/context/AppContext';
import { Divider } from '@mui/material';
import type { Announcement, Lesson } from '@/utils/defaultContent';

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

	return (
		<div className="mx-4">
			{announcementsAndLessons.map((itemToNarrow, index) => {
				const item = itemToNarrow as Lesson | Announcement;

				if (item.type === 'lesson') {
					return (
						<div key={index}>
							<h3 className="text-base font-semibold text-center">{item.title}</h3>
							<ul>
								{item.lessons?.map((lesson, index) =>
									lesson.link ? (
										<a
											href={lesson.link}
											key={index}
											className="underline  text-blue-800"
										>
											<li key={index}>{lesson.text}</li>
										</a>
									) : (
										<li key={index} style={{ wordWrap: 'break-word' }}>
											{lesson.text}
										</li>
									),
								)}
							</ul>
							<Divider className="my-4" />
						</div>
					);
				}
				if (item.type === 'announcement') {
					return (
						<div key={index}>
							<h3 className="text-base font-semibold text-center">{item.title}</h3>
							<ul>
								{item.text?.map((text: string, index: number) => (
									<li key={index} style={{ wordWrap: 'break-word' }}>
										{text}
									</li>
								))}
							</ul>
							<Divider className="my-4" />
						</div>
					);
				}
			})}
		</div>
	);
};

export default Announcements;
