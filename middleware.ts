import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { applySecurityHeaders } from '@/utils/securityHeaders';

export async function middleware(request: NextRequest) {
	const response = await updateSession(request);

	// Adds CSP and related hardening headers to every middleware-handled response.
	applySecurityHeaders(response.headers);

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
		 * Feel free to modify this pattern to include more paths.
		 */
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
