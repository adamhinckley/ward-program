/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAppContext } from '@/context/AppContext';

const styles = css`
	.panel {
		margin-bottom: 16px;
	}

	.section-title {
		font-weight: 700;
		margin: 4px 0 10px;
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

	.performer {
		text-align: center;
		opacity: 0.9;
		margin: 3px 0;
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

	.group-card .row {
		margin: 4px 0;
	}

	.group-card .hymn-title {
		margin: 2px 0 4px;
	}

	.group-card .performer {
		margin: 2px 0;
	}

	a {
		color: var(--program-link);
		text-decoration: underline;
	}
`;

const StandardSecondHalfV2 = () => {
	const { content } = useAppContext();

	if (Object.keys(content).length === 0) {
		return null;
	}

	const {
		blockTwo,
		blockThree,
		customHeading,
		intermediateMusicPerformers,
		intermediateHymnTitle,
		intermediateHymnNumber,
		intermediateMusicLeftSide,
		intermediateMusicRightSide,
		intermediateHymnLink,
	} = content;

	const isIntermediateMusicHymn = content.intermediateMusicType === 'hymn';
	const showIntermediateMusic =
		content.showIntermediateMusic === undefined || content.showIntermediateMusic;

	return (
		<div css={styles}>
			<div className="panel">
				<div className="section-title">{customHeading}</div>
				{Array.isArray(blockTwo)
					? blockTwo.map((blockToNarrow, index) => {
							const block = blockToNarrow as { left: string; right: string };
							return (
								<div className="group-card" key={index}>
									<div className="row">
										<div className="label">{block.left}</div>
										<div className="value">{block.right}</div>
									</div>
								</div>
							);
						})
					: null}

				{showIntermediateMusic ? (
					!isIntermediateMusicHymn ? (
						<div className="group-card">
							<div className="row">
								<div className="label">{intermediateMusicLeftSide}</div>
								<div className="value">{intermediateMusicRightSide}</div>
							</div>
							{Array.isArray(intermediateMusicPerformers)
								? intermediateMusicPerformers.map((performer, index) => (
										<div className="performer" key={index}>
											{performer}
										</div>
									))
								: null}
							</div>
					) : (
							<div className="group-card">
							<div className="row">
								<div className="label">Intermediate Hymn</div>
								<div className="value">
									{intermediateHymnLink ? (
										<a href={intermediateHymnLink} target="_blank" rel="noreferrer">
											{intermediateHymnNumber}
										</a>
									) : (
										intermediateHymnNumber
									)}
								</div>
							</div>
							<div className="hymn-title">{intermediateHymnTitle}</div>
						</div>
					)
				) : null}

				{Array.isArray(blockThree)
					? blockThree.map((blockToNarrow, index) => {
							const block = blockToNarrow as { left: string; right: string };
							return (
								<div className="group-card" key={index}>
									<div className="row">
										<div className="label">{block.left}</div>
										<div className="value">{block.right}</div>
									</div>
								</div>
							);
						})
					: null}
			</div>
		</div>
	);
};

export default StandardSecondHalfV2;