import { useAppContext } from '@/context/AppContext';
import { useEffect, useState } from 'react';

const PreSacramentAgendaV2 = () => {
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
		<div className="mt-2">
			<div className="mb-3">
				<div className="mb-3 text-center">
					<div className="text-[1.05em] font-bold">{title}</div>
					<div className="mt-1 opacity-80">{currentOrNextSundayDate}</div>
				</div>

				{presiding || conducting || musicLeader || accompanist ? (
					<div>
						{presiding ? (
							<div className="mb-3 rounded-2xl bg-[var(--program-group-bg)] px-3 py-2">
								<div className="my-1 flex justify-between gap-3">
									<div className="whitespace-nowrap font-semibold">Presiding</div>
									<div className="text-right">{presiding}</div>
								</div>
							</div>
						) : null}
						{conducting ? (
							<div className="mb-3 rounded-2xl bg-[var(--program-group-bg)] px-3 py-2">
								<div className="my-1 flex justify-between gap-3">
									<div className="whitespace-nowrap font-semibold">
										Conducting
									</div>
									<div className="text-right">{conducting}</div>
								</div>
							</div>
						) : null}
						{musicLeader ? (
							<div className="mb-3 rounded-2xl bg-[var(--program-group-bg)] px-3 py-2">
								<div className="my-1 flex justify-between gap-3">
									<div className="whitespace-nowrap font-semibold">Chorister</div>
									<div className="text-right">{musicLeader}</div>
								</div>
							</div>
						) : null}
						{accompanist ? (
							<div className="mb-3 rounded-2xl bg-[var(--program-group-bg)] px-3 py-2">
								<div className="my-1 flex justify-between gap-3">
									<div className="whitespace-nowrap font-semibold">
										Accompanist
									</div>
									<div className="text-right">{accompanist}</div>
								</div>
							</div>
						) : null}
					</div>
				) : null}
			</div>

			<div className="mb-3">
				<div>
					<div className="my-2 flex justify-center gap-3">
						<div className="font-bold tracking-[0.02em]">Ward Announcements</div>
					</div>
				</div>
				{shouldShowOpeningHymn ? (
					<div className="mb-3 rounded-2xl bg-[var(--program-group-bg)] px-3 py-2">
						<div className="my-1 flex justify-between gap-3">
							<div className="whitespace-nowrap font-semibold">Opening Hymn</div>
							<div className="text-right">
								{openingHymnLink ? (
									<a
										href={openingHymnLink}
										target="_blank"
										rel="noreferrer"
										className="text-[var(--program-link)] underline"
									>
										{openingHymnNumber}
									</a>
								) : (
									openingHymnNumber
								)}
							</div>
						</div>
						<div className="my-[2px] mb-1 text-center opacity-90">
							{openingHymnTitle}
						</div>
					</div>
				) : null}

				<div className="mb-3 rounded-2xl bg-[var(--program-group-bg)] px-3 py-2">
					<div className="my-1 flex justify-between gap-3">
						<div className="whitespace-nowrap font-semibold">Opening Prayer</div>
						<div className="text-right">{openingPrayer}</div>
					</div>
				</div>
			</div>

			<div className="mb-3">
				<div>
					<div className="my-2 flex justify-center gap-3">
						<div className="font-bold tracking-[0.02em]">Stake and Ward Business</div>
					</div>
				</div>
				{Array.isArray(blockOne)
					? blockOne.map((block, index) => (
							<div
								className="mb-3 rounded-2xl bg-[var(--program-group-bg)] px-3 py-2"
								key={index}
							>
								<div className="my-1 flex justify-between gap-3">
									<div className="whitespace-nowrap font-semibold">
										{block.left}
									</div>
									<div className="text-right">{block.right}</div>
								</div>
							</div>
						))
					: null}

				{shouldShowSacramentHymn ? (
					<div className="mb-3 rounded-2xl bg-[var(--program-group-bg)] px-3 py-2">
						<div className="my-1 flex justify-between gap-3">
							<div className="whitespace-nowrap font-semibold">Sacrament Hymn</div>
							<div className="text-right">
								{sacramentHymnLink ? (
									<a
										href={sacramentHymnLink}
										target="_blank"
										rel="noreferrer"
										className="text-[var(--program-link)] underline"
									>
										{sacramentHymnNumber}
									</a>
								) : (
									sacramentHymnNumber
								)}
							</div>
						</div>
						<div className="my-[2px] mb-1 text-center opacity-90">
							{sacramentHymnTitle}
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default PreSacramentAgendaV2;
