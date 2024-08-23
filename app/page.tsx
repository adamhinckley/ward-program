'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Agenda from './agenda';
import Announcements from './announcements';
import FrontPage from './frontPage';
import { useAppContext } from '../context/AppContext';
import { Divider } from '@mui/material';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';
import MissingWardData from '@/components/MissingWardData';

const styles = css`
	max-width: 550px;
	margin: 0 auto;
`;

export default function Home() {
	const { content, missingWardData, urlParams } = useAppContext();
	const [isLoadingReady, setIsLoadingReady] = useState(false);

	const hasContent = Object.keys(content).length > 0;

	useEffect(() => {
		if (hasContent) {
			const timer = setTimeout(() => {
				setIsLoadingReady(true);
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [hasContent]);

	if (missingWardData || Object.keys(urlParams).length === 0) {
		return <MissingWardData />;
	}

	return (
		<main css={styles}>
			{(!hasContent || !isLoadingReady) && <Loading />}
			<FrontPage />
			<Agenda />
			<Divider sx={{ margin: '12px 0', borderColor: 'black' }} />
			<Announcements />
		</main>
	);
}
