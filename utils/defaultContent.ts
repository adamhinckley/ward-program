export type BlockOneItem = {
	left: string;
	right: string;
};

type IntermediateMusic = {
	title: string;
	songTitle: string;
	hymnNumber: string;
};

type Lessons = {
	link?: string;
	text: string;
};

export type Lesson = {
	type: 'lesson';
	title: string;
	lessons: Lessons[];
};

export type AnnouncementsAndLessons = (Lesson | Announcement)[];

export type Announcement = {
	type: 'announcement';
	title: string;
	text: string[];
};

type Content = {
	[key: string]:
		| string
		| boolean
		| string[]
		| BlockOneItem[]
		| IntermediateMusic
		| Lessons[]
		| AnnouncementsAndLessons;
};

export const defaultContent: Content = {
	imageUrl:
		'https://www.churchofjesuschrist.org/imgs/9ea119c36c7384d775ee8779753b8bff64d33f52/full/1600%2C/0/default',
	isTestimonyMeeting: false,
	isIntermediateMusicActive: true,
	meetingHasBabyBlessing: false,
	showBlockOne: true,
	showBlockTwo: true,
	showIntermediateMusic: true,
	presiding: 'Bishop Rob Dickson',
	conducting: 'Brother Justin Lowry',
	musicLeader: 'Sister Vanessa Pettus',
	accompanist: 'Sister Wendy Infanger',
	openingHymn: '265',
	openingHymnTitle: 'Arise, O God, and Shine',
	openingPrayer: 'By Invitation',
	babyBlessing: '',
	sacramentHymn: '169',
	sacramentHymnTitle: 'As Now We Take the Sacrament',
	blockOne: [
		{
			left: 'Speaker',
			right: 'Testimonies as requested',
		},
	],
	intermediateMusic: {
		title: 'Special Musical Number',
		songTitle: 'How Great Thou Art',
		hymnNumber: '', // This will not show when performers are listed.
	},
	intermediateMusicPerformers: ['Peggy Gulli', 'Rebekah Bungei', 'Wendy Infanger'],
	blockTwo: [
		{
			left: 'Speaker',
			right: 'Testimonies as requested',
		},
	],
	blockThree: [
		{
			left: 'Speaker',
			right: 'Testimonies as requested',
		},
	],
	wardAnnouncements: [
		'The Addiction Recovery Program (ARP) contact Jim & April Sturtevant (530) 906-3289.',
		'Empty Nesters Family Home Evenings Mondays at 6:00 PM in R.S. Room. Potluck to follow.',
		'Ward Choir practice rehearsals on the 1st (7-3) & 3rd (7-17) Wednesday of each month at 6:45 PM.',
	],
	reliefSocietyLessons: [
		{
			link: 'https://www.churchofjesuschrist.org/study/general-conference/2024/04/15dushku?lang=eng',
			text: 'July 14 - Elder Dushku: “Pillars and Rays”',
		},
		{
			link: 'https://www.churchofjesuschrist.org/study/general-conference/2024/04/53stevenson?lang=eng',
			text: 'July 28 - Elder Stevenson: “Bridging the Two Great Commandments”',
		},
	],
	reliefSocietyActivities: [
		'July 3 – R.S. Sisters Luncheon 12:00 at the church.',
		'July 18 at 7:00 PM Combined EQ/RS Game Night. Bring a game to share or just come have fun. Child care provided.',
		'July 27 - Single Sisters age 18 & up A Day at the Temple Sign up and join us at the Memphis Tennessee Temple: https://docs.google.com/forms/d/e/1FAIpQLSdot2ycfJdTxbMuKeDKwCF8r7zSi_RHy0Z1xhvjGRK4Sz_FhQ/viewform?pli=1',
	],
	priesthoodLessons: [
		{
			link: 'https://www.churchofjesuschrist.org/study/general-conference/2024/04/53stevenson?lang=eng',
			text: 'July 14 – "Bridging the Two Great Commandments" - Elder Gary E. Stevenson',
		},
		{
			link: 'https://www.churchofjesuschrist.org/study/general-conference/2024/04/57nelson?lang=eng',
			text: 'July 28 - "Rejoice in the Gift of Priesthood Keys" - President Russell M Nelson',
		},
	],
	priesthoodActivities: [
		'July 18 at 7:00 PM Combined EQ/RS Game Night. Bring a game to share or just come have fun. Child care provided.',
		'July 19 – EQ Presidency Temple Trip to Nashville Temple – Depart Ward building at 8:30 AM. All temple recommend holders welcome.',
	],
	sundaySchoolLessons: [
		{
			link: 'https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/27?lang=eng',
			text: 'July 1–7: Alma 17–22',
		},
		{
			link: 'https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/28?lang=eng',
			text: 'July 8–14: Alma 23–29',
		},
		{
			link: 'https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng',
			text: 'July 15–21: Alma 30–31',
		},
		{
			link: 'https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/30?lang=eng',
			text: 'July 22–28: Alma 32–35',
		},
		{
			link: 'https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/31?lang=eng',
			text: 'July 29–August 4: Alma 36–38',
		},
	],
	primaryAnnouncements: [
		'Primary Activity Night on the 2nd (7-10) & 4th (7-24) Wednesday at 6:30 PM.',
	],
	buildingCleaningSchedule: [
		'Please sign up for either the even months or the odd months for the year. Then each Saturday the building will be open for cleaning with a list of assignments. Come and select a few assignments put your name next to them. When completed check the box confirming it has been done.',
	],
	familyHistoryCorner: [
		`You can be an instrument in God's hands to bless millions of people in the work of salvation by … indexing. How? Indexing helps others who are searching for their ancestors by making records searchable online so that important saving ordinances may be performed on their behalf. Indexing is an easy way for anyone to be involved in family history. No [temple recommend or] experience in family history is necessary. (theFHguide.com) See FamilySearch.org/Indexing`,
	],
	wardFocusTempleCorner: [
		'For this year we would like to encourage members to focus on developing Christ like attributes. This month we are focusing on Knowledge.',
		'Knowledge is key in everything we do. From learning to tie or your shoes to  performing a life saving operation you must put forth effort and time in order to gain the knowledge required to perform these skills. Dieter F Uchtdorf said “What we love determines what we seek. What we seek determines what we think and do. What we think and do determines who we are and who we will become.” As we seek to draw closer to the Lord and learn more about him we will be able to gain knowledge of him, his love for us and ultimately become more like him.',
	],
	announcementsAndLessons: [
		{
			type: 'announcement',
			title: 'Ward Announcements',
			text: [
				'The Addiction Recovery Program (ARP) contact Jim & April Sturtevant (530) 906-3289.',
				'Empty Nesters Family Home Evenings Mondays at 6:00 PM in R.S. Room. Potluck to follow.',
				'Ward Choir practice rehearsals on the 1st (7-3) & 3rd (7-17) Wednesday of each month at 6:45 PM.',
			],
		},
		{
			type: 'lesson',
			title: 'Relief Society Lessons (2nd & 4th)',
			lessons: [
				{
					link: 'https://www.churchofjesuschrist.org/study/general-conference/2024/04/15dushku?lang=eng',
					text: 'July 14 - Elder Dushku: “Pillars and Rays”',
				},
				{
					link: 'https://www.churchofjesuschrist.org/study/general-conference/2024/04/53stevenson?lang=eng',
					text: 'July 28 - Elder Stevenson: “Bridging the Two Great Commandments”',
				},
			],
		},
		{
			type: 'announcement',
			title: 'Relief Society Activities',
			text: [
				'July 3 – R.S. Sisters Luncheon 12:00 at the church.',
				'July 18 at 7:00 PM Combined EQ/RS Game Night. Bring a game to share or just come have fun. Child care provided.',
				'July 27 - Single Sisters age 18 & up A Day at the Temple Sign up and join us at the Memphis Tennessee Temple: https://docs.google.com/forms/d/e/1FAIpQLSdot2ycfJdTxbMuKeDKwCF8r7zSi_RHy0Z1xhvjGRK4Sz_FhQ/viewform?pli=1',
			],
		},
		{
			type: 'lesson',
			title: 'Priesthood Lessons (2nd & 4th)',
			lessons: [
				{
					link: 'https://www.churchofjesuschrist.org/study/general-conference/2024/04/53stevenson?lang=eng',
					text: 'July 14 – "Bridging the Two Great Commandments" - Elder Gary E. Stevenson',
				},
				{
					link: 'https://www.churchofjesuschrist.org/study/general-conference/2024/04/57nelson?lang=eng',
					text: 'July 28 - "Rejoice in the Gift of Priesthood Keys" - President Russell M Nelson',
				},
			],
		},
		{
			type: 'announcement',
			title: 'Priesthood Activities',
			text: [
				'July 18 at 7:00 PM Combined EQ/RS Game Night. Bring a game to share or just come have fun. Child care provided.',
				'July 19 – EQ Presidency Temple Trip to Nashville Temple – Depart Ward building at 8:30 AM. All temple recommend holders welcome.',
			],
		},
		{
			type: 'lesson',
			title: 'Sunday School Lessons',
			lessons: [
				{
					link: 'https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/27?lang=eng',
					text: 'July 1–7: Alma 17–22',
				},
				{
					link: 'https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/28?lang=eng',
					text: 'July 8–14: Alma 23–29',
				},
				{
					link: 'https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng',
					text: 'July 15–21: Alma 30–31',
				},
				{
					link: 'https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/30?lang=eng',
					text: 'July 22–28: Alma 32–35',
				},
				{
					link: 'https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/31?lang=eng',
					text: 'July 29–August 4: Alma 36–38',
				},
			],
		},
		{
			type: 'announcement',
			title: 'Primary Announcements',
			text: ['Primary Activity Night on the 2nd (7-10) & 4th (7-24) Wednesday at 6:30 PM.'],
		},
		{
			type: 'announcement',
			title: 'Building Cleaning Schedule',
			text: [
				'Please sign up for either the even months or the odd months for the year. Then each Saturday the building will be open for cleaning with a list of assignments. Come and select a few assignments put your name next to them. When completed check the box confirming it has been done.',
			],
		},
		{
			type: 'announcement',
			title: 'Family History Corner',
			text: [
				`You can be an instrument in God's hands to bless millions of people in the work of salvation by … indexing. How? Indexing helps others who are searching for their ancestors by making records searchable online so that important saving ordinances may be performed on their behalf. Indexing is an easy way for anyone to be involved in family history. No [temple recommend or] experience in family history is necessary. (theFHguide.com) See FamilySearch.org/Indexing`,
			],
		},
		{
			type: 'announcement',
			title: 'Ward Focus Temple Corner',
			text: [
				'For this year we would like to encourage members to focus on developing Christ like attributes. This month we are focusing on Knowledge.',
				'Knowledge is key in everything we do. From learning to tie or your shoes to  performing a life saving operation you must put forth effort and time in order to gain the knowledge required to perform these skills. Dieter F Uchtdorf said “What we love determines what we seek. What we seek determines what we think and do. What we think and do determines who we are and who we will become.” As we seek to draw closer to the Lord and learn more about him we will be able to gain knowledge of him, his love for us and ultimately become more like him.',
			],
		},
	],
};
