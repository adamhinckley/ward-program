/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAppContext } from '@/context/AppContext';

const currentOrNextSundayDate = (() => {
	const date = new Date();
	const currentDay = date.getDay();
	const daysUntilNextSunday = currentDay === 0 ? 0 : 7 - currentDay;
	date.setDate(date.getDate() + daysUntilNextSunday);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return date.toLocaleDateString('en-US', options);
})();

const styles = css`
	margin-top: 8px;

	.panel {
		margin-bottom: 16px;
	}

	.header {
		text-align: center;
		margin-bottom: 12px;
	}

	.heading {
		font-size: 1.05em;
		font-weight: 700;
	}

	.date {
		opacity: 0.8;
		margin-top: 4px;
	}

	.section-title {
		font-weight: 700;
		margin: 10px 0 8px;
		text-align: center;
	}

	.row {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		margin: 8px 0;
	}

	.label {
		font-weight: 600;
		white-space: nowrap;
	}

	.value {
		text-align: right;
	}

	.hymn-title {
		text-align: center;
		opacity: 0.9;
		margin: 0 0 8px;
	}

	.group-card {
		background: var(--program-group-bg);
		border-radius: 16px;
		padding: 8px 12px;
		margin: 6px 0;
	}

	.connected-group {
		background: var(--program-group-bg);
		border-radius: 16px;
		padding: 8px 12px;
		margin: 8px 0;
	}

	.connected-group .row {
		margin: 4px 0;
	}

	.group-card .row {
		margin: 4px 0;
	}

	.group-card .hymn-title {
		margin: 2px 0 4px;
	}

	.agenda-marker .row {
		justify-content: center;
	}

	.agenda-marker .label {
		font-weight: 700;
		letter-spacing: 0.02em;
	}

	a {
		color: var(--program-link);
		text-decoration: underline;
	}
`;

const PreSacramentAgendaV2 = () => {
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
		showOpeningHymn,
		showSacramentHymn,
	} = content;

	const shouldShowOpeningHymn = showOpeningHymn === undefined || showOpeningHymn;
	const shouldShowSacramentHymn = showSacramentHymn === undefined || showSacramentHymn;

	return (
		<div css={styles}>
			<div className="panel">
				<div className="header">
					<div className="heading">{title}</div>
					<div className="date">{currentOrNextSundayDate}</div>
				</div>

				{presiding || conducting || musicLeader || accompanist ? (
					// <div className="connected-group">
					<div>
						{presiding ? (
							<div className="row group-card">
								<div className="label">Presiding</div>
								<div className="value">{presiding}</div>
							</div>
						) : null}
						{conducting ? (
							<div className="row group-card">
								<div className="label">Conducting</div>
								<div className="value">{conducting}</div>
							</div>
						) : null}
						{musicLeader ? (
							<div className="row group-card">
								<div className="label">Chorister</div>
								<div className="value">{musicLeader}</div>
							</div>
						) : null}
						{accompanist ? (
							<div className="row group-card">
								<div className="label">Accompanist</div>
								<div className="value">{accompanist}</div>
							</div>
						) : null}
					</div>
				) : null}
			</div>

			<div className="panel">
				<div className=" agenda-marker">
					<div className="row">
						<div className="label">Ward Announcements</div>
					</div>
				</div>
				{shouldShowOpeningHymn ? (
					<div className="group-card">
						<div className="row">
							<div className="label">Opening Hymn</div>
							<div className="value">
								{openingHymnLink ? (
									<a href={openingHymnLink} target="_blank" rel="noreferrer">
										{openingHymnNumber}
									</a>
								) : (
									openingHymnNumber
								)}
							</div>
						</div>
						<div className="hymn-title">{openingHymnTitle}</div>
					</div>
				) : null}

				<div className="group-card">
					<div className="row">
						<div className="label">Opening Prayer</div>
						<div className="value">{openingPrayer}</div>
					</div>
				</div>
			</div>

			<div className="panel">
				<div className=" agenda-marker">
					<div className="row">
						<div className="label">Stake and Ward Business</div>
					</div>
				</div>
				{Array.isArray(blockOne)
					? blockOne.map((block, index) => (
							<div className="group-card" key={index}>
								<div className="row">
									<div className="label">{block.left}</div>
									<div className="value">{block.right}</div>
								</div>
							</div>
						))
					: null}

				{shouldShowSacramentHymn ? (
					<div className="group-card">
						<div className="row">
							<div className="label">Sacrament Hymn</div>
							<div className="value">
								{sacramentHymnLink ? (
									<a href={sacramentHymnLink} target="_blank" rel="noreferrer">
										{sacramentHymnNumber}
									</a>
								) : (
									sacramentHymnNumber
								)}
							</div>
						</div>
						<div className="hymn-title">{sacramentHymnTitle}</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default PreSacramentAgendaV2;
