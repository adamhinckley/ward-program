import { useEffect, useId, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type UrlDialogProps = {
	open: boolean;
	title: string;
	description: string;
	label: string;
	placeholder?: string;
	confirmText?: string;
	value: string;
	onValueChange: (value: string) => void;
	onCancel: () => void;
	onConfirm: () => void;
};

export const UrlDialog = ({
	open,
	title,
	description,
	label,
	placeholder,
	confirmText = 'Save',
	value,
	onValueChange,
	onCancel,
	onConfirm,
}: UrlDialogProps) => {
	const titleId = useId();
	const descriptionId = useId();
	const inputId = useId();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!open) {
			return;
		}

		const timer = window.setTimeout(() => {
			inputRef.current?.focus();
		}, 0);

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onCancel();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.clearTimeout(timer);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [open, onCancel]);

	if (!open) {
		return null;
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
			onMouseDown={onCancel}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
				className="w-full max-w-md rounded-xl border border-[var(--editor-border)] bg-[var(--editor-control-bg)] p-6 text-[var(--editor-fg)] shadow-lg"
				onMouseDown={(event) => event.stopPropagation()}
			>
				<div className="text-center">
					<h2 id={titleId} className="text-lg font-semibold tracking-tight">
						{title}
					</h2>
					<p
						id={descriptionId}
						className="mt-2 text-sm text-[var(--editor-tab-inactive)]"
					>
						{description}
					</p>
				</div>
				<form
					className="mt-5 space-y-4"
					onSubmit={(event) => {
						event.preventDefault();
						onConfirm();
					}}
				>
					<div className="space-y-2">
						<Label htmlFor={inputId}>{label}</Label>
						<Input
							id={inputId}
							ref={inputRef}
							type="url"
							value={value}
							placeholder={placeholder}
							className="h-11"
							onChange={(event) => onValueChange(event.target.value)}
						/>
					</div>
					<div className="flex items-center justify-center gap-3 pt-1">
						<Button
							type="button"
							variant="outline"
							className="min-w-28"
							onClick={onCancel}
						>
							Cancel
						</Button>
						<Button type="submit" className="min-w-28">
							{confirmText}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
