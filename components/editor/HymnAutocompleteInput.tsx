import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { newHymnsArray } from '@/utils/hymns';
import { Input } from '@/components/ui/input';

type HymnValue = { number: number; title: string; link: string };

type HymnAutocompleteInputProps = {
	id: string;
	placeholder: string;
	listboxLabel: string;
	selectedNumber?: string;
	selectedTitle?: string;
	onSelectHymn: (hymn: HymnValue | null) => void;
};

const toHymnDisplay = (hymn: { number: number; title: string }) => `${hymn.number} - ${hymn.title}`;

const findHymnFromInput = (value: string) => {
	const exactMatch = newHymnsArray.find((option) => toHymnDisplay(option) === value);
	if (exactMatch) {
		return exactMatch;
	}

	const maybeNumber = Number(value.trim());
	if (!Number.isNaN(maybeNumber)) {
		return newHymnsArray.find((option) => option.number === maybeNumber) ?? null;
	}

	return null;
};

const HymnAutocompleteInput = ({
	id,
	placeholder,
	listboxLabel,
	selectedNumber,
	selectedTitle,
	onSelectHymn,
}: HymnAutocompleteInputProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showAllOptions, setShowAllOptions] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const [inputValue, setInputValue] = useState('');
	const [dropdownPosition, setDropdownPosition] = useState<{
		top: number;
		left: number;
		width: number;
		maxHeight: number;
		openDirection: 'up' | 'down';
	} | null>(null);
	const blurTimeoutRef = useRef<number | null>(null);
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const dropdownBaseStyle = {
		position: 'fixed' as const,
		zIndex: 1000,
		overflowY: 'auto' as const,
		border: '1px solid var(--editor-border)',
		borderRadius: 8,
		background: 'var(--editor-control-bg)',
		boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
	};
	const optionBaseStyle = {
		display: 'block',
		width: '100%',
		padding: '8px 10px',
		textAlign: 'left' as const,
		fontSize: '0.9rem',
		border: 0,
		background: 'transparent',
		color: 'var(--editor-fg)',
		cursor: 'pointer',
	};
	const clearBlurTimeout = useCallback(() => {
		if (blurTimeoutRef.current !== null) {
			window.clearTimeout(blurTimeoutRef.current);
			blurTimeoutRef.current = null;
		}
	}, []);

	useEffect(() => {
		return () => {
			clearBlurTimeout();
		};
	}, [clearBlurTimeout]);

	useEffect(() => {
		if (!isOpen) {
			setInputValue(selectedNumber ? `${selectedNumber} - ${selectedTitle ?? ''}` : '');
		}
	}, [isOpen, selectedNumber, selectedTitle]);

	useEffect(() => {
		if (!isOpen) {
			setDropdownPosition(null);
			return;
		}

		const updateDropdownPosition = () => {
			const inputElement = inputRef.current;
			if (!inputElement) {
				return;
			}

			const rect = inputElement.getBoundingClientRect();
			const viewportPadding = 8;
			const gap = 4;
			const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;
			const spaceAbove = rect.top - viewportPadding;
			const shouldOpenUp = spaceBelow < 220 && spaceAbove > spaceBelow;
			const availableSpace = shouldOpenUp ? spaceAbove : spaceBelow;
			const maxHeight = Math.max(140, Math.min(320, availableSpace - gap));
			const top = shouldOpenUp
				? Math.max(viewportPadding, rect.top - gap - maxHeight)
				: rect.bottom + gap;

			setDropdownPosition({
				top,
				left: rect.left,
				width: rect.width,
				maxHeight,
				openDirection: shouldOpenUp ? 'up' : 'down',
			});
		};

		updateDropdownPosition();
		window.addEventListener('resize', updateDropdownPosition);
		window.addEventListener('scroll', updateDropdownPosition, true);

		return () => {
			window.removeEventListener('resize', updateDropdownPosition);
			window.removeEventListener('scroll', updateDropdownPosition, true);
		};
	}, [isOpen]);

	const visibleHymns = useMemo(() => {
		if (showAllOptions) {
			return newHymnsArray;
		}

		const query = inputValue.trim().toLowerCase();
		if (!query) {
			return newHymnsArray;
		}

		return newHymnsArray.filter((hymn) => {
			const display = toHymnDisplay(hymn).toLowerCase();
			return display.includes(query) || hymn.number.toString().startsWith(query);
		});
	}, [inputValue, showAllOptions]);

	const selectHymn = (hymn: HymnValue) => {
		setInputValue(toHymnDisplay(hymn));
		onSelectHymn(hymn);
		setIsOpen(false);
		setShowAllOptions(false);
		setHighlightedIndex(0);
	};

	const clearSelection = () => {
		setInputValue('');
		onSelectHymn(null);
		setShowAllOptions(true);
		setHighlightedIndex(0);
	};

	const openDropdown = () => {
		clearBlurTimeout();
		setIsOpen(true);
		setShowAllOptions(true);
		setHighlightedIndex(0);
	};

	const handleChange = (value: string) => {
		setInputValue(value);
		setIsOpen(true);
		setShowAllOptions(false);
		setHighlightedIndex(0);

		const selected = findHymnFromInput(value);
		if (selected) {
			onSelectHymn(selected);
		}
	};

	const handleBlur = (value: string, relatedTarget: EventTarget | null) => {
		if (relatedTarget instanceof Node && wrapperRef.current?.contains(relatedTarget)) {
			return;
		}

		clearBlurTimeout();
		blurTimeoutRef.current = window.setTimeout(() => {
			setIsOpen(false);
			setShowAllOptions(false);
			setHighlightedIndex(0);

			const selected = findHymnFromInput(value);
			if (selected) {
				selectHymn(selected);
				return;
			}

			clearSelection();
		}, 120);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (!visibleHymns.length) {
				return;
			}
			if (!isOpen) {
				openDropdown();
				return;
			}
			setHighlightedIndex((currentIndex) => (currentIndex + 1) % visibleHymns.length);
			return;
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (!visibleHymns.length) {
				return;
			}
			if (!isOpen) {
				openDropdown();
				return;
			}
			setHighlightedIndex(
				(currentIndex) => (currentIndex - 1 + visibleHymns.length) % visibleHymns.length,
			);
			return;
		}

		if (event.key === 'Enter' && isOpen) {
			event.preventDefault();
			if (!visibleHymns.length) {
				return;
			}
			const safeIndex = Math.max(0, Math.min(highlightedIndex, visibleHymns.length - 1));
			selectHymn(visibleHymns[safeIndex]);
			return;
		}

		if ((event.key === ' ' || event.key === 'Spacebar') && isOpen) {
			event.preventDefault();
			clearSelection();
			return;
		}

		if (event.key === 'Escape' && isOpen) {
			event.preventDefault();
			setIsOpen(false);
			setShowAllOptions(false);
		}
	};

	return (
		<div className={`relative ${isOpen ? 'z-[60]' : ''}`} ref={wrapperRef}>
			<Input
				ref={inputRef}
				id={id}
				value={inputValue}
				onFocus={openDropdown}
				onClick={openDropdown}
				onPointerDown={openDropdown}
				onChange={(event) => handleChange(event.target.value)}
				onKeyDown={handleKeyDown}
				onBlur={(event) => handleBlur(event.target.value, event.relatedTarget)}
				placeholder={placeholder}
			/>
			{isOpen && dropdownPosition && typeof document !== 'undefined'
				? createPortal(
						<div
							className="max-h-80 overflow-y-auto"
							role="listbox"
							aria-label={listboxLabel}
							data-direction={dropdownPosition.openDirection}
							style={{
								...dropdownBaseStyle,
								top: dropdownPosition.top,
								left: dropdownPosition.left,
								width: dropdownPosition.width,
								maxHeight: dropdownPosition.maxHeight,
							}}
						>
							{visibleHymns.map((hymn, index) => (
								<button
									type="button"
									key={`${id}-${hymn.number}-${index}`}
									className="block w-full border-0 px-[10px] py-2 text-left text-[0.9rem] text-[var(--editor-fg)]"
									style={{
										...optionBaseStyle,
										background:
											highlightedIndex === index
												? 'var(--editor-control-hover)'
												: 'transparent',
									}}
									onMouseDown={(event) => {
										event.preventDefault();
										selectHymn(hymn);
									}}
								>
									{toHymnDisplay(hymn)}
								</button>
							))}
						</div>,
						document.body,
					)
				: null}
		</div>
	);
};

export default HymnAutocompleteInput;
