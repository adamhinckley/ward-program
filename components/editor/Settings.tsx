import { useAppContext } from '@/context/AppContext';
import QRCode from 'react-qr-code';
import { Bulletin } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { buildWardAbsoluteUrl } from '@/utils/wardUrl';

type SettingsProps = {
	content: Bulletin;
	handleChange: () => void;
};

const Settings = ({ content, handleChange }: SettingsProps) => {
	const { setContent, userData, bulletinId } = useAppContext();

	const handleCheckboxChange = (e: { target: { name: any; checked: any } }) => {
		setContent({ ...content, [e.target.name]: e.target.checked });
	};

	const isDemo = bulletinId === 'demo';

	const qrCodeValue = isDemo
		? 'https://app.wardprogram.com/demo/program'
		: buildWardAbsoluteUrl(bulletinId);

	console.log('qrCodeValue', qrCodeValue);
	return (
		<div className="mb-4 p-4 [&_a]:text-[var(--editor-link)] [&_a]:underline">
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
			<div className="rounded bg-[var(--editor-muted-bg)] p-2">
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
				<p className="text-xs text-[var(--editor-tab-inactive)] mb-4">
					Ensure the link points directly to the image file, not to a webpage containing
					the image.
				</p>
			</div>
			<div className="mx-auto flex max-w-[400px] flex-col justify-center gap-4">
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
					className="bg-[var(--editor-strong-bg)] text-[var(--editor-strong-fg)] hover:bg-[var(--editor-strong-bg)]/90"
				>
					Download qr code
				</Button>
			</div>
		</div>
	);
};

export default Settings;
