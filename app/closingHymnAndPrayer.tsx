import { useAppContext } from '@/context/AppContext';

const ClosingHymnAndPrayer = () => {
	const { content } = useAppContext();
	const { closingHymn, closingHymnTitle, closingPrayer } = content;
	return (
		<div className="agenda-block">
			<div className="title-container no-margin">
				<p className="agenda-title">Closing Hymn</p>
				<p className="agenda-content">{closingHymn as string}</p>
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
