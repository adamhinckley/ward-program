import DOMPurify from 'dompurify';

const scriptTagPattern = /<\s*\/?\s*script\b/i;

export const decodeHtmlEntities = (value: string) => {
	return value
		.replace(/&lt;/gi, '<')
		.replace(/&gt;/gi, '>')
		.replace(/&quot;/gi, '"')
		.replace(/&#39;|&apos;/gi, "'")
		.replace(/&amp;/gi, '&');
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
