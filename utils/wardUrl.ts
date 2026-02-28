const WARD_PATH_PREFIX = '/ward/';

export const buildWardPath = (id: string) => {
	const normalizedId = id.trim();
	return `${WARD_PATH_PREFIX}${encodeURIComponent(normalizedId)}`;
};

export const buildWardAbsoluteUrl = (id: string, origin?: string) => {
	const resolvedOrigin =
		origin?.trim() ||
		(typeof window !== 'undefined'
			? window.location.origin
			: process.env.NEXT_PUBLIC_SITE_URL) ||
		'https://app.wardprogram.com';

	return `${resolvedOrigin}${buildWardPath(id)}`;
};

export const getWardIdFromPathname = (pathname: string) => {
	if (!pathname.startsWith(WARD_PATH_PREFIX)) {
		return null;
	}

	const encodedId = pathname.slice(WARD_PATH_PREFIX.length).split('/')[0];
	if (!encodedId) {
		return null;
	}

	try {
		const decodedId = decodeURIComponent(encodedId).trim();
		return decodedId || null;
	} catch {
		return null;
	}
};

export const getWardIdFromSearch = (search: string) => {
	const id = new URLSearchParams(search).get('id')?.trim();
	return id || null;
};

export const getWardIdFromLocation = (location: Pick<Location, 'pathname' | 'search'>) => {
	return getWardIdFromPathname(location.pathname) ?? getWardIdFromSearch(location.search);
};
