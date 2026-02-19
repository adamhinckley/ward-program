import DOMPurify from 'dompurify';

const scriptTagPattern = /<\s*\/?\s*script\b/i;

/**
 * Decodes JavaScript-style escaped characters in a string.
 *
 * Supports `\u{...}`, `\uXXXX`, and `\xHH` forms and leaves invalid escapes unchanged.
 */
const decodeEscapedCharacters = (value: string) => {
	return value.replace(
		/\\u\{([\da-f]{1,6})\}|\\u([\da-f]{4})|\\x([\da-f]{2})/gi,
		(match, unicodeCodePoint: string, unicodeCodeUnit: string, hexCodeUnit: string) => {
			const code = unicodeCodePoint ?? unicodeCodeUnit ?? hexCodeUnit;
			const radix = 16;
			const parsedCode = Number.parseInt(code, radix);

			if (Number.isNaN(parsedCode) || parsedCode < 0 || parsedCode > 0x10ffff) {
				return match;
			}

			try {
				return String.fromCodePoint(parsedCode);
			} catch {
				return match;
			}
		},
	);
};

/**
 * Decodes a numeric HTML entity body (for example `#60` or `#x3C`) into a character.
 *
 * Returns the original entity text when the numeric value is invalid or out of range.
 */
const decodeNumericEntity = (entityBody: string) => {
	const isHex = entityBody.startsWith('#x') || entityBody.startsWith('#X');
	const rawValue = isHex ? entityBody.slice(2) : entityBody.slice(1);
	const radix = isHex ? 16 : 10;
	const codePoint = Number.parseInt(rawValue, radix);

	if (Number.isNaN(codePoint) || codePoint < 0 || codePoint > 0x10ffff) {
		return `&${entityBody};`;
	}

	try {
		return String.fromCodePoint(codePoint);
	} catch {
		return `&${entityBody};`;
	}
};

/**
 * Fallback HTML entity decoder used when DOM-based APIs are unavailable.
 *
 * Decodes common named entities and numeric entities, preserving unknown entities.
 */
const decodeHtmlEntitiesFallback = (value: string) => {
	const namedEntityMap: Record<string, string> = {
		amp: '&',
		lt: '<',
		gt: '>',
		quot: '"',
		apos: "'",
		nbsp: '\u00a0',
	};

	return value.replace(/&(#(?:x[\da-f]+|\d+)|[a-z][\w-]*);/gi, (match, entityBody: string) => {
		if (entityBody.startsWith('#')) {
			return decodeNumericEntity(entityBody);
		}

		const namedEntity = namedEntityMap[entityBody.toLowerCase()];
		return namedEntity ?? match;
	});
};

/**
 * Decodes HTML entities in text using the best available environment API.
 *
 * Prefers DOM parsing in browser-like contexts and falls back to a lightweight
 * manual decoder in non-DOM environments.
 */
export const decodeHtmlEntities = (value: string) => {
	if (typeof window !== 'undefined' && typeof window.DOMParser !== 'undefined') {
		const parsedDocument = new window.DOMParser().parseFromString(
			`<body>${value}</body>`,
			'text/html',
		);
		return parsedDocument.body.textContent ?? '';
	}

	if (typeof document !== 'undefined') {
		const textarea = document.createElement('textarea');
		textarea.innerHTML = value;
		return textarea.value;
	}

	return decodeHtmlEntitiesFallback(value);
};

/**
 * Detects whether text appears to contain a script tag, including encoded or
 * obfuscated variants.
 *
 * The check runs against raw input, HTML-decoded input, and escaped-character
 * normalized forms.
 */
export const containsScriptTagAttempt = (value: string) => {
	if (scriptTagPattern.test(value)) {
		return true;
	}

	const decodedValue = decodeHtmlEntities(value);
	if (scriptTagPattern.test(decodedValue)) {
		return true;
	}

	const normalizedValue = decodeEscapedCharacters(value);
	if (scriptTagPattern.test(normalizedValue)) {
		return true;
	}

	const normalizedDecodedValue = decodeEscapedCharacters(decodedValue);
	return scriptTagPattern.test(normalizedDecodedValue);
};

/**
 * Sanitizes announcement HTML to remove unsafe markup while preserving allowed
 * HTML content.
 */
export const sanitizeAnnouncementHtml = (value: string) => {
	return DOMPurify.sanitize(value, {
		USE_PROFILES: { html: true },
	});
};
