import { describe, expect, it } from 'vitest';
import {
	applySecurityHeaders,
	buildContentSecurityPolicy,
	contentSecurityPolicy,
} from '../utils/securityHeaders';

describe('security headers', () => {
	it('applies CSP and hardening headers', () => {
		const headers = new Headers();
		applySecurityHeaders(headers);

		expect(headers.get('Content-Security-Policy')).toBe(contentSecurityPolicy);
		expect(headers.get('X-Frame-Options')).toBe('DENY');
		expect(headers.get('X-Content-Type-Options')).toBe('nosniff');
		expect(headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
		expect(headers.get('Permissions-Policy')).toBe('camera=(), microphone=(), geolocation=()');
	});

	it('contains key CSP directives', () => {
		expect(contentSecurityPolicy).toContain("default-src 'self'");
		expect(contentSecurityPolicy).toContain("script-src 'self' 'unsafe-inline'");
		expect(contentSecurityPolicy).toContain('https:');
		expect(contentSecurityPolicy).toContain("object-src 'none'");
		expect(contentSecurityPolicy).toContain('upgrade-insecure-requests');
	});

	it('builds stricter production CSP without unsafe-eval', () => {
		const productionPolicy = buildContentSecurityPolicy(false);

		expect(productionPolicy).toContain("script-src 'self' 'unsafe-inline' https:");
		expect(productionPolicy).not.toContain("'unsafe-eval'");
	});

	it('builds development CSP with unsafe-eval for local tooling', () => {
		const developmentPolicy = buildContentSecurityPolicy(true);

		expect(developmentPolicy).toContain(
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
		);
	});
});
