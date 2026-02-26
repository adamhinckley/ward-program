// @vitest-environment jsdom
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const {
	mockUseAppContext,
	mockUseEditor,
	mockImageExtend,
	mockTextAlignConfigure,
	mockLinkConfigure,
} = vi.hoisted(() => ({
	mockUseAppContext: vi.fn(),
	mockUseEditor: vi.fn(),
	mockImageExtend: vi.fn((_options?: unknown) => ({ name: 'customImage' })),
	mockTextAlignConfigure: vi.fn((_options?: unknown) => ({ name: 'textAlign' })),
	mockLinkConfigure: vi.fn((_options?: unknown) => ({ name: 'link' })),
}));

vi.mock('../context/AppContext', () => ({
	useAppContext: () => mockUseAppContext(),
}));

vi.mock('@tiptap/react', () => ({
	EditorContent: ({ editor }: { editor: unknown }) => (
		<div data-testid="editor-content" data-has-editor={editor ? 'true' : 'false'} />
	),
	useEditor: (options?: unknown) => mockUseEditor(options),
}));

vi.mock('@tiptap/extension-image', () => ({
	default: { extend: (options?: unknown) => mockImageExtend(options) },
}));

vi.mock('@tiptap/starter-kit', () => ({
	default: { name: 'starterKit' },
}));

vi.mock('@tiptap/extension-highlight', () => ({
	default: { name: 'highlight' },
}));

vi.mock('@tiptap/extension-text-align', () => ({
	default: { configure: (options?: unknown) => mockTextAlignConfigure(options) },
}));

vi.mock('@tiptap/extension-link', () => ({
	default: { configure: (options?: unknown) => mockLinkConfigure(options) },
}));

vi.mock('@tiptap/extension-horizontal-rule', () => ({
	default: { name: 'horizontalRule' },
}));

vi.mock('@tiptap/extension-underline', () => ({
	default: { name: 'underline' },
}));

import Tiptap from '../components/editor/Tiptap';

afterEach(() => {
	cleanup();
});

type MockEditor = ReturnType<typeof createMockEditor>;

const createMockEditor = (activeKeys: string[] = []) => {
	const chain = {
		focus: vi.fn(() => chain),
		toggleHeading: vi.fn(() => chain),
		setParagraph: vi.fn(() => chain),
		toggleBold: vi.fn(() => chain),
		toggleItalic: vi.fn(() => chain),
		toggleHighlight: vi.fn(() => chain),
		setTextAlign: vi.fn(() => chain),
		extendMarkRange: vi.fn(() => chain),
		setLink: vi.fn(() => chain),
		setHorizontalRule: vi.fn(() => chain),
		toggleUnderline: vi.fn(() => chain),
		toggleBulletList: vi.fn(() => chain),
		setImage: vi.fn(() => chain),
		run: vi.fn(() => true),
	};

	const isActive = vi.fn((nameOrObject: string | Record<string, string>, attrs?: unknown) => {
		if (typeof nameOrObject === 'string') {
			if (
				typeof attrs === 'object' &&
				attrs !== null &&
				'level' in (attrs as Record<string, unknown>)
			) {
				return activeKeys.includes(
					`${nameOrObject}:${(attrs as Record<string, unknown>).level}`,
				);
			}
			return activeKeys.includes(nameOrObject);
		}
		if ('textAlign' in nameOrObject) {
			return activeKeys.includes(`align:${nameOrObject.textAlign}`);
		}
		return false;
	});

	return {
		chain: vi.fn(() => chain),
		isActive,
		__chain: chain,
	};
};

