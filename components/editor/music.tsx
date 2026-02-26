/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAppContext } from '@/context/AppContext';
import { Plus, Trash2 } from 'lucide-react';
import { newHymnsArray } from '@/utils/hymns';

import type { EditorChildren } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const styles = css`
	.switch-parent {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.switch-container {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 12px 0;
	}
`;

const toHymnDisplay = (hymn: { number: number; title: string }) => `${hymn.number} - ${hymn.title}`;

const MusicEditor = ({
	handleChange,
	handleDeleteBlockIndex,
	handleAddBlockIndex,
}: EditorChildren) => {
	const { content, setContent } = useAppContext();
	const { intermediateMusicType } = content;

	type HymnValue = { number: number; title: string; link: string };
	const handleHymnChange = (selectedOption: HymnValue | null, key: string) => {
		if (selectedOption) {
			const hymnNumber = { [`${key}Number`]: selectedOption.number.toString() };
			const hymnTitle = { [`${key}Title`]: selectedOption.title };
			const hymnLink = { [`${key}Link`]: selectedOption.link };
			setContent({ ...content, ...hymnNumber, ...hymnTitle, ...hymnLink });
		} else {
			const hymnNumber = { [`${key}Number`]: '' };
			const hymnTitle = { [`${key}Title`]: '' };
			const hymnLink = { [`${key}Link`]: '' };
			setContent({ ...content, ...hymnNumber, ...hymnTitle, ...hymnLink });
		}
	};

	const handleToggle = () => {
		intermediateMusicType === 'hymn'
			? setContent({ ...content, intermediateMusicType: 'musicalNumber' })
			: setContent({ ...content, intermediateMusicType: 'hymn' });
	};

	const isHymn = intermediateMusicType === 'hymn';

	const handleCheckboxChange = (name: string, checked: boolean) => {
		setContent({ ...content, [name]: checked });
	};

	const handleHymnInputChange = (value: string, key: string, clearWhenNoMatch = false) => {
		const selected = newHymnsArray.find((option) => toHymnDisplay(option) === value);
		if (selected) {
			handleHymnChange(selected, key);
			return;
		}

		const maybeNumber = Number(value.trim());
		if (!Number.isNaN(maybeNumber)) {
			const byNumber = newHymnsArray.find((option) => option.number === maybeNumber);
			handleHymnChange(byNumber ?? null, key);
			return;
		}

		if (clearWhenNoMatch) {
			handleHymnChange(null, key);
		}
	};

	const showOpeningHymn = content.showOpeningHymn === undefined || content.showOpeningHymn;
	const showSacramentHymn = content.showSacramentHymn === undefined || content.showSacramentHymn;
	const showIntermediateMusic =
		content.showIntermediateMusic === undefined || content.showIntermediateMusic;
	const showClosingHymn = content.showClosingHymn === undefined || content.showClosingHymn;

	return (
		<div className="mt-4" css={styles}>
			<datalist id="hymn-options">
				{newHymnsArray.map((hymn, index) => (
					<option key={`hymn-${hymn.number}-${index}`} value={toHymnDisplay(hymn)} />
				))}
			</datalist>
			<div className="switch-parent">
				<div className="switch-container">
					<Label htmlFor="showOpeningHymn">Opening Hymn</Label>
					<Switch
						id="showOpeningHymn"
						checked={showOpeningHymn}
						onCheckedChange={(checked) =>
							handleCheckboxChange('showOpeningHymn', checked)
						}
					/>
				</div>
				<div className="switch-container">
					<Label htmlFor="showSacramentHymn">Sacrament Hymn</Label>
					<Switch
						id="showSacramentHymn"
						checked={showSacramentHymn}
						onCheckedChange={(checked) =>
							handleCheckboxChange('showSacramentHymn', checked)
						}
					/>
				</div>
				<div className="switch-container">
					<Label htmlFor="showIntermediateMusic">Intermediate Hymn</Label>
					<Switch
						id="showIntermediateMusic"
						checked={showIntermediateMusic}
						onCheckedChange={(checked) =>
							handleCheckboxChange('showIntermediateMusic', checked)
						}
					/>
				</div>
				<div className="switch-container">
					<Label htmlFor="showClosingHymn">Closing Hymn</Label>
					<Switch
						id="showClosingHymn"
						checked={showClosingHymn}
						onCheckedChange={(checked) =>
							handleCheckboxChange('showClosingHymn', checked)
						}
					/>
				</div>
			</div>

			{content.showOpeningHymn && (
				<div className="grid gap-2">
					<Label htmlFor="openingHymn">Opening Hymn</Label>
					<Input
						id="openingHymn"
						list="hymn-options"
						defaultValue={
							content.openingHymnNumber
								? `${content.openingHymnNumber} - ${content.openingHymnTitle}`
								: ''
						}
						onChange={(event) =>
							handleHymnInputChange(event.target.value, 'openingHymn')
						}
						onBlur={(event) =>
							handleHymnInputChange(event.target.value, 'openingHymn', true)
						}
						placeholder="Type hymn number or select a hymn"
					/>
				</div>
			)}

			{content.showSacramentHymn && (
				<>
					<hr className="my-4 border-[var(--editor-border)]" />
					<div className="grid gap-2">
						<Label htmlFor="sacramentHymn">Sacrament Hymn</Label>
						<Input
							id="sacramentHymn"
							list="hymn-options"
							defaultValue={
								content.sacramentHymnNumber
									? `${content.sacramentHymnNumber} - ${content.sacramentHymnTitle}`
									: ''
							}
							onChange={(event) =>
								handleHymnInputChange(event.target.value, 'sacramentHymn')
							}
							onBlur={(event) =>
								handleHymnInputChange(event.target.value, 'sacramentHymn', true)
							}
							placeholder="Type hymn number or select a hymn"
						/>
					</div>
				</>
			)}
			{content.showIntermediateMusic && (
				<>
					<hr className="my-4 border-[var(--editor-border)]" />
					<div className="flex flex-col">
						<h3 className="text-base font-semibold self-center">Intermediate Music</h3>
						<p className="self-center text-xs">
							To remove from the program, select &quot;Musical Number&quot; and clear
							the inputs.
						</p>
						<div className="flex items-center justify-center">
							<div className="inline-flex my-3 rounded-md border border-[var(--editor-border)] overflow-hidden">
								<Button
									type="button"
									variant={isHymn ? 'default' : 'outline'}
									className="rounded-none"
									onClick={handleToggle}
								>
									Congregational Hymn
								</Button>
								<Button
									type="button"
									variant={!isHymn ? 'default' : 'outline'}
									className="rounded-none"
									onClick={handleToggle}
								>
									Musical Number
								</Button>
							</div>
						</div>
						{intermediateMusicType === 'hymn' ? (
							<div className="grid gap-2">
								<Label htmlFor="intermediateHymn">Intermediate Hymn</Label>
								<Input
									id="intermediateHymn"
									list="hymn-options"
									defaultValue={
										content.intermediateHymnNumber
											? `${content.intermediateHymnNumber} - ${content.intermediateHymnTitle}`
											: ''
									}
									onChange={(event) =>
										handleHymnInputChange(
											event.target.value,
											'intermediateHymn',
										)
									}
									onBlur={(event) =>
										handleHymnInputChange(
											event.target.value,
											'intermediateHymn',
											true,
										)
									}
									placeholder="Type hymn number or select a hymn"
								/>
							</div>
						) : (
							<>
								<div className="flex relative justify-between content-center min-w-full items-start gap-3">
									<div className="grid w-[49%] gap-2">
										<Label htmlFor="intermediateMusicLeftSide">Left side</Label>
										<Input
											id="intermediateMusicLeftSide"
											name="intermediateMusicLeftSide"
											value={content.intermediateMusicLeftSide || ''}
											onChange={(e) => handleChange(e)}
											placeholder="special musical number"
										/>
									</div>
									<div className="grid w-[49%] gap-2">
										<Label htmlFor="intermediateMusicRightSide">
											Right side
										</Label>
										<Input
											id="intermediateMusicRightSide"
											name="intermediateMusicRightSide"
											value={content.intermediateMusicRightSide || ''}
											onChange={(e) => handleChange(e)}
											placeholder="song title"
										/>
									</div>
								</div>
								{Array.isArray(content.intermediateMusicPerformers) &&
									content.intermediateMusicPerformers.map((performer, index) => {
										return (
											<div key={index} className="mt-3">
												<div className="grid gap-2">
													<Label
														htmlFor={`performer-${index}`}
													>{`Performer ${index + 1}`}</Label>
													<div className="relative">
														<Input
															id={`performer-${index}`}
															name={`performer ${index + 1}`}
															value={performer}
															onChange={(e) =>
																handleChange(
																	e,
																	'intermediateMusicPerformers',
																	index,
																)
															}
															className="pr-10"
														/>
														<Button
															type="button"
															variant="ghost"
															size="icon"
															className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-red-500"
															onClick={() =>
																handleDeleteBlockIndex &&
																handleDeleteBlockIndex(
																	'intermediateMusicPerformers',
																	index,
																)
															}
														>
															<Trash2 className="h-5 w-5" />
														</Button>
													</div>
												</div>
											</div>
										);
									})}
								<div className="flex justify-center mt-3">
									<Button
										type="button"
										variant="outline"
										onClick={() =>
											handleAddBlockIndex &&
											handleAddBlockIndex('intermediateMusicPerformers')
										}
									>
										<Plus className="h-4 w-4 mr-1" />
										Add Performer
									</Button>
								</div>
							</>
						)}
					</div>
				</>
			)}

			{content.showClosingHymn && (
				<>
					<hr className="my-4 border-[var(--editor-border)]" />
					<div className="grid gap-2">
						<Label htmlFor="closingHymn">Closing Hymn</Label>
						<Input
							id="closingHymn"
							list="hymn-options"
							defaultValue={
								content.closingHymnNumber
									? `${content.closingHymnNumber} - ${content.closingHymnTitle}`
									: ''
							}
							onChange={(event) =>
								handleHymnInputChange(event.target.value, 'closingHymn')
							}
							onBlur={(event) =>
								handleHymnInputChange(event.target.value, 'closingHymn', true)
							}
							placeholder="Type hymn number or select a hymn"
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default MusicEditor;
