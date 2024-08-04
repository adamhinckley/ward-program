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

				if (item.type === 'lesson' && item.lessons?.length) {
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
				if (item.type === 'announcement' && item.text?.length) {
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
			<h3 className="text-base font-semibold text-center">Family History Corner</h3>
			<ul>
				<li>
					Between his death and his resurrection Jesus "preached unto the spirits in
					prison" (1 Peter 3:19-20) While the gospel may be accepted by spirits in the
					spirit world, the ordinance of salvation must be performed for them by those who
					are living here on Earth.{' '}
				</li>
				<li>
					"The dead who have not heard or who rejected the gospel in mortality are in
					darkness, or in a state of misery (see{' '}
					<a
						href="https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/138.2?lang=eng#p2"
						className="underline  text-blue-800"
						target="_blank"
					>
						Alma 40:14; D&C 138:2
					</a>{' '}
					). Yet because of our Savior's visit, we have a hope for their salvation. We may
					go to the temple and turn the key, opening the gates of heaven for them and, by
					our service, for ourselves." (
					<a
						href="https://www.churchofjesuschrist.org/study/ensign/2003/07/the-saviors-visit-to-the-spirit-world?lang=eng&para=p4#p4"
						target="_blank"
						className="underline  text-blue-800"
					>
						The Savior's Visit to the Spirit World
					</a>{' '}
					," Spencer Condie Ensign, July 2003.)
				</li>
				<li>
					Through FamilySearch and{' '}
					<a
						href="https://www.familysearch.org/en/blog/ordinances-ready-algorithm"
						target="_blank"
						className="underline  text-blue-800"
					>
						Ordinances Ready
					</a>{' '}
					you can find your relatives, or even relatives of other ward members, who need
					temple work done.{' '}
				</li>
			</ul>
		</div>
	);
};

export default Announcements;
