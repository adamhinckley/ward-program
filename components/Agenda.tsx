import dynamic from 'next/dynamic';
import PreSacramentAgendaV2 from '@/components/PreSacramentAgenda';

const StandardSecondHalf = dynamic(() => import('@/components/StandardSecondHalf'), {
	ssr: false,
});

const ClosingHymnAndPrayer = dynamic(() => import('@/components/ClosingHymnAndPrayer'), {
	ssr: false,
});

const AgendaV2 = () => {
	return (
		<section aria-label="Meeting agenda updated view">
			<PreSacramentAgendaV2 />
			<StandardSecondHalf />
			<ClosingHymnAndPrayer />
		</section>
	);
};

export default AgendaV2;
