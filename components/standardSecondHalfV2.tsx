import { useAppContext } from '@/context/AppContext';

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
		<div>
			<div className="mb-3">
				<div className="my-1 mb-[10px] text-center font-bold">{customHeading}</div>
				{Array.isArray(blockTwo)
					? blockTwo.map((blockToNarrow, index) => {
							const block = blockToNarrow as { left: string; right: string };
							return (
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
							);
						})
					: null}

				{showIntermediateMusic ? (
					!isIntermediateMusicHymn ? (
						<div className="mb-3 rounded-2xl bg-[var(--program-group-bg)] px-3 py-2">
							<div className="my-1 flex justify-between gap-3">
								<div className="whitespace-nowrap font-semibold">
									{intermediateMusicLeftSide}
								</div>
								<div className="text-right">{intermediateMusicRightSide}</div>
							</div>
							{Array.isArray(intermediateMusicPerformers)
								? intermediateMusicPerformers.map((performer, index) => (
										<div
											className="my-[2px] text-center opacity-90"
											key={index}
										>
											{performer}
										</div>
									))
								: null}
						</div>
					) : (
						<div className="mb-3 rounded-2xl bg-[var(--program-group-bg)] px-3 py-2">
							<div className="my-1 flex justify-between gap-3">
								<div className="whitespace-nowrap font-semibold">
									Intermediate Hymn
								</div>
								<div className="text-right">
									{intermediateHymnLink ? (
										<a
											href={intermediateHymnLink}
											target="_blank"
											rel="noreferrer"
											className="text-[var(--program-link)] underline"
										>
											{intermediateHymnNumber}
										</a>
									) : (
										intermediateHymnNumber
									)}
								</div>
							</div>
							<div className="my-[2px] mb-1 text-center opacity-90">
								{intermediateHymnTitle}
							</div>
						</div>
					)
				) : null}

				{Array.isArray(blockThree)
					? blockThree.map((blockToNarrow, index) => {
							const block = blockToNarrow as { left: string; right: string };
							return (
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
							);
						})
					: null}
			</div>
		</div>
	);
};

export default StandardSecondHalfV2;
