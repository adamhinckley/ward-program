// front page
// this app has configuration that will not allow images to be used unless they are from 'churchofjesuschrist.org.
// We can add more domains if it's necessary.
const imageUrl =
	'https://www.churchofjesuschrist.org/imgs/9ea119c36c7384d775ee8779753b8bff64d33f52/full/1600%2C/0/default';
/* https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/Trujillo-Peru-Temple-2.jpg';  */

// agenda
const isTestimonyMeeting = true;
const presiding = 'Bishop Rob Dickson';
const conducting = 'Brother Justin Lowry';
const musicLeader = 'Sister Vanessa Pettus';
const accompanist = 'Sister Wendy Infanger';
const openingHymn = '265';
const openingHymnTitle = 'Arise, O God, and Shine';
const openingPrayer = 'By Invitation';
const sacramentHymn = '169';
const sacramentHymnTitle = 'As Now We Take the Sacrament';
const blockOne = [
	{
		title: 'Speaker',
		content: 'Testimonies as requested',
	},
];
const intermediateMusic = {
	title: 'Special Musical Number',
	performers: ['Peggy Gulli', 'Rebekah Bungei', 'Wendy Infanger'], // If there are multiple performers, list them here separated by commas.
	songTitle: 'How Great Thou Art',
	hymnNumber: '', // This will not show when performers are listed.
};

const blockTwo = [
	{
		title: 'Speaker',
		content: 'Testimonies as requested',
	},
];
const closingHymn = '156';
const closingHymnTitle = 'Sing We Now at Parting';
const closingPrayer = 'By Invitation';

// Announcements
const wardAnnouncements = [
	'The Addiction Recovery Program (ARP) contact Jim & April Sturtevant (530) 906-3289.',
	'Empty Nesters Family Home Evenings Mondays at 6:00 PM in R.S. Room. Potluck to follow.',
	'Ward Choir practice rehearsals on the 1st (7-3) & 3rd (7-17) Wednesday of each month at 6:45 PM.',
];

const reliefSocietyLessons = [
	{
		text: 'Lessons:',
	},
	{
		link: 'https://www.churchofjesuschrist.org/study/general-conference/2024/04/15dushku?lang=eng',
		text: 'July 14 - Elder Dushku: “Pillars and Rays”',
	},
	{
		link: 'https://www.churchofjesuschrist.org/study/general-conference/2024/04/53stevenson?lang=eng',
		text: 'July 28 - Elder Stevenson: “Bridging the Two Great Commandments”',
	},
	{
		text: 'Activities:',
	},
	{
		text: 'July 3 – R.S. Sisters Luncheon 12:00 at the church.',
	},
	{
		text: 'July 18 at 7:00 PM Combined EQ/RS Game Night. Bring a game to share or just come have fun. Child care provided.',
	},
	{
		link: 'https://docs.google.com/forms/d/e/1FAIpQLSdot2ycfJdTxbMuKeDKwCF8r7zSi_RHy0Z1xhvjGRK4Sz_FhQ/viewform?pli=1',
		text: 'July 27 - Single Sisters age 18 & up A Day at the Temple Sign up and join us at the Memphis Tennessee Temple',
	},
];

const priesthoodLessons = [
	{
		text: 'Lessons:',
	},
	{
		link: 'https://www.churchofjesuschrist.org/study/general-conference/2024/04/53stevenson?lang=eng',
		text: 'July 14 – "Bridging the Two Great Commandments" - Elder Gary E. Stevenson',
	},
	{
		link: 'https://www.churchofjesuschrist.org/study/general-conference/2024/04/57nelson?lang=eng',
		text: 'July 28 - "Rejoice in the Gift of Priesthood Keys" - President Russell M Nelson',
	},
	{
		text: 'Activities:',
	},
	{
		text: 'July 18 at 7:00 PM Combined EQ/RS Game Night. Bring a game to share or just come have fun. Child care provided.',
	},
	{
		text: 'July 19 – EQ Presidency Temple Trip to Nashville Temple – Depart Ward building at 8:30 AM. All temple recommend holders welcome.',
	},
];

const sundaySchoolLessons = [
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
];

const primaryAnnouncements = [
	'Primary Activity Night on the 2nd (7-10) & 4th (7-24) Wednesday at 6:30 PM.',
];

//page three

const buildingCleaningSchedule = [
	'Please sign up for either the even months or the odd months for the year. Then each Saturday the building will be open for cleaning with a list of assignments. Come and select a few assignments put your name next to them. When completed check the box confirming it has been done.',
];

//This one requires back ticks instead of regular quotes because it uses the same quotes in the text.
const familyHistoryCorner = [
	`You can be an instrument in God's hands to bless millions of people in the work of salvation by … indexing. How? Indexing helps others who are searching for their ancestors by making records searchable online so that important saving ordinances may be performed on their behalf. Indexing is an easy way for anyone to be involved in family history. No [temple recommend or] experience in family history is necessary. (theFHguide.com) See FamilySearch.org/Indexing`,
];

const wardFocusTempleCorner = [
	'For this year we would like to encourage members to focus on developing Christ like attributes. This month we are focusing on Knowledge.',
	'Knowledge is key in everything we do. From learning to tie or your shoes to  performing a life saving operation you must put forth effort and time in order to gain the knowledge required to perform these skills. Dieter F Uchtdorf said “What we love determines what we seek. What we seek determines what we think and do. What we think and do determines who we are and who we will become.” As we seek to draw closer to the Lord and learn more about him we will be able to gain knowledge of him, his love for us and ultimately become more like him.',
];

export const settings = {
	isTestimonyMeeting,
	presiding,
	conducting,
	musicLeader,
	accompanist,
	openingHymn,
	openingHymnTitle,
	openingPrayer,
	sacramentHymn,
	sacramentHymnTitle,
	blockOne,
	intermediateMusic,
	blockTwo,
	closingHymn,
	closingHymnTitle,
	closingPrayer,
	wardAnnouncements,
	reliefSocietyLessons,
	priesthoodLessons,
	sundaySchoolLessons,
	primaryAnnouncements,
	buildingCleaningSchedule,
	familyHistoryCorner,
	wardFocusTempleCorner,
	imageUrl,
};
