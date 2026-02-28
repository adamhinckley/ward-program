'use client';
import { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';

import { AppState, Bulletin, UserSettings } from '@/utils/types';
import { normalizeBulletin } from '@/utils/normalizeBulletin';

type AppContextProviderProps = {
	initialState: AppState;
	children: ReactNode;
};

// Define the shape of the context state
type AppContextState = {
	content: Bulletin;
	setContent: React.Dispatch<React.SetStateAction<Bulletin>>;
	editorContentRef: React.MutableRefObject<string>;
	currentTab: number;
	setCurrentTab: (tab: number) => void;
	userData?: UserSettings;
	setUserData: (userData: UserSettings) => void;
	bulletinId: string;
};

const AppContext = createContext<AppContextState>({} as AppContextState);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
	initialState,
	children,
}) => {
	const [content, setContent] = useState(
		normalizeBulletin(initialState.bulletinData[0].bulletin),
	);
	const bulletinId = initialState.bulletinData[0].id;

	const [currentTab, setCurrentTab] = useState(
		initialState.userSettings ? Number(initialState.userSettings.currentTab) : 0,
	);
	const [userData, setUserData] = useState(initialState.userSettings);

	const editorContentRef = useRef((content.announcements as string) || '');

	const value = {
		content,
		setContent,
		editorContentRef,
		currentTab,
		setCurrentTab,
		userData,
		setUserData,
		bulletinId,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);
