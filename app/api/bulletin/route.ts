import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export async function PUT(request: Request) {
	const supabase = await createClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	let bulletin: unknown;
	try {
		const body = (await request.json()) as { bulletin?: unknown };
		bulletin = body?.bulletin;
	} catch {
		return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
	}

	if (!bulletin || typeof bulletin !== 'object') {
		return NextResponse.json({ error: 'Missing bulletin payload' }, { status: 400 });
	}

	const { error } = await supabase
		.from('ward-bulletin')
		.update({ bulletin })
		.eq('id', user.id)
		.select('id')
		.maybeSingle();

	if (error) {
		return NextResponse.json({ error: 'Unable to update bulletin' }, { status: 500 });
	}

	revalidateTag(`ward-bulletin:${user.id}`, 'max');

	return NextResponse.json({ ok: true });
}
