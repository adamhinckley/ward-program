/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAppContext } from '@/context/AppContext';

const styles = css`
	.panel {
		margin-bottom: 16px;
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
		margin-bottom: 12px;
	}

	.group-card .row {
		margin: 4px 0;
	}

	.group-card .hymn-title {
		margin: 2px 0 4px;
	}

	a {
		color: var(--program-link);
		text-decoration: underline;
	}
`;

const ClosingHymnAndPrayerV2 = () => {
	const { content } = useAppContext();
	const { closingHymnNumber, closingHymnTitle, closingPrayer, closingHymnLink } = content;
	const showClosingHymn = content.showClosingHymn === undefined || content.showClosingHymn;

	return (
		<div css={styles}>
			<div className="panel">
				{showClosingHymn ? (
					<div className="group-card">
						<div className="row">
							<div className="label">Closing Hymn</div>
							<div className="value">
								{closingHymnLink ? (
									<a href={closingHymnLink} target="_blank" rel="noreferrer">
										{closingHymnNumber}
									</a>
								) : (
									closingHymnNumber
								)}
							</div>
						</div>
						<div className="hymn-title">{closingHymnTitle}</div>
					</div>
				) : null}
				<div className="group-card">
					<div className="row">
						<div className="label">Closing Prayer</div>
						<div className="value">{closingPrayer}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClosingHymnAndPrayerV2;
