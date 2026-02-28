// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MusicEditor from '../components/editor/music';
import Leaders from '../components/editor/leaders';
import Block from '../components/editor/block';
import PreSacramentAgendaV2 from '../components/PreSacramentAgenda';
import StandardSecondHalfV2 from '../components/StandardSecondHalf';
import ClosingHymnAndPrayerV2 from '../components/closingHymnAndPrayer';
import WardContacts from '../components/WardContacts';
import { AppContextProvider, useAppContext } from '../context/AppContext';
import { initialStateForDemo } from '../utils/helpers';
import type { AppState, BlockName } from '../utils/types';

type IntegrationSurfaceProps = {
	showMusic?: boolean;
	showLeaders?: boolean;
	showBlock?: boolean;
	blockName?: BlockName;
};

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

const IntegrationSurface = ({
	showMusic = false,
	showLeaders = false,
	showBlock = false,
	blockName = 'blockTwo',
}: IntegrationSurfaceProps) => {
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

		if (!(content as any)[block]) {
			setContent((previousContent) => ({
				...previousContent,
				[block]: [{ left: '', right: '' }],
			}));
			return;
		}

		setContent((previousContent) => ({
			...previousContent,
			[block]: [...(previousContent as any)[block], { left: '', right: '' }],
		}));
	};

	const handleDeleteBlockIndex = (block: string, index: number) => {
		if (block === 'intermediateMusicPerformers') {
			setContent((previousContent) => ({
				...previousContent,
				intermediateMusicPerformers: previousContent.intermediateMusicPerformers.filter(
					(_, performerIndex) => performerIndex !== index,
				),
			}));
			return;
		}

		setContent((previousContent) => ({
			...previousContent,
			[block]: (previousContent as any)[block].filter(
				(_: unknown, blockIndex: number) => blockIndex !== index,
			),
		}));
	};

	return (
		<div>
			{showMusic ? (
				<div data-testid="music-editor">
					<MusicEditor
						handleChange={handleChange}
						handleAddBlockIndex={handleAddBlockIndex}
						handleDeleteBlockIndex={handleDeleteBlockIndex}
					/>
				</div>
			) : null}
			{showLeaders ? (
				<div data-testid="leaders-editor">
					<Leaders handleChange={handleChange} />
				</div>
			) : null}
			{showBlock ? (
				<div data-testid="block-editor">
					<Block
						handleChange={handleChange}
						handleAddBlockIndex={handleAddBlockIndex}
						handleDeleteBlockIndex={handleDeleteBlockIndex}
						blockName={blockName}
					/>
				</div>
			) : null}
			<div data-testid="ward-facing-sections">
				<PreSacramentAgendaV2 />
				<StandardSecondHalfV2 />
				<ClosingHymnAndPrayerV2 />
				<WardContacts />
			</div>
		</div>
	);
};

const renderIntegrationSurface = (
	stateOverrides: Partial<AppState['bulletinData'][number]['bulletin']>,
	surfaceProps: IntegrationSurfaceProps,
) => {
	const initialState = buildInitialState(stateOverrides);

	return render(
		<AppContextProvider initialState={initialState}>
			<IntegrationSurface {...surfaceProps} />
		</AppContextProvider>,
	);
};

afterEach(() => {
	cleanup();
});

describe('Ward-facing layout integration', () => {
	it('reflects intermediate music selection and all music toggles in ward-facing sections', async () => {
		const user = userEvent.setup();

		renderIntegrationSurface(
			{
				showOpeningHymn: true,
				showSacramentHymn: true,
				showIntermediateMusic: true,
				showClosingHymn: true,
				intermediateMusicType: 'hymn',
				intermediateHymnNumber: '88',
				intermediateHymnTitle: 'Great Is Thy Faithfulness',
				intermediateHymnLink: 'https://example.com/intermediate-hymn',
				intermediateMusicLeftSide: '',
				intermediateMusicRightSide: '',
				intermediateMusicPerformers: [],
			},
			{ showMusic: true },
		);

		const wardSections = within(screen.getByTestId('ward-facing-sections'));
		expect(wardSections.getByText('Opening Hymn')).toBeTruthy();
		expect(wardSections.getByText('Sacrament Hymn')).toBeTruthy();
		expect(wardSections.getByText('Intermediate Hymn')).toBeTruthy();
		expect(wardSections.getByText('Closing Hymn')).toBeTruthy();

		await user.click(screen.getByRole('button', { name: 'Musical Number' }));
		await user.type(screen.getByLabelText('Left side'), 'Musical Number');
		await user.type(screen.getByLabelText('Right side'), 'Ward Choir');
		await user.click(screen.getByRole('button', { name: 'Add Performer' }));
		await user.type(screen.getByLabelText('Performer 1'), 'Primary Children');

		await waitFor(() => {
			expect(wardSections.queryByText('Intermediate Hymn')).toBeNull();
			expect(wardSections.getByText('Musical Number')).toBeTruthy();
			expect(wardSections.getByText('Ward Choir')).toBeTruthy();
			expect(wardSections.getByText('Primary Children')).toBeTruthy();
		});

		await user.click(screen.getByRole('switch', { name: 'Opening Hymn' }));
		await user.click(screen.getByRole('switch', { name: 'Sacrament Hymn' }));
		await user.click(screen.getByRole('switch', { name: 'Intermediate Hymn' }));
		await user.click(screen.getByRole('switch', { name: 'Closing Hymn' }));

		await waitFor(() => {
			expect(wardSections.queryByText('Opening Hymn')).toBeNull();
			expect(wardSections.queryByText('Sacrament Hymn')).toBeNull();
			expect(wardSections.queryByText('Musical Number')).toBeNull();
			expect(wardSections.queryByText('Closing Hymn')).toBeNull();
		});
	});

	it('reflects added and removed block items in block two section', async () => {
		const user = userEvent.setup();

		renderIntegrationSurface(
			{
				blockTwo: [{ left: 'Speaker', right: 'Jane Doe' }],
				blockThree: [],
			},
			{ showBlock: true, blockName: 'blockTwo' },
		);

		const blockEditor = within(screen.getByTestId('block-editor'));
		const wardSections = within(screen.getByTestId('ward-facing-sections'));
		expect(wardSections.getByText('Jane Doe')).toBeTruthy();

		const blockButtonsBeforeAdd = blockEditor.getAllByRole('button');
		await user.click(blockButtonsBeforeAdd[blockButtonsBeforeAdd.length - 1]);

		const leftInputs = blockEditor.getAllByLabelText('Left side') as HTMLInputElement[];
		const rightInputs = blockEditor.getAllByLabelText('Right side') as HTMLInputElement[];
		await user.type(leftInputs[1], 'Sustaining');
		await user.type(rightInputs[1], 'John Smith');

		await waitFor(() => {
			expect(wardSections.getByText('Sustaining')).toBeTruthy();
			expect(wardSections.getByText('John Smith')).toBeTruthy();
		});

		const blockButtonsAfterAdd = blockEditor.getAllByRole('button');
		const deleteButtons = blockButtonsAfterAdd.slice(0, -1);
		await user.click(deleteButtons[0]);

		await waitFor(() => {
			expect(wardSections.queryByText('Jane Doe')).toBeNull();
			expect(wardSections.getByText('John Smith')).toBeTruthy();
		});
	});

	it('reflects added and removed ward contacts from block edits', async () => {
		const user = userEvent.setup();

		renderIntegrationSurface(
			{
				wardContacts: [{ left: 'Bishop One', right: '111-111-1111' }],
			},
			{ showBlock: true, blockName: 'wardContacts' },
		);

		const blockEditor = within(screen.getByTestId('block-editor'));
		const wardSections = within(screen.getByTestId('ward-facing-sections'));
		expect(wardSections.getByText('Bishop One')).toBeTruthy();

		const blockButtonsBeforeAdd = blockEditor.getAllByRole('button');
		await user.click(blockButtonsBeforeAdd[blockButtonsBeforeAdd.length - 1]);

		const nameInputs = blockEditor.getAllByLabelText('Name') as HTMLInputElement[];
		const phoneInputs = blockEditor.getAllByLabelText('Phone') as HTMLInputElement[];
		await user.type(nameInputs[1], 'Relief Society President');
		await user.type(phoneInputs[1], '222-222-2222');

		await waitFor(() => {
			expect(wardSections.getByText('Relief Society President')).toBeTruthy();
		});

		const blockButtonsAfterAdd = blockEditor.getAllByRole('button');
		const deleteButtons = blockButtonsAfterAdd.slice(0, -1);
		await user.click(deleteButtons[0]);

		await waitFor(() => {
			expect(wardSections.queryByText('Bishop One')).toBeNull();
			expect(wardSections.getByText('Relief Society President')).toBeTruthy();
		});
	});

	it('reflects leader changes and hides rows when a leader input is blank', async () => {
		const user = userEvent.setup();

		renderIntegrationSurface(
			{
				presiding: '',
				conducting: '',
				musicLeader: '',
				accompanist: '',
			},
			{ showLeaders: true },
		);

		const wardSections = within(screen.getByTestId('ward-facing-sections'));

		await user.type(screen.getByLabelText('Presiding'), 'Bishop Adams');
		await user.type(screen.getByLabelText('Conducting'), 'Brother Hill');
		await user.type(screen.getByLabelText('Music Leader'), 'Sister Carter');
		await user.type(screen.getByLabelText('Accompanist'), 'Brother Young');

		await waitFor(() => {
			expect(wardSections.getByText('Bishop Adams')).toBeTruthy();
			expect(wardSections.getByText('Brother Hill')).toBeTruthy();
			expect(wardSections.getByText('Sister Carter')).toBeTruthy();
			expect(wardSections.getByText('Brother Young')).toBeTruthy();
		});

		await user.clear(screen.getByLabelText('Conducting'));
		await user.clear(screen.getByLabelText('Accompanist'));

		await waitFor(() => {
			expect(wardSections.queryByText('Brother Hill')).toBeNull();
			expect(wardSections.queryByText('Brother Young')).toBeNull();
			expect(wardSections.getByText('Bishop Adams')).toBeTruthy();
			expect(wardSections.getByText('Sister Carter')).toBeTruthy();
		});
	});
});
