'use client';
import ClosingHymnAndPrayer from '../components/closingHymnAndPrayer';
import PreSacramentAgenda from '../components/preSacramentAgenda';
import StandardSecondHalf from '../components/standardSecondHalf';

const Agenda = () => {
	return (
		<div>
			<PreSacramentAgenda />
			<StandardSecondHalf />
			<ClosingHymnAndPrayer />
		</div>
	);
};

export default Agenda;
