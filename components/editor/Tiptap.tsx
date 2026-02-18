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
import BulletList from '@tiptap/extension-bullet-list';
import Tooltip from '@mui/material/Tooltip';

//icons
import HighlightIcon from '@mui/icons-material/Highlight';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import AddLinkIcon from '@mui/icons-material/AddLink';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import ImageIcon from '@mui/icons-material/Image';

import { useAppContext } from '@/context/AppContext';
import { Typography } from '@mui/material';

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

const MenuBar = ({ editor }: { editor: ReturnType<typeof useEditor> }) => {
	if (!editor) {
		return null;
	}

	const addImage = () => {
		const url = window.prompt('Enter the URL of the image:');
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	return (
		<div className="menu-bar">
			<Tooltip title="Heading 1" enterDelay={500} placement="bottom">
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
				>
					H1
				</button>
			</Tooltip>
			<Tooltip title="Paragraph" enterDelay={500} placement="bottom">
				<button
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={editor.isActive('paragraph') ? 'is-active' : ''}
				>
					P
				</button>
			</Tooltip>
			<Tooltip title="Bold" enterDelay={500} placement="bottom">
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={editor.isActive('bold') ? 'is-active' : ''}
				>
					<FormatBoldIcon />
				</button>
			</Tooltip>
			<Tooltip title="Italic" enterDelay={500} placement="bottom">
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={editor.isActive('italic') ? 'is-active' : ''}
				>
					<FormatItalicIcon />
				</button>
			</Tooltip>
			<Tooltip title="Highlight" enterDelay={500} placement="bottom">
				<button
					onClick={() => editor.chain().focus().toggleHighlight().run()}
					className={editor.isActive('highlight') ? 'is-active' : ''}
				>
					<HighlightIcon />
				</button>
			</Tooltip>
			<Tooltip title="Align Left" enterDelay={500} placement="bottom">
				<button
					onClick={() => editor.chain().focus().setTextAlign('left').run()}
					className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
				>
					<AlignHorizontalLeftIcon />
				</button>
			</Tooltip>
			<Tooltip title="Align Center" enterDelay={500} placement="bottom">
				<button
					onClick={() => editor.chain().focus().setTextAlign('center').run()}
					className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
				>
					<FormatAlignCenterIcon />
				</button>
			</Tooltip>
			<Tooltip title="Align Right" enterDelay={500} placement="bottom">
				<button
					onClick={() => editor.chain().focus().setTextAlign('right').run()}
					className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
				>
					<AlignHorizontalRightIcon />
				</button>
			</Tooltip>
			<Tooltip title="Add Link" enterDelay={500} placement="bottom">
				<button
					onClick={() => {
						const url = window.prompt('Enter the URL');
						if (url) {
							editor
								.chain()
								.focus()
								.extendMarkRange('link')
								.setLink({ href: url })
								.run();
						}
					}}
					className={editor.isActive('link') ? 'is-active' : ''}
				>
					<AddLinkIcon />
				</button>
			</Tooltip>
			<Tooltip title="Horizontal Rule" enterDelay={500} placement="bottom">
				<button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
					<HorizontalRuleIcon />
				</button>
			</Tooltip>
			<Tooltip title="Underline" enterDelay={500} placement="bottom">
				<button
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					className={editor.isActive('underline') ? 'is-active' : ''}
				>
					<FormatUnderlinedIcon />
				</button>
			</Tooltip>
			<Tooltip title="Bullet List" enterDelay={500} placement="bottom">
				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive('bulletList') ? 'is-active' : ''}
				>
					<FormatListBulletedIcon />
				</button>
			</Tooltip>
			<Tooltip title="Add Image" enterDelay={500} placement="bottom">
				<button onClick={addImage}>
					<ImageIcon />
				</button>
			</Tooltip>
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
			CustomImage,
		],
		onUpdate: ({ editor }) => {
			editorContentRef.current = editor.getHTML();
		},

		content: editorContentRef.current,
	});

	const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setViewportWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div css={tiptapStyles}>
			{viewportWidth < 500 ? (
				<Typography sx={{ textAlign: 'center', fontSize: `${12 / 16}rem` }}>
					For the best experience, turn your phone to landscape mode or use a desktop to
					edit announcements.
				</Typography>
			) : null}
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};
