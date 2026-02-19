'use client';
import { useAppContext } from '@/context/AppContext';
import { useEffect, useState } from 'react';

const PreSacramentAgenda = () => {
	const { content } = useAppContext();
	const [currentOrNextSundayDate, setCurrentOrNextSundayDate] = useState('');

	useEffect(() => {
		const date = new Date();
		const currentDay = date.getDay();
		const daysUntilNextSunday = currentDay === 0 ? 0 : 7 - currentDay;
		date.setDate(date.getDate() + daysUntilNextSunday);

		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};
		setCurrentOrNextSundayDate(date.toLocaleDateString('en-US', options));
	}, []);

	const {
		title,
		presiding,
		conducting,
		musicLeader,
		accompanist,
		openingHymnNumber,
		openingHymnTitle,
		openingPrayer,
		sacramentHymnNumber,
		sacramentHymnTitle,
		blockOne,
		openingHymnLink,
		sacramentHymnLink,
		showOpeningHymn,
		showSacramentHymn,
	} = content;

	const shouldShowOpeningHymn = showOpeningHymn === undefined || showOpeningHymn;
	const shouldShowSacramentHymn = showSacramentHymn === undefined || showSacramentHymn;

	return (
		<>
			<h1 className="text-base font-semibold text-center mt-2">{title}</h1>
			<p className="date">{currentOrNextSundayDate}</p>

			{presiding && (
				<div className="leader-container">
					<h2>Presiding</h2>
					<h2>{presiding}</h2>
				</div>
			)}
			{conducting && (
				<div className="leader-container">
					<h2>Conducting</h2>
					<h2>{conducting}</h2>
				</div>
			)}
			{musicLeader && (
				<div className="leader-container">
					<h2>Chorister</h2>
					<h2>{musicLeader}</h2>
				</div>
			)}
			{accompanist && (
				<div className="leader-container">
					<h2>Accompanist</h2>
					<h2>{accompanist}</h2>
				</div>
			)}
			<p className="block">Ward Announcements</p>
			<div className="agenda-block">
				{shouldShowOpeningHymn && (
					<>
						<div className="title-container no-margin">
							<p className="agenda-title">Opening Hymn</p>
							{openingHymnLink ? (
								<a
									href={openingHymnLink}
									target="_blank"
									rel="noreferrer"
									className="underline text-blue-800"
								>
									<p className="agenda-content">{openingHymnNumber}</p>
								</a>
							) : (
								<p className="agenda-content">{openingHymnNumber}</p>
							)}
						</div>
						<div className="title-container  hymn">
							<p className="agenda-content title">{openingHymnTitle}</p>
						</div>
					</>
				)}
				<div className="title-container">
					<p className="agenda-title">Opening Prayer</p>
					<p className="agenda-content">{openingPrayer}</p>
				</div>
			</div>
			<p className="block">Stake and Ward Business</p>
			{Array.isArray(blockOne) &&
				blockOne.map((block, index) => {
					const { left, right } = block;
					return (
						<div className="agenda-block" key={index}>
							<div className="title-container">
								<p className="agenda-title">{left}</p>
								<p className="agenda-content">{right}</p>
							</div>
						</div>
					);
				})}
			{shouldShowSacramentHymn && (
				<div className="agenda-block">
					<div className="title-container">
						<p className="agenda-title no-margin">Sacrament Hymn</p>
						{sacramentHymnLink ? (
							<a
								href={sacramentHymnLink}
								target="_blank"
								rel="noreferrer"
								className="underline text-blue-800"
							>
								<p className="agenda-content">{sacramentHymnNumber}</p>
							</a>
						) : (
							<p className="agenda-content ">{sacramentHymnNumber}</p>
						)}
					</div>
					<div className="title-container hymn">
						<p className="agenda-content">{sacramentHymnTitle}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default PreSacramentAgenda;
