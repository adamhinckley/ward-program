import DOMPurify from 'dompurify';

const scriptTagPattern = /<\s*\/?\s*script\b/i;

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

export const containsScriptTagAttempt = (value: string) => {
	if (scriptTagPattern.test(value)) {
		return true;
	}

	const decodedValue = decodeHtmlEntities(value);
	return scriptTagPattern.test(decodedValue);
};

export const sanitizeAnnouncementHtml = (value: string) => {
	return DOMPurify.sanitize(value, {
		USE_PROFILES: { html: true },
	});
};
