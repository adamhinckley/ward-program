import { useAppContext } from '@/context/AppContext';

const StandardSecondHalf = () => {
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
		<>
			<p className="block">{customHeading}</p>
			{Array.isArray(blockTwo) &&
				blockTwo.map((blockToNarrow, index) => {
					const block = blockToNarrow as { left: string; right: string };
					return (
						<div className="agenda-block" key={index}>
							<div className="title-container">
								<p className="agenda-title">{block.left}</p>
								<p className="agenda-content">{block.right}</p>
							</div>
						</div>
					);
				})}

			<div className="agenda-block">
				{showIntermediateMusic && (
					<>
						{!isIntermediateMusicHymn ? (
							<>
								<div className="agenda-block">
									<div className="title-container">
										<p className="agenda-title">{intermediateMusicLeftSide}</p>
										<p className="agenda-content">
											{intermediateMusicRightSide}
										</p>
									</div>
								</div>
								{Array.isArray(intermediateMusicPerformers) &&
									intermediateMusicPerformers.map((performer, index) => (
										<div className="multiple-performers" key={index}>
											<p className="agenda-content">{performer}</p>
										</div>
									))}
							</>
						) : (
							<>
								<div className="title-container no-margin">
									<p className="agenda-title">Intermediate Hymn</p>
									{intermediateHymnLink ? (
										<a
											href={intermediateHymnLink}
											target="_blank"
											rel="noreferrer"
											className="underline text-blue-800"
										>
											<p className="agenda-content">
												{intermediateHymnNumber}
											</p>
										</a>
									) : (
										<p className="agenda-content">{intermediateHymnNumber}</p>
									)}
								</div>
								<div className="title-container hymn">
									<p className="agenda-content">{intermediateHymnTitle}</p>
								</div>
							</>
						)}
					</>
				)}
				{Array.isArray(blockThree) &&
					blockThree.map((blockToNarrow, index) => {
						const block = blockToNarrow as { left: string; right: string };
						return (
							<div className="agenda-block" key={index}>
								<div className="title-container">
									<p className="agenda-title">{block.left}</p>
									<p className="agenda-content">{block.right}</p>
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default StandardSecondHalf;
