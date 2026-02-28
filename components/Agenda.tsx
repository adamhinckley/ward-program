import dynamic from 'next/dynamic';
import PreSacramentAgendaV2 from '@/components/PreSacramentAgenda';

const StandardSecondHalfV2 = dynamic(() => import('@/components/StandardSecondHalf'), {
	ssr: false,
});

const ClosingHymnAndPrayerV2 = dynamic(() => import('@/components/closingHymnAndPrayer'), {
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
