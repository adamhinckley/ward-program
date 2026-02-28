// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MusicEditor from '../components/editor/music';
import WardFacingProgram from '../components/WardFacingProgram';
import { AppContextProvider, useAppContext } from '../context/AppContext';
import { initialStateForDemo } from '../utils/helpers';
import type { AppState } from '../utils/types';

vi.mock('../context/ProgramThemeContext', () => ({
	useProgramTheme: () => ({
		themeMode: 'light',
		setThemeMode: vi.fn(),
		isThemeHydrated: true,
	}),
}));

vi.mock('../components/ProgramNavigationDrawer', () => ({
	default: ({
		isMenuOpen,
		onSectionSelect,
	}: {
		isMenuOpen: boolean;
		onSectionSelect: (section: 'agenda' | 'announcements' | 'contacts') => void;
	}) =>
		isMenuOpen ? (
			<div role="dialog" aria-label="Program navigation">
				<button type="button" onClick={() => onSectionSelect('agenda')}>
					Agenda
				</button>
				<button type="button" onClick={() => onSectionSelect('announcements')}>
					Announcements
				</button>
				<button type="button" onClick={() => onSectionSelect('contacts')}>
					Contacts
				</button>
			</div>
		) : null,
}));

const buildInitialState = (
	bulletinOverrides: Partial<AppState['bulletinData'][number]['bulletin']> = {},
): AppState => {
	const baseBulletin = structuredClone(initialStateForDemo.bulletinData[0].bulletin);

	return {
		userSettings: {
			id: 'user-1',
			currentTab: 0,
		},
		bulletinData: [
			{
				id: 'test-bulletin',
				stake: '',
				ward: '',
				bulletin: {
					...baseBulletin,
					...bulletinOverrides,
				},
			},
		],
	};
};

const WardFacingProgramSurface = () => {
	const { content, setContent } = useAppContext();

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		block?: string,
		index?: number,
	) => {
		const { name, value } = event.target;

		if (block) {
			if (
				Array.isArray((content as any)[block]) &&
				typeof (content as any)[block][0] === 'string'
			) {
				setContent((previousContent) => {
					const previousBlock = Array.isArray((previousContent as any)[block])
						? (previousContent as any)[block]
						: [];
					const newBlock = previousBlock.map((item: string, itemIndex: number) =>
						itemIndex === index ? value : item,
					);

					return { ...previousContent, [block]: newBlock };
				});
			} else {
				setContent((previousContent) => {
					const previousBlock = Array.isArray((previousContent as any)[block])
						? (previousContent as any)[block]
						: [];
					const newBlock = previousBlock.map(
						(blockValue: { left: string; right: string }, blockIndex: number) => {
							if (blockIndex === index) {
								return { ...blockValue, [name]: value };
							}

							return blockValue;
						},
					);

					return { ...previousContent, [block]: newBlock };
				});
			}

			return;
		}

		setContent((previousContent) => ({ ...previousContent, [name]: value }));
	};

	const handleAddBlockIndex = (block: string) => {
		if (block === 'intermediateMusicPerformers') {
			setContent((previousContent) => ({
				...previousContent,
				intermediateMusicPerformers: previousContent.intermediateMusicPerformers.concat(''),
			}));
			return;
		}
	};

	const handleDeleteBlockIndex = (block: string, index: number) => {
		if (block !== 'intermediateMusicPerformers') {
			return;
		}

		setContent((previousContent) => ({
			...previousContent,
			intermediateMusicPerformers: previousContent.intermediateMusicPerformers.filter(
				(_, performerIndex) => performerIndex !== index,
			),
		}));
	};

	return (
		<div>
			<div data-testid="music-editor">
				<MusicEditor
					handleChange={handleChange}
					handleAddBlockIndex={handleAddBlockIndex}
					handleDeleteBlockIndex={handleDeleteBlockIndex}
				/>
			</div>
			<WardFacingProgram />
		</div>
	);
};

const renderWardFacingProgramSurface = (
	stateOverrides: Partial<AppState['bulletinData'][number]['bulletin']>,
) => {
	const initialState = buildInitialState(stateOverrides);

	return render(
		<AppContextProvider initialState={initialState}>
			<WardFacingProgramSurface />
		</AppContextProvider>,
	);
};

afterEach(() => {
	cleanup();
});

describe('WardFacingProgram smoke', () => {
	it('shows editor-driven intermediate music updates and supports top-level section switching', async () => {
		const user = userEvent.setup();

		renderWardFacingProgramSurface({
			showIntermediateMusic: true,
			intermediateMusicType: 'hymn',
			intermediateHymnNumber: '88',
			intermediateHymnTitle: 'Great Is Thy Faithfulness',
			intermediateHymnLink: 'https://example.com/intermediate-hymn',
			intermediateMusicLeftSide: '',
			intermediateMusicRightSide: '',
			intermediateMusicPerformers: [],
			wardContacts: [{ left: 'Bishop One', right: '111-111-1111' }],
		});

		const wardProgram = screen.getByRole('main');

		await waitFor(() => {
			expect(within(wardProgram).getByText('Intermediate Hymn')).toBeTruthy();
			expect(within(wardProgram).getByText('Agenda')).toBeTruthy();
		});

		await user.click(screen.getByRole('button', { name: 'Musical Number' }));
		await user.type(screen.getByLabelText('Left side'), 'Musical Number');
		await user.type(screen.getByLabelText('Right side'), 'Ward Choir');
		await user.click(screen.getByRole('button', { name: 'Add Performer' }));
		await user.type(screen.getByLabelText('Performer 1'), 'Ward Choir Ensemble');

		await waitFor(() => {
			expect(within(wardProgram).queryByText('Intermediate Hymn')).toBeNull();
			expect(within(wardProgram).getByText('Musical Number')).toBeTruthy();
			expect(within(wardProgram).getByText('Ward Choir Ensemble')).toBeTruthy();
		});

		await user.click(within(wardProgram).getByRole('button', { name: 'Open navigation menu' }));
		await user.click(screen.getByRole('button', { name: 'Contacts' }));

		await waitFor(() => {
			expect(within(wardProgram).getByText('Contacts')).toBeTruthy();
			expect(within(wardProgram).getByText('Bishop One')).toBeTruthy();
		});
	});
});
