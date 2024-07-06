'use client';
import ClosingHymnAndPrayer from './closingHymnAndPrayer';
import PreSacramentAgenda from './preSacramentAgenda';
import { settings } from './settings';
import StandardSecondHalf from './standardSecondHalf';

const Agenda = () => {
	return (
		<div className="px-3">
			<PreSacramentAgenda />
			<StandardSecondHalf />
			<ClosingHymnAndPrayer />
		</div>
	);
};

export default Agenda;
