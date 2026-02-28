import { Bulletin } from '@/utils/types';

const firstNonEmpty = (...values: unknown[]): string => {
	for (const value of values) {
		if (typeof value === 'string' && value.trim().length > 0) {
			return value;
		}
	}

	return '';
};

type IntermediateMusicRecord = Record<string, unknown>;

const normalizeIntermediateMusicType = (bulletin: Bulletin): string => {
	const legacyType = (bulletin as Bulletin & { interMediateMusicType?: unknown })
		.interMediateMusicType;
	const rawType =
		typeof bulletin.intermediateMusicType === 'string' &&
		bulletin.intermediateMusicType.length > 0
			? bulletin.intermediateMusicType
			: typeof legacyType === 'string'
				? legacyType
				: '';

	if (rawType === 'congregation') {
		return 'hymn';
	}

	if (rawType === 'performance') {
		return 'musicalNumber';
	}

	return rawType;
};

export const normalizeBulletin = (bulletin: Bulletin): Bulletin => {
	const intermediateMusic =
		bulletin.intermediateMusic && typeof bulletin.intermediateMusic === 'object'
			? (bulletin.intermediateMusic as IntermediateMusicRecord)
			: {};

	const normalizedLeft = firstNonEmpty(
		bulletin.intermediateMusicLeftSide,
		intermediateMusic.intermediateMusicLeftSide,
		intermediateMusic.title,
	);

	const normalizedRight = firstNonEmpty(
		bulletin.intermediateMusicRightSide,
		intermediateMusic.intermediateMusicRightSide,
		intermediateMusic['hymnNumber (right side)'],
		intermediateMusic.songTitle,
	);

	const normalizedIntermediateMusic: IntermediateMusicRecord = {
		...intermediateMusic,
	};

	delete normalizedIntermediateMusic.intermediateMusicLeftSide;
	delete normalizedIntermediateMusic.intermediateMusicRightSide;
	delete normalizedIntermediateMusic['hymnNumber (right side)'];
	delete normalizedIntermediateMusic.title;
	delete normalizedIntermediateMusic.songTitle;

	return {
		...bulletin,
		intermediateMusicType: normalizeIntermediateMusicType(bulletin),
		intermediateMusicLeftSide: normalizedLeft,
		intermediateMusicRightSide: normalizedRight,
		intermediateMusic: normalizedIntermediateMusic,
	};
};
