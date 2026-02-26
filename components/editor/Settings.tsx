/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAppContext } from '@/context/AppContext';
import QRCode from 'react-qr-code';
import { Bulletin } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type SettingsProps = {
	content: Bulletin;
	handleChange: () => void;
};

const styles = css`
	.switch-container {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 12px 0;

		.Mui-checked {
			color: var(--editor-tab-active);
		}

		.MuiSwitch-track.MuiSwitch-track {
			background-color: var(--editor-tab-active);
		}
	}

	.qr-code-container {
		max-width: 400px;
		margin: 0 auto;
		justify-content: center;
		display: flex;
		flex-direction: column;

		gap: 16px;

		button {
			background-color: var(--editor-strong-bg);
			color: var(--editor-strong-fg);
		}
	}

	.link-container {
		background-color: var(--editor-muted-bg);
		padding: 8px;
		border-radius: 4px;
	}

	a {
		color: var(--editor-link);
		text-decoration: underline;
	}
`;

const Settings = ({ content, handleChange }: SettingsProps) => {
	const { setContent, userData, bulletinId } = useAppContext();

	const handleCheckboxChange = (e: { target: { name: any; checked: any } }) => {
		setContent({ ...content, [e.target.name]: e.target.checked });
	};

	const isDemo = bulletinId === 'demo';

	const qrCodeValue = isDemo
		? 'https://app.wardprogram.com/demo/program'
		: `https://app.wardprogram.com/?id=${bulletinId}`;
	return (
		<div className="p-4 mb-4" css={styles}>
			<p>
				Have questions or ideas to share? Join our exclusive community on{' '}
				<a
					href="https://www.facebook.com/share/g/mTLYxUWuD1ci6b66/"
					target="_blank"
					rel="noreferrer"
				>
					facebook
				</a>{' '}
				and dive right in!
			</p>
			<div className="link-container">
				<p>Your custom program link: </p>
				<a href={qrCodeValue} target="_blank" rel="noreferrer">
					{qrCodeValue}
				</a>
			</div>

			<div className="mt-4 grid gap-2">
				<Label htmlFor="title">Title</Label>
				<Input id="title" name="title" value={content.title} onChange={handleChange} />
			</div>
			<div className="mt-4 grid gap-2">
				<Label htmlFor="customHeading">Custom Post Sacrament Heading</Label>
				<Input
					id="customHeading"
					name="customHeading"
					value={content.customHeading}
					onChange={handleChange}
				/>
				<p className="text-xs text-[var(--editor-tab-inactive)]">
					Shows up after the sacrament - Testimony Meeting, Primary Program, etc. Leave
					blank when not needed.
				</p>
			</div>
			<div className="mt-4 grid gap-2">
				<Label htmlFor="imageUrl">Image URL</Label>
				<Input
					id="imageUrl"
					name="imageUrl"
					value={content.imageUrl}
					onChange={handleChange}
				/>
				<p className="text-xs text-[var(--editor-tab-inactive)]">
					Ensure the link points directly to the image file, not to a webpage containing
					the image.
				</p>
			</div>
			<div className="qr-code-container">
				<QRCode
					value={qrCodeValue}
					id="QRCode"
					style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
				/>
				<Button
					type="button"
					value="Download QR"
					onClick={() => {
						const svg = document.getElementById('QRCode');
						if (svg) {
							const svgData = new XMLSerializer().serializeToString(svg);
							const canvas = document.createElement('canvas');
							const ctx = canvas.getContext('2d');
							const img = new Image();
							img.onload = () => {
								canvas.width = img.width;
								canvas.height = img.height;
								ctx?.drawImage(img, 0, 0);
								const pngFile = canvas.toDataURL('image/png');
								const downloadLink = document.createElement('a');
								downloadLink.download = 'QRCode';
								downloadLink.href = `${pngFile}`;
								downloadLink.click();
							};
							img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
						}
					}}
				>
					Download qr code
				</Button>
			</div>
		</div>
	);
};

export default Settings;
