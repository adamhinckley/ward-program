'use client';
import ClosingHymnAndPrayer from './closingHymnAndPrayer';
import PreSacramentAgenda from './preSacramentAgenda';
import StandardSecondHalf from './standardSecondHalf';

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
