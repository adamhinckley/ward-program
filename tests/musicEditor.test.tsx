// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MusicEditor from '../components/editor/music';
import { newHymnsArray } from '../utils/hymns';

type BulletinLike = Record<string, any>;
const toDisplay = (hymn: { number: number; title: string }) => `${hymn.number} - ${hymn.title}`;

const mockUseAppContext = vi.fn();

vi.mock('../context/AppContext', () => ({
	useAppContext: () => mockUseAppContext(),
}));

const baseContent = (): BulletinLike => ({
	showOpeningHymn: true,
	showSacramentHymn: true,
	showIntermediateMusic: true,
	showClosingHymn: true,
	intermediateMusicType: 'hymn',
	intermediateMusicPerformers: [],
	openingHymnNumber: '',
	openingHymnTitle: '',
	openingHymnLink: '',
	sacramentHymnNumber: '',
	sacramentHymnTitle: '',
	sacramentHymnLink: '',
	intermediateHymnNumber: '',
	intermediateHymnTitle: '',
	intermediateHymnLink: '',
	closingHymnNumber: '',
	closingHymnTitle: '',
	closingHymnLink: '',
	intermediateMusicLeftSide: '',
	intermediateMusicRightSide: '',
});

describe('MusicEditor hymn selection', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('opens a deep options list on first focus, even with an existing selection', async () => {
		const setContent = vi.fn();
		mockUseAppContext.mockReturnValue({
			content: {
				...baseContent(),
				openingHymnNumber: '19',
				openingHymnTitle: 'We Thank Thee, O God, for a Prophet',
				openingHymnLink:
					'https://www.churchofjesuschrist.org/study/manual/hymns/we-thank-thee-o-god-for-a-prophet?lang=eng',
			},
			setContent,
		});

		const { container } = render(
			<MusicEditor
				handleChange={vi.fn()}
				handleDeleteBlockIndex={vi.fn()}
				handleAddBlockIndex={vi.fn()}
			/>,
		);

		const openingInput = container.querySelector('#openingHymn') as HTMLInputElement;
		await userEvent.click(openingInput);

		expect(screen.getByRole('listbox', { name: 'Opening hymn options' })).toBeTruthy();
		expect(screen.getByRole('button', { name: toDisplay(newHymnsArray[0]) })).toBeTruthy();
		expect(
			screen.getByRole('button', {
				name: toDisplay(newHymnsArray[newHymnsArray.length - 1]),
			}),
		).toBeTruthy();
	});

	it('stores hymn number, title, and link when selecting a hymn option', async () => {
		const setContent = vi.fn();
		const currentContent = baseContent();
		mockUseAppContext.mockReturnValue({
			content: currentContent,
			setContent,
		});

		const { container } = render(
			<MusicEditor
				handleChange={vi.fn()}
				handleDeleteBlockIndex={vi.fn()}
				handleAddBlockIndex={vi.fn()}
			/>,
		);

		const openingInput = container.querySelector('#openingHymn') as HTMLInputElement;
		await userEvent.click(openingInput);

		const chosenHymn = newHymnsArray[1];
		const hymnOption = await screen.findByRole('button', {
			name: toDisplay(chosenHymn),
		});
		fireEvent.mouseDown(hymnOption);

		expect(setContent).toHaveBeenCalled();
		const updateCall = setContent.mock.calls.at(-1)?.[0] as
			| BulletinLike
			| ((content: BulletinLike) => BulletinLike);
		const payload = typeof updateCall === 'function' ? updateCall(currentContent) : updateCall;
		expect(payload.openingHymnNumber).toBe(chosenHymn.number.toString());
		expect(payload.openingHymnTitle).toBe(chosenHymn.title);
		expect(payload.openingHymnLink).toBe(chosenHymn.link);
	});

	it('supports arrow keys + enter to select highlighted hymn option', async () => {
		const setContent = vi.fn();
		const currentContent = baseContent();
		mockUseAppContext.mockReturnValue({
			content: currentContent,
			setContent,
		});

		const { container } = render(
			<MusicEditor
				handleChange={vi.fn()}
				handleDeleteBlockIndex={vi.fn()}
				handleAddBlockIndex={vi.fn()}
			/>,
		);

		const openingInput = container.querySelector('#openingHymn') as HTMLInputElement;
		await userEvent.click(openingInput);
		await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');

		expect(setContent).toHaveBeenCalled();
		const expectedHymn = newHymnsArray[2];
		const updateCall = setContent.mock.calls.at(-1)?.[0] as
			| BulletinLike
			| ((content: BulletinLike) => BulletinLike);
		const payload = typeof updateCall === 'function' ? updateCall(currentContent) : updateCall;

		expect(payload.openingHymnNumber).toBe(expectedHymn.number.toString());
		expect(payload.openingHymnTitle).toBe(expectedHymn.title);
		expect(payload.openingHymnLink).toBe(expectedHymn.link);
	});

	it('clears hymn input and payload keys with spacebar when dropdown is open', async () => {
		const setContent = vi.fn();
		const currentContent = {
			...baseContent(),
			openingHymnNumber: '19',
			openingHymnTitle: 'We Thank Thee, O God, for a Prophet',
			openingHymnLink:
				'https://www.churchofjesuschrist.org/study/manual/hymns/we-thank-thee-o-god-for-a-prophet?lang=eng',
		};
		mockUseAppContext.mockReturnValue({
			content: currentContent,
			setContent,
		});

		const { container } = render(
			<MusicEditor
				handleChange={vi.fn()}
				handleDeleteBlockIndex={vi.fn()}
				handleAddBlockIndex={vi.fn()}
			/>,
		);

		const openingInput = container.querySelector('#openingHymn') as HTMLInputElement;
		await userEvent.click(openingInput);
		await userEvent.keyboard(' ');

		expect(openingInput.value).toBe('');
		expect(setContent).toHaveBeenCalled();
		const updateCall = setContent.mock.calls.at(-1)?.[0] as
			| BulletinLike
			| ((content: BulletinLike) => BulletinLike);
		const payload = typeof updateCall === 'function' ? updateCall(currentContent) : updateCall;

		expect(payload.openingHymnNumber).toBe('');
		expect(payload.openingHymnTitle).toBe('');
		expect(payload.openingHymnLink).toBe('');
	});

	it('updates all hymn keys independently when selecting different hymns', async () => {
		let mutableContent = baseContent();
		const setContent = vi.fn(
			(nextContentOrUpdater: BulletinLike | ((content: BulletinLike) => BulletinLike)) => {
				mutableContent =
					typeof nextContentOrUpdater === 'function'
						? nextContentOrUpdater(mutableContent)
						: nextContentOrUpdater;
				mockUseAppContext.mockReturnValue({
					content: mutableContent,
					setContent,
				});
			},
		);

		mockUseAppContext.mockReturnValue({
			content: mutableContent,
			setContent,
		});

		const { rerender, container } = render(
			<MusicEditor
				handleChange={vi.fn()}
				handleDeleteBlockIndex={vi.fn()}
				handleAddBlockIndex={vi.fn()}
			/>,
		);

		const selectById = async (inputId: string) => {
			const input = container.querySelector(`#${inputId}`) as HTMLInputElement;
			await userEvent.click(input);
			const firstOption = container.querySelector('.hymn-option') as HTMLButtonElement;
			const selectedText = firstOption.textContent ?? '';
			const selectedHymn = newHymnsArray.find((hymn) => toDisplay(hymn) === selectedText);
			if (!selectedHymn) {
				throw new Error(`Unable to match hymn option: ${selectedText}`);
			}
			fireEvent.mouseDown(firstOption);
			rerender(
				<MusicEditor
					handleChange={vi.fn()}
					handleDeleteBlockIndex={vi.fn()}
					handleAddBlockIndex={vi.fn()}
				/>,
			);
			return selectedHymn;
		};

		const chosenOpeningHymn = await selectById('openingHymn');
		const chosenSacramentHymn = await selectById('sacramentHymn');
		const chosenIntermediateHymn = await selectById('intermediateHymn');
		const chosenClosingHymn = await selectById('closingHymn');

		await waitFor(() => {
			expect(mutableContent.openingHymnNumber).toBe(chosenOpeningHymn.number.toString());
			expect(mutableContent.openingHymnTitle).toBe(chosenOpeningHymn.title);
			expect(mutableContent.openingHymnLink).toBe(chosenOpeningHymn.link);

			expect(mutableContent.sacramentHymnNumber).toBe(chosenSacramentHymn.number.toString());
			expect(mutableContent.sacramentHymnTitle).toBe(chosenSacramentHymn.title);
			expect(mutableContent.sacramentHymnLink).toBe(chosenSacramentHymn.link);

			expect(mutableContent.intermediateHymnNumber).toBe(
				chosenIntermediateHymn.number.toString(),
			);
			expect(mutableContent.intermediateHymnTitle).toBe(chosenIntermediateHymn.title);
			expect(mutableContent.intermediateHymnLink).toBe(chosenIntermediateHymn.link);

			expect(mutableContent.closingHymnNumber).toBe(chosenClosingHymn.number.toString());
			expect(mutableContent.closingHymnTitle).toBe(chosenClosingHymn.title);
			expect(mutableContent.closingHymnLink).toBe(chosenClosingHymn.link);
		});
	});
});
