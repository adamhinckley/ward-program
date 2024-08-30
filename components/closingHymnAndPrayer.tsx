import { useAppContext } from '@/context/AppContext';
import { getHymnLink } from '@/utils/helpers';

const ClosingHymnAndPrayer = () => {
	const { content } = useAppContext();
	const {
		closingHymnNumber,
		closingHymnTitle,
		closingPrayer,
		closingHymnLink: savedClosingHymnLink,
	} = content;

	const closingHymnLink = getHymnLink(
		closingHymnNumber as string,
		closingHymnTitle as string,
		savedClosingHymnLink as string,
	);

	return (
		<div className="agenda-block">
			<div className="title-container no-margin">
				<p className="agenda-title">Closing Hymn</p>
				{closingHymnLink ? (
					<a
						href={closingHymnLink as string}
						target="_blank"
						rel="noreferrer"
						className="underline text-blue-800"
					>
						<p className="agenda-content">{closingHymnNumber as string}</p>
					</a>
				) : (
					<p className="agenda-content">{closingHymnNumber as string}</p>
				)}
			</div>
			<div className="title-container hymn">
				<p className="agenda-content">{closingHymnTitle as string}</p>
			</div>
			<div className="title-container">
				<p className="agenda-title">Closing Prayer</p>
				<p className="agenda-content">{closingPrayer as string}</p>
			</div>
		</div>
	);
};

export default ClosingHymnAndPrayer;
