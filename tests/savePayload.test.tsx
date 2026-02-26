// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SaveButton from '../components/editor/SaveButton';

type BulletinLike = Record<string, any>;

type SupabaseChain = {
	update: ReturnType<typeof vi.fn>;
	eq: ReturnType<typeof vi.fn>;
	select: ReturnType<typeof vi.fn>;
};

const mockUseAppContext = vi.fn();
const mockContainsScriptTagAttempt = vi.fn();
const mockSanitizeAnnouncementHtml = vi.fn();
const mockCreateClient = vi.fn();

vi.mock('../context/AppContext', () => ({
	useAppContext: () => mockUseAppContext(),
}));

vi.mock('../utils/sanitization', () => ({
	containsScriptTagAttempt: (...args: unknown[]) => mockContainsScriptTagAttempt(...args),
	sanitizeAnnouncementHtml: (...args: unknown[]) => mockSanitizeAnnouncementHtml(...args),
}));

vi.mock('../utils/supabase/client', () => ({
	createClient: () => mockCreateClient(),
}));

const createSupabaseChain = (): SupabaseChain => {
	const chain = {
		update: vi.fn(),
		eq: vi.fn(),
		select: vi.fn(),
	};
	chain.update.mockReturnValue(chain);
	chain.eq.mockReturnValue(chain);
	chain.select.mockResolvedValue({ data: [{ id: 'user-1' }], error: null });
	return chain;
};

const contentWithAllHymnKeys = (): BulletinLike => ({
	announcements: '<p>safe</p>',
	openingHymnNumber: '2',
	openingHymnTitle: 'The Spirit of God',
	openingHymnLink:
		'https://www.churchofjesuschrist.org/study/manual/hymns/the-spirit-of-god?lang=eng',
	sacramentHymnNumber: '17',
	sacramentHymnTitle: 'Awake, Ye Saints of God, Awake!',
	sacramentHymnLink:
		'https://www.churchofjesuschrist.org/study/manual/hymns/awake-ye-saints-of-god-awake?lang=eng',
	intermediateHymnNumber: '29',
	intermediateHymnTitle: 'A Poor Wayfaring Man of Grief',
	intermediateHymnLink:
		'https://www.churchofjesuschrist.org/study/manual/hymns/a-poor-wayfaring-man-of-grief?lang=eng',
	closingHymnNumber: '33',
	closingHymnTitle: 'Our Mountain Home So Dear',
	closingHymnLink:
		'https://www.churchofjesuschrist.org/study/manual/hymns/our-mountain-home-so-dear?lang=eng',
});

describe('SaveButton hymn payload', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockContainsScriptTagAttempt.mockReturnValue(false);
		mockSanitizeAnnouncementHtml.mockImplementation((html: string) => html);
	});

	it('includes Number, Title, and Link for each hymn in save payload', async () => {
		const supabaseChain = createSupabaseChain();
		mockCreateClient.mockReturnValue({
			from: vi.fn().mockReturnValue(supabaseChain),
		});

		mockUseAppContext.mockReturnValue({
			content: contentWithAllHymnKeys(),
			editorContentRef: { current: '<p>safe</p>' },
			userData: { id: 'user-1' },
		});

		render(<SaveButton />);
		await userEvent.click(screen.getByRole('button', { name: 'Save' }));

		expect(supabaseChain.update).toHaveBeenCalledTimes(1);
		const updatePayload = supabaseChain.update.mock.calls[0][0] as {
			bulletin: BulletinLike;
		};

		expect(updatePayload.bulletin.openingHymnNumber).toBe('2');
		expect(updatePayload.bulletin.openingHymnTitle).toBe('The Spirit of God');
		expect(updatePayload.bulletin.openingHymnLink).toContain('/the-spirit-of-god?lang=eng');

		expect(updatePayload.bulletin.sacramentHymnNumber).toBe('17');
		expect(updatePayload.bulletin.sacramentHymnTitle).toBe('Awake, Ye Saints of God, Awake!');
		expect(updatePayload.bulletin.sacramentHymnLink).toContain(
			'/awake-ye-saints-of-god-awake?lang=eng',
		);

		expect(updatePayload.bulletin.intermediateHymnNumber).toBe('29');
		expect(updatePayload.bulletin.intermediateHymnTitle).toBe('A Poor Wayfaring Man of Grief');
		expect(updatePayload.bulletin.intermediateHymnLink).toContain(
			'/a-poor-wayfaring-man-of-grief?lang=eng',
		);

		expect(updatePayload.bulletin.closingHymnNumber).toBe('33');
		expect(updatePayload.bulletin.closingHymnTitle).toBe('Our Mountain Home So Dear');
		expect(updatePayload.bulletin.closingHymnLink).toContain(
			'/our-mountain-home-so-dear?lang=eng',
		);
	});
});
