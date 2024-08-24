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

export default function Home({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const { content } = useAppContext();
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

	if (!searchParams || (searchParams && !Object.keys(searchParams).length)) {
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
