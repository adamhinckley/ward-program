'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';

//icons
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

import { useAppContext } from '@/context/AppContext';

const tiptapStyles = css`
	.ProseMirror {
		border: 1px solid black;
		border-radius: 4px;
		height: calc(100vh - 130px);
		overflow-y: auto;
	}

	.menu-bar {
		display: flex;
		justify-content: center;
		margin: 12px 0;
	}

	button {
		margin: 0 4px;
		border-radius: 4px;
		padding: 4px 8px;
		border: 1px solid #ccc;
	}

	hr {
		border: 0;
		border-top: 1px solid #ccc;
		margin: 12px 0;
	}

	li {
		list-style-type: disc;
		margin-left: 24px;
	}

	a {
		color: #007bff;
		text-decoration: underline;
	}
`;

const MenuBar = ({ editor }: { editor: ReturnType<typeof useEditor> }) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="menu-bar">
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
			>
				H1
			</button>
			<button
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={editor.isActive('paragraph') ? 'is-active' : ''}
			>
				Paragraph
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={editor.isActive('bold') ? 'is-active' : ''}
			>
				<FormatBoldIcon />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={editor.isActive('italic') ? 'is-active' : ''}
			>
				<FormatItalicIcon />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHighlight().run()}
				className={editor.isActive('highlight') ? 'is-active' : ''}
			>
				Highlight
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('left').run()}
				className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
			>
				Left
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('center').run()}
				className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
			>
				Center
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('right').run()}
				className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
			>
				Right
			</button>

			<button
				onClick={() => {
					const url = window.prompt('Enter the URL');
					if (url) {
						editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
					}
				}}
				className={editor.isActive('link') ? 'is-active' : ''}
			>
				Link
			</button>
			<button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
				Divider
			</button>
			<button
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				className={editor.isActive('underline') ? 'is-active' : ''}
			>
				Underline
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={editor.isActive('bulletList') ? 'is-active' : ''}
			>
				List
			</button>
		</div>
	);
};

export default () => {
	const { setContent, content, editorContentRef } = useAppContext();
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
			BulletList,
		],
		onUpdate: ({ editor }) => {
			console.log('updated');
			editorContentRef.current = editor.getHTML();
		},

		content: editorContentRef.current,
	});

	return (
		<div css={tiptapStyles}>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};
