'use client';
import { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import { AppState, Bulletin } from '@/utils/types';

type AppContextProviderProps = {
	initialState: AppState;
	children: ReactNode;
};

type userData = {
	id: string;
	stake: string;
	ward: string;
};
// Define the shape of the context state
type AppContextState = {
	content: Bulletin;
	setContent: (content: Bulletin) => void;
	handleDeleteBlock: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
	editorContentRef: React.MutableRefObject<string>;
	currentTab: number;
	setCurrentTab: (tab: number) => void;
	userData: userData;
	setUserData: (userData: userData) => void;
	missingWardData: boolean;
};

const AppContext = createContext<AppContextState>({} as AppContextState);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
	initialState,
	children,
}) => {
	console.log(initialState);

	const [content, setContent] = useState(initialState.bulletinData[0].bulletin);
	const [currentTab, setCurrentTab] = useState(0);
	const [userData, setUserData] = useState(initialState.userSettings);

	const [missingWardData, setMissingWardData] = useState(false);

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
		handleDeleteBlock,
		editorContentRef,
		currentTab,
		setCurrentTab,
		userData,
		setUserData,
		missingWardData,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);
