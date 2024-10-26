import { useAppContext } from '@/context/AppContext';

const ClosingHymnAndPrayer = () => {
	const { content } = useAppContext();
	const { closingHymnNumber, closingHymnTitle, closingPrayer, closingHymnLink } = content;

	const showClosingHymn = content.showClosingHymn === undefined || content.showClosingHymn;

	return (
		<div className="agenda-block">
			{showClosingHymn && (
				<>
					<div className="title-container no-margin">
						<p className="agenda-title">Closing Hymn</p>
						{closingHymnLink ? (
							<a
								href={closingHymnLink}
								target="_blank"
								rel="noreferrer"
								className="underline text-blue-800"
							>
								<p className="agenda-content">{closingHymnNumber}</p>
							</a>
						) : (
							<p className="agenda-content">{closingHymnNumber}</p>
						)}
					</div>
					<div className="title-container hymn">
						<p className="agenda-content">{closingHymnTitle}</p>
					</div>
				</>
			)}
			<div className="title-container">
				<p className="agenda-title">Closing Prayer</p>
				<p className="agenda-content">{closingPrayer}</p>
			</div>
		</div>
	);
};

export default ClosingHymnAndPrayer;