describe('Tiptap editor', () => {
	let editorContentRef: { current: string };
	let editor: MockEditor;

	beforeEach(() => {
		vi.clearAllMocks();
		editorContentRef = { current: '<p>Initial announcement</p>' };
		editor = createMockEditor();
		mockUseAppContext.mockReturnValue({ editorContentRef });
		mockUseEditor.mockImplementation(() => editor);
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: 1280,
		});
	});

	it('renders toolbar controls and editor content', () => {
		render(<Tiptap />);

		expect(screen.getByRole('button', { name: 'Heading 1' })).toBeTruthy();
		expect(screen.getByRole('button', { name: 'Paragraph' })).toBeTruthy();
		expect(screen.getByRole('button', { name: 'Bold' })).toBeTruthy();
		expect(screen.getByRole('button', { name: 'Add Image' })).toBeTruthy();
		expect(screen.getByTestId('editor-content')).toBeTruthy();
	});

	it('passes initial content and updates editorContentRef on editor update', () => {
		let capturedOnUpdate:
			| ((payload: { editor: { getHTML: () => string } }) => void)
			| undefined;
		mockUseEditor.mockImplementation((options: any) => {
			capturedOnUpdate = options.onUpdate;
			return editor;
		});

		render(<Tiptap />);

		expect(mockUseEditor.mock.calls.length).toBeGreaterThan(0);
		const latestUseEditorOptions = mockUseEditor.mock.calls.at(-1)?.[0] as {
			immediatelyRender: boolean;
			content: string;
		};
		expect(latestUseEditorOptions.immediatelyRender).toBe(false);
		expect(latestUseEditorOptions.content).toBe('<p>Initial announcement</p>');

		capturedOnUpdate?.({
			editor: {
				getHTML: () => '<p>Updated from editor</p>',
			},
		});
		expect(editorContentRef.current).toBe('<p>Updated from editor</p>');
	});

	it('runs formatting commands from toolbar buttons', async () => {
		render(<Tiptap />);

		await userEvent.click(screen.getByRole('button', { name: 'Heading 1' }));
		expect(editor.__chain.toggleHeading).toHaveBeenCalledWith({ level: 1 });

		await userEvent.click(screen.getByRole('button', { name: 'Paragraph' }));
		expect(editor.__chain.setParagraph).toHaveBeenCalled();

		await userEvent.click(screen.getByRole('button', { name: 'Bold' }));
		expect(editor.__chain.toggleBold).toHaveBeenCalled();

		await userEvent.click(screen.getByRole('button', { name: 'Align Center' }));
		expect(editor.__chain.setTextAlign).toHaveBeenCalledWith('center');

		await userEvent.click(screen.getByRole('button', { name: 'Horizontal Rule' }));
		expect(editor.__chain.setHorizontalRule).toHaveBeenCalled();

		expect(editor.__chain.run).toHaveBeenCalled();
	});

	it('runs remaining toolbar commands for align, underline, and bullet list', async () => {
		render(<Tiptap />);

		await userEvent.click(screen.getByRole('button', { name: 'Align Left' }));
		await userEvent.click(screen.getByRole('button', { name: 'Align Right' }));
		expect(editor.__chain.setTextAlign).toHaveBeenCalledWith('left');
		expect(editor.__chain.setTextAlign).toHaveBeenCalledWith('right');

		await userEvent.click(screen.getByRole('button', { name: 'Underline' }));
		expect(editor.__chain.toggleUnderline).toHaveBeenCalled();

		await userEvent.click(screen.getByRole('button', { name: 'Bullet List' }));
		expect(editor.__chain.toggleBulletList).toHaveBeenCalled();
	});

	it('adds a link using dialog input and does not link when URL is empty', async () => {
		render(<Tiptap />);

		await userEvent.click(screen.getByRole('button', { name: 'Add Link' }));
		const linkDialog = screen.getByRole('dialog', { name: 'Add Link' });
		expect(linkDialog).toBeTruthy();

		await userEvent.type(screen.getByLabelText('Link URL'), 'https://example.com');
		await userEvent.click(within(linkDialog).getByRole('button', { name: /^Add Link$/ }));
		expect(editor.__chain.extendMarkRange).toHaveBeenCalledWith('link');
		expect(editor.__chain.setLink).toHaveBeenCalledWith({ href: 'https://example.com' });

		const linkCallCountAfterValidPrompt = editor.__chain.setLink.mock.calls.length;
		await userEvent.click(screen.getByRole('button', { name: 'Add Link' }));
		const secondLinkDialog = screen.getByRole('dialog', { name: 'Add Link' });
		await userEvent.click(within(secondLinkDialog).getByRole('button', { name: /^Add Link$/ }));
		expect(editor.__chain.setLink.mock.calls.length).toBe(linkCallCountAfterValidPrompt);
	});

	it('does not add a link when dialog is canceled', async () => {
		render(<Tiptap />);

		await userEvent.click(screen.getByRole('button', { name: 'Add Link' }));
		await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
		expect(editor.__chain.setLink).not.toHaveBeenCalled();
		expect(editor.__chain.extendMarkRange).not.toHaveBeenCalled();
	});

	it('trims whitespace-only link input and does not set link', async () => {
		render(<Tiptap />);

		await userEvent.click(screen.getByRole('button', { name: 'Add Link' }));
		const linkDialog = screen.getByRole('dialog', { name: 'Add Link' });
		await userEvent.type(screen.getByLabelText('Link URL'), '   ');
		await userEvent.click(within(linkDialog).getByRole('button', { name: /^Add Link$/ }));
		expect(editor.__chain.setLink).not.toHaveBeenCalled();
	});

	it('adds an image using dialog input and skips image when canceled', async () => {
		render(<Tiptap />);

		await userEvent.click(screen.getByRole('button', { name: 'Add Image' }));
		const imageDialog = screen.getByRole('dialog', { name: 'Add Image' });
		expect(imageDialog).toBeTruthy();
		await userEvent.type(
			screen.getByLabelText('Image URL'),
			'https://images.example.com/photo.jpg',
		);
		await userEvent.click(within(imageDialog).getByRole('button', { name: /^Add Image$/ }));
		expect(editor.__chain.setImage).toHaveBeenCalledWith({
			src: 'https://images.example.com/photo.jpg',
		});

		const imageCallCountAfterValidPrompt = editor.__chain.setImage.mock.calls.length;
		await userEvent.click(screen.getByRole('button', { name: 'Add Image' }));
		await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
		expect(editor.__chain.setImage.mock.calls.length).toBe(imageCallCountAfterValidPrompt);
	});

	it('does not add an image when dialog URL is empty string', async () => {
		render(<Tiptap />);

		await userEvent.click(screen.getByRole('button', { name: 'Add Image' }));
		const imageDialog = screen.getByRole('dialog', { name: 'Add Image' });
		await userEvent.click(within(imageDialog).getByRole('button', { name: /^Add Image$/ }));
		expect(editor.__chain.setImage).not.toHaveBeenCalled();
	});

	it('trims whitespace-only image input and does not set image', async () => {
		render(<Tiptap />);

		await userEvent.click(screen.getByRole('button', { name: 'Add Image' }));
		const imageDialog = screen.getByRole('dialog', { name: 'Add Image' });
		await userEvent.type(screen.getByLabelText('Image URL'), '   ');
		await userEvent.click(within(imageDialog).getByRole('button', { name: /^Add Image$/ }));
		expect(editor.__chain.setImage).not.toHaveBeenCalled();
	});

	it('trims surrounding whitespace before applying link and image URLs', async () => {
		render(<Tiptap />);

		await userEvent.click(screen.getByRole('button', { name: 'Add Link' }));
		const linkDialog = screen.getByRole('dialog', { name: 'Add Link' });
		await userEvent.type(screen.getByLabelText('Link URL'), '  https://example.com  ');
		await userEvent.click(within(linkDialog).getByRole('button', { name: /^Add Link$/ }));
		expect(editor.__chain.setLink).toHaveBeenCalledWith({ href: 'https://example.com' });

		await userEvent.click(screen.getByRole('button', { name: 'Add Image' }));
		const imageDialog = screen.getByRole('dialog', { name: 'Add Image' });
		await userEvent.type(
			screen.getByLabelText('Image URL'),
			'  https://images.example.com/photo.jpg  ',
		);
		await userEvent.click(within(imageDialog).getByRole('button', { name: /^Add Image$/ }));
		expect(editor.__chain.setImage).toHaveBeenCalledWith({
			src: 'https://images.example.com/photo.jpg',
		});
	});

	it('closes dialog when pressing Escape', async () => {
		render(<Tiptap />);

		await userEvent.click(screen.getByRole('button', { name: 'Add Link' }));
		expect(screen.getByRole('dialog', { name: 'Add Link' })).toBeTruthy();

		fireEvent.keyDown(window, { key: 'Escape' });

		expect(screen.queryByRole('dialog', { name: 'Add Link' })).toBeNull();
	});

	it('closes dialog when clicking backdrop', async () => {
		render(<Tiptap />);

		await userEvent.click(screen.getByRole('button', { name: 'Add Link' }));
		const dialog = screen.getByRole('dialog', { name: 'Add Link' });
		const backdrop = dialog.parentElement as HTMLElement;
		fireEvent.mouseDown(backdrop);

		expect(screen.queryByRole('dialog', { name: 'Add Link' })).toBeNull();
	});

	it('shows mobile guidance text under narrow viewport and hides it after resize', () => {
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: 480,
		});

		render(<Tiptap />);

		expect(
			screen.getByText(/For the best experience, turn your phone to landscape mode/i),
		).toBeTruthy();

		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: 1024,
		});
		fireEvent(window, new Event('resize'));

		expect(
			screen.queryByText(/For the best experience, turn your phone to landscape mode/i),
		).toBeNull();
	});

	it('does not show mobile guidance text at exactly 500px width', () => {
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: 500,
		});

		render(<Tiptap />);

		expect(
			screen.queryByText(/For the best experience, turn your phone to landscape mode/i),
		).toBeNull();
	});

	it('cleans up resize listener on unmount', () => {
		const addSpy = vi.spyOn(window, 'addEventListener');
		const removeSpy = vi.spyOn(window, 'removeEventListener');

		const { unmount } = render(<Tiptap />);
		unmount();

		const addResizeCall = addSpy.mock.calls.find((call) => call[0] === 'resize');
		const removeResizeCall = removeSpy.mock.calls.find((call) => call[0] === 'resize');
		expect(addResizeCall).toBeTruthy();
		expect(removeResizeCall).toBeTruthy();
		expect(removeResizeCall?.[1]).toBe(addResizeCall?.[1]);
	});

	it('configures editor extensions with expected options', () => {
		render(<Tiptap />);

		expect(mockTextAlignConfigure).toHaveBeenCalledWith({
			types: ['heading', 'paragraph'],
		});
		expect(mockLinkConfigure).toHaveBeenCalledWith({
			openOnClick: false,
			autolink: true,
			defaultProtocol: 'https',
		});
	});

	it('renders without toolbar when editor is unavailable', () => {
		mockUseEditor.mockImplementation(() => null);

		render(<Tiptap />);

		expect(screen.queryByRole('button', { name: 'Bold' })).toBeNull();
		expect(screen.getByTestId('editor-content')).toBeTruthy();
		expect(screen.getByTestId('editor-content').getAttribute('data-has-editor')).toBe('false');
	});

	it('applies active class for active toolbar states', () => {
		editor = createMockEditor(['bold', 'align:center']);
		mockUseEditor.mockImplementation(() => editor);

		render(<Tiptap />);

		expect(screen.getByRole('button', { name: 'Bold' }).className).toContain('is-active');
		expect(screen.getByRole('button', { name: 'Align Center' }).className).toContain(
			'is-active',
		);
		expect(screen.getByRole('button', { name: 'Italic' }).className).not.toContain('is-active');
	});
});
