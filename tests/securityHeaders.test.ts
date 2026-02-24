import { afterEach, describe, expect, it } from 'vitest';
import {
	applySecurityHeaders,
	buildContentSecurityPolicy,
	contentSecurityPolicy,
} from '../utils/securityHeaders';

type MutableEnv = Record<string, string | undefined>;

const setEnvVar = (key: string, value: string | undefined) => {
	if (value === undefined) {
		delete (process.env as MutableEnv)[key];
		return;
	}

	(process.env as MutableEnv)[key] = value;
};

describe('security headers', () => {
	const originalNodeEnv = process.env.NODE_ENV;
	const originalHstsEnabled = process.env.HSTS_ENABLED;

	afterEach(() => {
		setEnvVar('NODE_ENV', originalNodeEnv);
		setEnvVar('HSTS_ENABLED', originalHstsEnabled);
	});

	it('applies CSP and hardening headers', () => {
		const headers = new Headers();
		applySecurityHeaders(headers);

		expect(headers.get('Content-Security-Policy')).toBe(contentSecurityPolicy);
		expect(headers.get('X-Frame-Options')).toBe('DENY');
		expect(headers.get('X-Content-Type-Options')).toBe('nosniff');
		expect(headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
		expect(headers.get('Permissions-Policy')).toBe('camera=(), microphone=(), geolocation=()');
	});

	it('applies HSTS in production', () => {
		const headers = new Headers();
		setEnvVar('NODE_ENV', 'production');
		setEnvVar('HSTS_ENABLED', 'true');

		applySecurityHeaders(headers);

		expect(headers.get('Strict-Transport-Security')).toBe(
			'max-age=31536000; includeSubDomains',
		);
	});

	it('does not apply HSTS outside production', () => {
		const headers = new Headers();
		setEnvVar('NODE_ENV', 'test');
		setEnvVar('HSTS_ENABLED', 'true');

		applySecurityHeaders(headers);

		expect(headers.get('Strict-Transport-Security')).toBeNull();
	});

	it('does not apply HSTS when disabled in production', () => {
		const headers = new Headers();
		setEnvVar('NODE_ENV', 'production');
		setEnvVar('HSTS_ENABLED', 'false');

		applySecurityHeaders(headers);

		expect(headers.get('Strict-Transport-Security')).toBeNull();
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
