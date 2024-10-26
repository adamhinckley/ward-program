export type EditorChildren = {
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		block?: string,
		index?: number,
	) => void;
	handleAddBlockIndex?: (block: string) => void;
	handleDeleteBlockIndex?: (block: string, index: number) => void;
	handleCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type BlockName = 'blockOne' | 'blockTwo' | 'blockThree' | 'wardContacts';

export interface UserSettings {
	id: string;
	currentTab: number;
}

interface IntermediateMusic {
	title: string;
	songTitle: string;
	hymnNumber: string;
	hymnNumberRightSide: string;
	intermediateMusicLeftSide: string;
}

interface Block {
	left: string;
	right: string;
}

interface LessonDetail {
	link: string;
	text: string;
}

interface AnnouncementOrLesson {
	type: 'announcement' | 'lesson';
	title: string;
	text?: string[];
	lessons?: LessonDetail[];
}

export interface Bulletin {
	showClosingHymn: boolean | undefined;
	showSacramentHymn: boolean | undefined;
	showOpeningHymn: boolean | undefined;
	customHeading: string | undefined;
	title: string;
	imageUrl: string;
	isTestimonyMeeting: boolean;
	isIntermediateMusicActive: boolean;
	meetingHasBabyBlessing: boolean;
	showBlockOne: boolean;
	showBlockTwo: boolean;
	showIntermediateMusic: boolean;
	presiding: string;
	conducting: string;
	musicLeader: string;
	accompanist: string;
	openingHymn: string;
	openingHymnTitle: string;
	openingPrayer: string;
	babyBlessing: string;
	sacramentHymn: string;
	sacramentHymnTitle: string;
	blockOne: any[];
	intermediateMusic: any;
	intermediateMusicPerformers: any[];
	blockTwo: { left: string; right: string }[];
	blockThree: { left: string; right: string }[];
	closingHymn: string;
	closingHymnTitle: string;
	closingPrayer: string;
	openingHymnLink: string;
	sacramentHymnLink: string;
	closingHymnLink: string;
	intermediateMusicLink: string;
	sacramentHymnNumber: string;
	sacramentHymnNumberTitle: string;
	openingHymnNumber: string;
	closingHymnNumber: string;
	intermediateMusicType: string;
	intermediateHymnNumber: string;
	intermediateHymnTitle: string;
	intermediateMusicLeftSide: string;
	intermediateMusicRightSide: string;
	intermediateHymnLink: string;
	announcements: string;
	blockFour: { left: string; right: string }[];
	wardContacts: { left: string; right: string }[];
}

export interface BulletinData {
	id: string;
	bulletin: Bulletin;
	stake?: string;
	ward?: string;
}

export interface AppState {
	userSettings?: UserSettings;
	bulletinData: BulletinData[];
}
