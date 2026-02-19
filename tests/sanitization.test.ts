// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
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

	it('detects literal script tags', () => {
		expect(containsScriptTagAttempt('<script>alert(1)</script>')).toBe(true);
	});

	it('detects encoded script tags', () => {
		expect(containsScriptTagAttempt('&lt;script&gt;alert(1)&lt;/script&gt;')).toBe(true);
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
