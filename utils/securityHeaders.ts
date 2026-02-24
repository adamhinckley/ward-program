export const buildContentSecurityPolicy = (isDevelopment: boolean) => {
	const scriptSrc = isDevelopment
		? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:"
		: "script-src 'self' 'unsafe-inline' https:";

	return [
		"default-src 'self'",
		"base-uri 'self'",
		"form-action 'self'",
		"frame-ancestors 'none'",
		"object-src 'none'",
		scriptSrc,
		"style-src 'self' 'unsafe-inline' https:",
		"img-src 'self' data: blob: https:",
		"font-src 'self' data: https:",
		"connect-src 'self' https: wss:",
		"frame-src 'self'",
		'upgrade-insecure-requests',
	].join('; ');
};

export const contentSecurityPolicy = buildContentSecurityPolicy(
	process.env.NODE_ENV !== 'production',
);

export const applySecurityHeaders = (
	headers: Headers,
	nodeEnv: string | undefined = process.env.NODE_ENV,
) => {
	headers.set('Content-Security-Policy', contentSecurityPolicy);
	headers.set('X-Frame-Options', 'DENY');
	headers.set('X-Content-Type-Options', 'nosniff');
	headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	if (nodeEnv === 'production') {
		headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	}
};
