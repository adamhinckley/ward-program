import { describe, expect, it } from 'vitest';

import { normalizeBulletin } from '../utils/normalizeBulletin';
import { initialStateForDemo } from '../utils/helpers';
import type { Bulletin } from '../utils/types';

type BulletinWithLegacyType = Bulletin & {
	interMediateMusicType?: string;
};

const baseBulletin = (): Bulletin => structuredClone(initialStateForDemo.bulletinData[0].bulletin);

describe('normalizeBulletin intermediate music compatibility', () => {
	it('maps legacy interMediateMusicType values to canonical intermediateMusicType values', () => {
		const performanceBulletin = {
			...baseBulletin(),
			intermediateMusicType: '',
			interMediateMusicType: 'performance',
		} as BulletinWithLegacyType;

		const congregationBulletin = {
			...baseBulletin(),
			intermediateMusicType: '',
			interMediateMusicType: 'congregation',
		} as BulletinWithLegacyType;

		expect(normalizeBulletin(performanceBulletin).intermediateMusicType).toBe('musicalNumber');
		expect(normalizeBulletin(congregationBulletin).intermediateMusicType).toBe('hymn');
	});

	it('keeps canonical intermediateMusicType when it is already set', () => {
		const bulletin = {
			...baseBulletin(),
			intermediateMusicType: 'hymn',
			interMediateMusicType: 'performance',
		} as BulletinWithLegacyType;

		expect(normalizeBulletin(bulletin).intermediateMusicType).toBe('hymn');
	});
});
