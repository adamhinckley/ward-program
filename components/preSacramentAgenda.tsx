'use client';
import { useAppContext } from '@/context/AppContext';
import { getHymnLink } from '@/utils/helpers';

const currentOrNextSundayDate = (() => {
	const date = new Date();
	// Get the current day of the week, 0 (Sunday) - 6 (Saturday)
	const currentDay = date.getDay();
	// If today is Sunday, don't add any days. Otherwise, calculate how many days to add to get to the next Sunday
	const daysUntilNextSunday = currentDay === 0 ? 0 : 7 - currentDay;
	// Add the necessary days to get to the next Sunday or stay on the current date if it's already Sunday
	date.setDate(date.getDate() + daysUntilNextSunday);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return date.toLocaleDateString('en-US', options);
})();

const PreSacramentAgenda = () => {
	const { content } = useAppContext();

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
	} = content;

	return (
		<>
			<h1 className="text-base font-semibold text-center mt-2">{title as string}</h1>
			<p className="date">{currentOrNextSundayDate}</p>
			<div className="leader-container">
				<div>
					<h2>Presiding</h2>
					<h2>Conducting</h2>
					<h2>Chorister</h2>
					<h2>Organist</h2>
				</div>
				<div className="names">
					<h2>{presiding as string}</h2>
					<h2>{conducting as string}</h2>
					<h2>{musicLeader as string}</h2>
					<h2>{accompanist as string}</h2>
				</div>
			</div>
			<p className="block">Ward Announcements</p>
			<div className="agenda-block">
				<div className="title-container no-margin">
					<p className="agenda-title">Opening Hymn</p>
					{openingHymnLink ? (
						<a
							href={openingHymnLink as string}
							target="_blank"
							rel="noreferrer"
							className="underline text-blue-800"
						>
							<p className="agenda-content">{openingHymnNumber as string}</p>
						</a>
					) : (
						<p className="agenda-content">{openingHymnNumber as string}</p>
					)}
				</div>
				<div className="title-container  hymn">
					<p className="agenda-content title">{openingHymnTitle as string}</p>
				</div>
				<div className="title-container">
					<p className="agenda-title">Opening Prayer</p>
					<p className="agenda-content">{openingPrayer as string}</p>
				</div>
			</div>
			<p className="block">Stake and Ward Business</p>
			{Array.isArray(blockOne) &&
				blockOne.map((block, index) => {
					const { left, right } = block as { left: string; right: string };
					return (
						<div className="agenda-block" key={index}>
							<div className="title-container">
								<p className="agenda-title">{left}</p>
								<p className="agenda-content">{right}</p>
							</div>
						</div>
					);
				})}
			<div className="agenda-block">
				<div className="title-container">
					<p className="agenda-title no-margin">Sacrament Hymn</p>
					{sacramentHymnLink ? (
						<a
							href={sacramentHymnLink as string}
							target="_blank"
							rel="noreferrer"
							className="underline text-blue-800"
						>
							<p className="agenda-content">{sacramentHymnNumber as string}</p>
						</a>
					) : (
						<p className="agenda-content ">{sacramentHymnNumber as string}</p>
					)}
				</div>
				<div className="title-container hymn">
					<p className="agenda-content">{sacramentHymnTitle as string}</p>
				</div>
			</div>
			<p className="block">Sacrament Administered by the Aaronic Priesthood</p>
		</>
	);
};

export default PreSacramentAgenda;
