'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Underline from '@tiptap/extension-underline';
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	Bold,
	Highlighter,
	ImagePlus,
	Italic,
	Link2,
	List,
	Minus,
	Underline as UnderlineIcon,
} from 'lucide-react';

import { useAppContext } from '@/context/AppContext';
import { UrlDialog } from '@/components/ui/dialog';

const tiptapStyles = css`
	.ProseMirror {
		border: 1px solid var(--editor-border);
		border-radius: 4px;
		height: calc(100vh - 130px);
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		background-color: var(--editor-control-bg);
		color: var(--editor-fg);
	}

	.menu-bar {
		display: flex;
		justify-content: center;
		margin: 12px 0;
		flex-wrap: wrap;
		gap: 4px;
	}

	button {
		margin: 0 4px;
		border-radius: 4px;
		padding: 4px 8px;
		border: 1px solid var(--editor-border);
		background-color: var(--editor-control-bg);
		color: var(--editor-fg);

		&:hover {
			background-color: var(--editor-control-hover);
		}
	}

	button.is-active {
		background-color: var(--editor-strong-bg);
		color: var(--editor-strong-fg);
		border-color: var(--editor-strong-bg);
	}

	hr {
		border: 0;
		border-top: 1px solid var(--editor-border);
		margin: 12px 0;
	}

	li {
		list-style-type: disc;
		margin-left: 24px;
	}

	a {
		color: var(--editor-link);
		text-decoration: underline;
	}
`;

const CustomImage = Image.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			alignment: {
				default: 'center',
				parseHTML: (element) => element.style.alignSelf || 'center',
				renderHTML: (attributes) => {
					return {
						style: `
						align-self: ${attributes.alignment};
						display: flex;
						`,
					};
				},
			},
		};
	},
});

interface ToolbarButtonProps {
	title: string;
	onClick: () => void;
	isActive?: boolean;
	children: React.ReactNode;
}

const ToolbarButton = ({ title, onClick, isActive, children }: ToolbarButtonProps) => (
	<button
		type="button"
		title={title}
		aria-label={title}
		onClick={onClick}
		className={isActive ? 'is-active' : ''}
	>
		{children}
	</button>
);

const MenuBar = ({
	editor,
	onAddLink,
	onAddImage,
}: {
	editor: ReturnType<typeof useEditor>;
	onAddLink: () => void;
	onAddImage: () => void;
}) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="menu-bar">
			<ToolbarButton
				title="Heading 1"
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				isActive={editor.isActive('heading', { level: 1 })}
			>
				H1
			</ToolbarButton>
			<ToolbarButton
				title="Paragraph"
				onClick={() => editor.chain().focus().setParagraph().run()}
				isActive={editor.isActive('paragraph')}
			>
				P
			</ToolbarButton>
			<ToolbarButton
				title="Bold"
				onClick={() => editor.chain().focus().toggleBold().run()}
				isActive={editor.isActive('bold')}
			>
				<Bold className="h-4 w-4" />
			</ToolbarButton>
			<ToolbarButton
				title="Italic"
				onClick={() => editor.chain().focus().toggleItalic().run()}
				isActive={editor.isActive('italic')}
			>
				<Italic className="h-4 w-4" />
			</ToolbarButton>
			<ToolbarButton
				title="Highlight"
				onClick={() => editor.chain().focus().toggleHighlight().run()}
				isActive={editor.isActive('highlight')}
			>
				<Highlighter className="h-4 w-4" />
			</ToolbarButton>
			<ToolbarButton
				title="Align Left"
				onClick={() => editor.chain().focus().setTextAlign('left').run()}
				isActive={editor.isActive({ textAlign: 'left' })}
			>
				<AlignLeft className="h-4 w-4" />
			</ToolbarButton>
			<ToolbarButton
				title="Align Center"
				onClick={() => editor.chain().focus().setTextAlign('center').run()}
				isActive={editor.isActive({ textAlign: 'center' })}
			>
				<AlignCenter className="h-4 w-4" />
			</ToolbarButton>
			<ToolbarButton
				title="Align Right"
				onClick={() => editor.chain().focus().setTextAlign('right').run()}
				isActive={editor.isActive({ textAlign: 'right' })}
			>
				<AlignRight className="h-4 w-4" />
			</ToolbarButton>
			<ToolbarButton title="Add Link" onClick={onAddLink} isActive={editor.isActive('link')}>
				<Link2 className="h-4 w-4" />
			</ToolbarButton>
			<ToolbarButton
				title="Horizontal Rule"
				onClick={() => editor.chain().focus().setHorizontalRule().run()}
			>
				<Minus className="h-4 w-4" />
			</ToolbarButton>
			<ToolbarButton
				title="Underline"
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				isActive={editor.isActive('underline')}
			>
				<UnderlineIcon className="h-4 w-4" />
			</ToolbarButton>
			<ToolbarButton
				title="Bullet List"
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				isActive={editor.isActive('bulletList')}
			>
				<List className="h-4 w-4" />
			</ToolbarButton>
			<ToolbarButton title="Add Image" onClick={onAddImage}>
				<ImagePlus className="h-4 w-4" />
			</ToolbarButton>
		</div>
	);
};

export default () => {
	const { editorContentRef } = useAppContext();
	const [urlDialogMode, setUrlDialogMode] = useState<'link' | 'image' | null>(null);
	const [urlValue, setUrlValue] = useState('');

	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Highlight,
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: 'https',
			}),
			HorizontalRule,
			Underline,
			CustomImage,
		],
		onUpdate: ({ editor }) => {
			editorContentRef.current = editor.getHTML();
		},
		content: editorContentRef.current,
	});

	const [viewportWidth, setViewportWidth] = useState(0);
	const [hasMounted, setHasMounted] = useState(false);

	const closeDialog = () => {
		setUrlDialogMode(null);
		setUrlValue('');
	};

	const confirmDialog = () => {
		if (!editor || !urlDialogMode) {
			closeDialog();
			return;
		}

		const cleanedUrl = urlValue.trim();
		if (!cleanedUrl) {
			closeDialog();
			return;
		}

		if (urlDialogMode === 'link') {
			editor.chain().focus().extendMarkRange('link').setLink({ href: cleanedUrl }).run();
		} else {
			editor.chain().focus().setImage({ src: cleanedUrl }).run();
		}

		closeDialog();
	};

	useEffect(() => {
		setHasMounted(true);
		const handleResize = () => {
			setViewportWidth(window.innerWidth);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div css={tiptapStyles}>
			{hasMounted && viewportWidth < 500 ? (
				<p className="text-center text-xs">
					For the best experience, turn your phone to landscape mode or use a desktop to
					edit announcements.
				</p>
			) : null}
			<MenuBar
				editor={editor}
				onAddLink={() => setUrlDialogMode('link')}
				onAddImage={() => setUrlDialogMode('image')}
			/>
			<EditorContent editor={editor} />
			<UrlDialog
				open={urlDialogMode !== null}
				title={urlDialogMode === 'link' ? 'Add Link' : 'Add Image'}
				description={
					urlDialogMode === 'link'
						? 'Paste the URL you want to attach to the selected text.'
						: 'Paste the image URL you want to insert.'
				}
				label={urlDialogMode === 'link' ? 'Link URL' : 'Image URL'}
				placeholder="https://"
				confirmText={urlDialogMode === 'link' ? 'Add Link' : 'Add Image'}
				value={urlValue}
				onValueChange={setUrlValue}
				onCancel={closeDialog}
				onConfirm={confirmDialog}
			/>
		</div>
	);
};
