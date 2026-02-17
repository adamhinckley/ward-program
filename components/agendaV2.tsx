import ClosingHymnAndPrayerV2 from '@/components/closingHymnAndPrayerV2';
import PreSacramentAgendaV2 from '@/components/preSacramentAgendaV2';
import StandardSecondHalfV2 from '@/components/standardSecondHalfV2';

const AgendaV2 = () => {
	return (
		<section aria-label="Meeting agenda updated view">
			<PreSacramentAgendaV2 />
			<StandardSecondHalfV2 />
			<ClosingHymnAndPrayerV2 />
		</section>
	);
};

export default AgendaV2;
