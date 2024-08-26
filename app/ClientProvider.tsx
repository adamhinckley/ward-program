'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Agenda from './agenda';
import Announcements from './announcements';
import FrontPage from './frontPage';
import { AppContextProvider } from '../context/AppContext';
import { Divider } from '@mui/material';
import MissingWardData from '@/components/MissingWardData';

const styles = css`
	max-width: 550px;
	margin: 0 auto;
`;

export function ClientProvider({ initialState }: { initialState: any }) {
	if (initialState === 'no data') {
		return (
			<div css={styles}>
				<MissingWardData />
			</div>
		);
	}
	return (
		<AppContextProvider initialState={initialState}>
			<main css={styles}>
				{/* {(!hasContent || !isLoadingReady) && <Loading />} */}
				<FrontPage />
				<Agenda />
				<Divider sx={{ margin: '12px 0', borderColor: 'black' }} />
				<Announcements />
			</main>
		</AppContextProvider>
	);
}
