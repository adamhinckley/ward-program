'use client';
import { Announcement, defaultContent } from '@/utils/defaultContent';
import { createClient } from '@/utils/supabase/client';
import { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import type { Lesson, AnnouncementsAndLessons } from '@/utils/defaultContent';

type AppContextProviderProps = {
	children: ReactNode;
};
// Define the shape of the context state
type AppContextState = {
	content: typeof defaultContent;
	setContent: (content: typeof defaultContent) => void;
	handleAddAnnouncementOrLesson: (type: 'announcement' | 'lesson') => void;
	handleDeleteBlock: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
	editorContentRef: React.MutableRefObject<string>;
	currentTab: number;
	setCurrentTab: (tab: number) => void;
};

const AppContext = createContext<AppContextState>({} as AppContextState);

// Create a provider component

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
	const supabase = createClient();

	const [content, setContent] = useState({} as typeof defaultContent);
	const [currentTab, setCurrentTab] = useState(0);
	const [userId, setUserId] = useState('');

	// const [urlParams, setUrlParams] = useState<{ [key: string]: string }>({});

	// grab params from the url
	// useEffect(() => {
	// 	const queryString = window.location.search;
	// 	const params = new URLSearchParams(queryString);
	// 	const paramsObj: { [key: string]: string } = {};
	// 	params.forEach((value, key) => {
	// 		paramsObj[key] = value;
	// 	});
	// 	setUrlParams(paramsObj);
	// }, []);

	// const { ward, stake } = urlParams;

	// const getUserSettings = async () => {
	// 	const { data, error } = await supabase.from('user-settings').select().eq('id', userId);
	// 	console.log('data', data);
	// 	console.log('error', error);

	// 	if (error) {
	// 		if (error.code === '42P01') {
	// 			const { data, error } = await supabase
	// 				.from('user-settings')
	// 				.insert([{ id: userId, editorColumn: 0 }]);
	// 			if (error) {
	// 				console.error('Error inserting data:', error);
	// 				return;
	// 			}
	// 			console.log('data', data);
	// 			return;
	// 		}
	// 		console.error('Error fetching data:', error);
	// 		return;
	// 	}
	// 	console.log('user data', data);
	// };

	// useEffect(() => {
	// 	if (userId) {
	// 		getUserSettings();
	// 	}
	// }, [userId]);

	const getData = async () => {
		// const { data, error } = await supabase.from('ward-bulletin').select().eq('id', '2');
		const { data, error } = await supabase.from('ward-bulletin').select().eq('id', 6);
		// .eq('stake', stake)
		// .eq('ward', ward);

		if (error) {
			console.error('Error fetching data:', error);
			return;
		}
		setContent(data[0].bulletin);
		editorContentRef.current = data[0].bulletin.announcements as string;
	};

	useEffect(() => {
		getData();
	}, []);

	const handleAddAnnouncementOrLesson = (type: string) => {
		const blankAnnouncement: Announcement = {
			type: 'announcement',
			title: '',
			text: [],
		};
		const blankLesson: Lesson = {
			type: 'lesson',
			title: '',
			lessons: [],
		};
		setContent(() => {
			// push the new announcement or lesson to content.announcementsAndLessons
			return {
				...content,
				announcementsAndLessons: [
					...(content.announcementsAndLessons as AnnouncementsAndLessons),
					type === 'announcement' ? blankAnnouncement : blankLesson,
				],
			};
		});
	};

	const handleDeleteBlock = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.stopPropagation();

		const newContent = cloneDeep(content);
		Array.isArray(newContent.announcementsAndLessons) &&
			newContent.announcementsAndLessons.splice(index, 1);
		setContent(newContent);
	};

	const editorContentRef = useRef((content.announcements as string) || '');

	const value = {
		content,
		setContent,
		handleAddAnnouncementOrLesson,
		handleDeleteBlock,
		editorContentRef,
		currentTab,
		setCurrentTab,
		userId,
		setUserId,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);
