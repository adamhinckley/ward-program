import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { applySecurityHeaders } from '@/utils/securityHeaders';

export async function proxy(request: NextRequest) {
	const response = await updateSession(request);

	// Adds CSP and related hardening headers to every proxy-handled response.
	applySecurityHeaders(response.headers);

	return response;
}

export const config = {
	matcher: ['/protected/:path*', '/auth/:path*'],
};
