'use client';
import { defaultContent } from '@/utils/defaultContent';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import type { Lesson, AnnouncementsAndLessons, Announcement } from '@/utils/defaultContent';

type AppContextProviderProps = {
	children: ReactNode;
};
// Define the shape of the context state
type AppContextState = {
	content: typeof defaultContent;
	setContent: (content: typeof defaultContent) => void;
	handleAddAnnouncementOrLesson: (type: 'announcement' | 'lesson') => void;
	handleDeleteBlock: (index: number) => void;
	expandedState: { [key: string]: boolean } | null;
	setExpandedState: React.Dispatch<React.SetStateAction<{ [key: string]: boolean } | null>>;
};

const AppContext = createContext<AppContextState>({} as AppContextState);

// Create a provider component

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
	const supabase = createClient();

	const [content, setContent] = useState({} as typeof defaultContent);

	const getData = async () => {
		const { data, error } = await supabase.from('ward-bulletin').select().eq('id', '2');

		if (error) {
			console.error('Error fetching data:', error);
			return;
		}
		setContent(data[0].bulletin);
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

	const handleDeleteBlock = (index: number) => {
		const newContent = cloneDeep(content);
		Array.isArray(newContent.announcementsAndLessons) &&
			newContent.announcementsAndLessons.splice(index, 1);
		console.log(index, newContent.announcementsAndLessons);
		setContent(newContent);
	};

	const announcementsAndLessons = content.announcementsAndLessons as AnnouncementsAndLessons;

	type ExpandedState = {
		[key: string]: boolean;
	};

	const expanded: { [key: string]: boolean } = announcementsAndLessons?.reduce<ExpandedState>(
		(acc, item, i) => {
			acc[item.title] = false;
			return acc;
		},
		{},
	);

	const [expandedState, setExpandedState] = useState<ExpandedState | null>(null);

	useEffect(() => {
		if (expandedState === null && expanded) {
			console.log('fired');
			setExpandedState(expanded);
		}
	}, [expanded]);

	console.log('expandedState', expandedState);

	const value = {
		content,
		setContent,
		handleAddAnnouncementOrLesson,
		handleDeleteBlock,
		expandedState,
		setExpandedState,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);
