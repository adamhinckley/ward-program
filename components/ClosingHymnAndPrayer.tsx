import { useAppContext } from '@/context/AppContext';

const ClosingHymnAndPrayer = () => {
	const { content } = useAppContext();
	const { closingHymnNumber, closingHymnTitle, closingPrayer, closingHymnLink } = content;
	const showClosingHymn = content.showClosingHymn === undefined || content.showClosingHymn;

	return (
		<div>
			<div className="mb-4">
				{showClosingHymn ? (
					<div className="mb-3 rounded-2xl bg-[var(--program-group-bg)] px-3 py-2">
						<div className="my-1 flex justify-between gap-3">
							<div className="whitespace-nowrap font-semibold">Closing Hymn</div>
							<div className="text-right">
								{closingHymnLink ? (
									<a
										href={closingHymnLink}
										target="_blank"
										rel="noreferrer"
										className="text-[var(--program-link)] underline"
									>
										{closingHymnNumber}
									</a>
								) : (
									closingHymnNumber
								)}
							</div>
						</div>
						<div className="my-[2px] mb-1 text-center opacity-90">
							{closingHymnTitle}
						</div>
					</div>
				) : null}
				<div className="mb-3 rounded-2xl bg-[var(--program-group-bg)] px-3 py-2">
					<div className="my-1 flex justify-between gap-3">
						<div className="whitespace-nowrap font-semibold">Closing Prayer</div>
						<div className="text-right">{closingPrayer}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClosingHymnAndPrayer;
