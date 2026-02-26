import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-md border border-[var(--editor-border)] bg-[var(--editor-control-bg)] px-3 py-2 text-sm text-[var(--editor-fg)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--editor-tab-inactive)] hover:border-[color:var(--editor-tab-inactive)] focus-visible:outline-none focus-visible:border-[color:var(--editor-tab-inactive)] focus-visible:ring-1 focus-visible:ring-[color:var(--editor-tab-inactive)] disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input };
