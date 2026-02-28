import { WardProgramPage } from '@/app/ward/WardProgramPage';

export default async function WardPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	return <WardProgramPage id={id?.trim()} />;
}
