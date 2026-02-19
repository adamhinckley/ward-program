// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import {
	containsScriptTagAttempt,
	decodeHtmlEntities,
	sanitizeAnnouncementHtml,
} from '../utils/sanitization';

describe('announcement sanitization', () => {
	it('decodes escaped html entities', () => {
		const encoded = '&lt;script&gt;alert(1)&lt;/script&gt;';
		expect(decodeHtmlEntities(encoded)).toBe('<script>alert(1)</script>');
	});

	it('decodes numeric html entities', () => {
		const encodedDecimal = '&#60;script&#62;alert(1)&#60;/script&#62;';
		const encodedHex = '&#x3C;script&#x3E;alert(1)&#x3C;/script&#x3E;';

		expect(decodeHtmlEntities(encodedDecimal)).toBe('<script>alert(1)</script>');
		expect(decodeHtmlEntities(encodedHex)).toBe('<script>alert(1)</script>');
	});

	it('uses fallback decoder when DOM APIs are unavailable', () => {
		vi.stubGlobal('window', undefined);
		vi.stubGlobal('document', undefined);

		try {
			const encoded = '&lt;script&gt;Tom &amp; Jerry&#39;s&#x3C;/script&#x3E;';
			expect(decodeHtmlEntities(encoded)).toBe("<script>Tom & Jerry's</script>");
		} finally {
			vi.unstubAllGlobals();
		}
	});

	it('preserves invalid numeric entities in fallback decoder', () => {
		vi.stubGlobal('window', undefined);
		vi.stubGlobal('document', undefined);

		try {
			expect(decodeHtmlEntities('&#x110000;')).toBe('&#x110000;');
		} finally {
			vi.unstubAllGlobals();
		}
	});

	it('detects literal script tags', () => {
		expect(containsScriptTagAttempt('<script>alert(1)</script>')).toBe(true);
	});

	it('detects encoded script tags', () => {
		expect(containsScriptTagAttempt('&lt;script&gt;alert(1)&lt;/script&gt;')).toBe(true);
	});

	it('detects numeric encoded script tags', () => {
		expect(containsScriptTagAttempt('&#60;script&#62;alert(1)&#60;/script&#62;')).toBe(true);
		expect(containsScriptTagAttempt('&#x3C;script&#x3E;alert(1)&#x3C;/script&#x3E;')).toBe(
			true,
		);
	});

	it('detects script tags obfuscated with unicode and hex escapes', () => {
		expect(containsScriptTagAttempt('<scr\\x69pt>alert(1)</scr\\x69pt>')).toBe(true);
		expect(containsScriptTagAttempt('&lt;scr\\u0069pt&gt;alert(1)&lt;/scr\\u0069pt&gt;')).toBe(
			true,
		);
	});

	it('does not flag normal text', () => {
		expect(containsScriptTagAttempt('<p>Hello world</p>')).toBe(false);
	});

	it('strips executable script tags from html', () => {
		const dirty = '<p>safe</p><script>alert(document.cookie)</script>';
		const clean = sanitizeAnnouncementHtml(dirty);

		expect(clean).toContain('<p>safe</p>');
		expect(clean.toLowerCase()).not.toContain('<script');
		expect(clean.toLowerCase()).not.toContain('alert(document.cookie)');
	});
});
