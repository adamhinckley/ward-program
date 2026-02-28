import { redirect } from 'next/navigation';
import { WardProgramPage } from './ward/WardProgramPage';

export default async function Home({
	searchParams,
}: {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const resolvedSearchParams = (await searchParams) ?? {};
	const idParam = resolvedSearchParams.id;
	const id = Array.isArray(idParam) ? idParam[0] : idParam;

	if (id?.trim()) {
		redirect(`/ward/${encodeURIComponent(id.trim())}`);
	}

	return <WardProgramPage />;
}
