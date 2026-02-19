import dynamic from 'next/dynamic';
import PreSacramentAgendaV2 from '@/components/preSacramentAgendaV2';

const StandardSecondHalfV2 = dynamic(() => import('@/components/standardSecondHalfV2'), {
	ssr: false,
});

const ClosingHymnAndPrayerV2 = dynamic(() => import('@/components/closingHymnAndPrayerV2'), {
	ssr: false,
});

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
