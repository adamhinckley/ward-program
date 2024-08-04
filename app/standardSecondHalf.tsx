import { useAppContext } from '@/context/AppContext';
import { getHymnLink } from '@/utils/helpers';

const StandardSecondHalf = () => {
	const { content } = useAppContext();

	if (Object.keys(content).length === 0) {
		return null;
	}

	const {
		isTestimonyMeeting,
		intermediateMusic: intermediateMusicToNarrow,
		blockTwo,
		blockThree,
		intermediateMusicPerformers,
		intermediateHymnTitle,
		intermediateHymnNumber,
		intermediateMusicLeftSide,
		intermediateMusicRightSide,
		intermediateHymnLink: savedIntermediateMusicLink,
	} = content;

	const intermediateMusicLink = getHymnLink(
		intermediateHymnNumber as string,
		intermediateHymnTitle as string,
		savedIntermediateMusicLink as string,
	);

	const isIntermediateMusicHymn = content.intermediateMusicType === 'hymn';

	return (
		<>
			{isTestimonyMeeting ? (
				<p className="block">Bearing of Testimonies</p>
			) : (
				<>
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
						{!isIntermediateMusicHymn ? (
							<>
								<div className="agenda-block">
									<div className="title-container">
										<p className="agenda-title">
											{intermediateMusicLeftSide as string}
										</p>
										<p className="agenda-content">
											{intermediateMusicRightSide as string}
										</p>
									</div>
								</div>
								{Array.isArray(intermediateMusicPerformers) &&
									intermediateMusicPerformers.map((performer, index) => (
										<div className="multiple-performers" key={index}>
											<p className="agenda-content">{performer as string}</p>
										</div>
									))}
							</>
						) : (
							<>
								<div className="title-container no-margin">
									<p className="agenda-title">Intermediate Hymn</p>
									{intermediateMusicLink ? (
										<a
											href={intermediateMusicLink as string}
											target="_blank"
											rel="noreferrer"
											className="underline text-blue-800"
										>
											<p className="agenda-content">
												{intermediateHymnNumber as string}
											</p>
										</a>
									) : (
										<p className="agenda-content">
											{intermediateHymnNumber as string}
										</p>
									)}
								</div>
								<div className="title-container hymn">
									<p className="agenda-content">
										{intermediateHymnTitle as string}
									</p>
								</div>
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
			)}
		</>
	);
};

export default StandardSecondHalf;
