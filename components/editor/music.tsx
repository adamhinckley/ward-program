import { useAppContext } from '@/context/AppContext';
import { Plus, Trash2 } from 'lucide-react';

import type { EditorChildren } from '@/utils/types';
import HymnAutocompleteInput from '@/components/editor/HymnAutocompleteInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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
			setContent((previousContent) => ({
				...previousContent,
				...hymnNumber,
				...hymnTitle,
				...hymnLink,
			}));
		} else {
			const hymnNumber = { [`${key}Number`]: '' };
			const hymnTitle = { [`${key}Title`]: '' };
			const hymnLink = { [`${key}Link`]: '' };
			setContent((previousContent) => ({
				...previousContent,
				...hymnNumber,
				...hymnTitle,
				...hymnLink,
			}));
		}
	};

	const handleToggle = () => {
		intermediateMusicType === 'hymn'
			? setContent((previousContent) => ({
					...previousContent,
					intermediateMusicType: 'musicalNumber',
				}))
			: setContent((previousContent) => ({
					...previousContent,
					intermediateMusicType: 'hymn',
				}));
	};

	const isHymn = intermediateMusicType === 'hymn';

	const handleCheckboxChange = (name: string, checked: boolean) => {
		setContent((previousContent) => ({ ...previousContent, [name]: checked }));
	};

	const showOpeningHymn = content.showOpeningHymn === undefined || content.showOpeningHymn;
	const showSacramentHymn = content.showSacramentHymn === undefined || content.showSacramentHymn;
	const showIntermediateMusic =
		content.showIntermediateMusic === undefined || content.showIntermediateMusic;
	const showClosingHymn = content.showClosingHymn === undefined || content.showClosingHymn;

	return (
		<div className="mt-4">
			<div className="flex flex-wrap justify-between">
				<div className="my-3 flex items-center gap-2">
					<Label htmlFor="showOpeningHymn">Opening Hymn</Label>
					<Switch
						id="showOpeningHymn"
						checked={showOpeningHymn}
						onCheckedChange={(checked) =>
							handleCheckboxChange('showOpeningHymn', checked)
						}
					/>
				</div>
				<div className="my-3 flex items-center gap-2">
					<Label htmlFor="showSacramentHymn">Sacrament Hymn</Label>
					<Switch
						id="showSacramentHymn"
						checked={showSacramentHymn}
						onCheckedChange={(checked) =>
							handleCheckboxChange('showSacramentHymn', checked)
						}
					/>
				</div>
				<div className="my-3 flex items-center gap-2">
					<Label htmlFor="showIntermediateMusic">Intermediate Hymn</Label>
					<Switch
						id="showIntermediateMusic"
						checked={showIntermediateMusic}
						onCheckedChange={(checked) =>
							handleCheckboxChange('showIntermediateMusic', checked)
						}
					/>
				</div>
				<div className="my-3 flex items-center gap-2">
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
					<HymnAutocompleteInput
						id="openingHymn"
						placeholder="Opening Hymn"
						listboxLabel="Opening hymn options"
						selectedNumber={content.openingHymnNumber}
						selectedTitle={content.openingHymnTitle}
						onSelectHymn={(hymn) => handleHymnChange(hymn, 'openingHymn')}
					/>
				</div>
			)}

			{content.showSacramentHymn && (
				<>
					<hr className="my-4 border-[var(--editor-border)]" />
					<div className="grid gap-2">
						<Label htmlFor="sacramentHymn">Sacrament Hymn</Label>
						<HymnAutocompleteInput
							id="sacramentHymn"
							placeholder="Sacrament Hymn"
							listboxLabel="Sacrament hymn options"
							selectedNumber={content.sacramentHymnNumber}
							selectedTitle={content.sacramentHymnTitle}
							onSelectHymn={(hymn) => handleHymnChange(hymn, 'sacramentHymn')}
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
								<HymnAutocompleteInput
									id="intermediateHymn"
									placeholder="Intermediate Hymn"
									listboxLabel="Intermediate hymn options"
									selectedNumber={content.intermediateHymnNumber}
									selectedTitle={content.intermediateHymnTitle}
									onSelectHymn={(hymn) =>
										handleHymnChange(hymn, 'intermediateHymn')
									}
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
						<HymnAutocompleteInput
							id="closingHymn"
							placeholder="Closing Hymn"
							listboxLabel="Closing hymn options"
							selectedNumber={content.closingHymnNumber}
							selectedTitle={content.closingHymnTitle}
							onSelectHymn={(hymn) => handleHymnChange(hymn, 'closingHymn')}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default MusicEditor;
