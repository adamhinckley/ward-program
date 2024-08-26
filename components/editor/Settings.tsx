/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Textfield from '@mui/material/TextField';
import { Typography, Button } from '@mui/material';
import Switch from '@mui/material/Switch';
import { useAppContext } from '@/context/AppContext';
import QRCode from 'react-qr-code';
import { Bulletin } from '@/utils/types';

type SettingsProps = {
	content: Bulletin;
	handleChange: () => void;
};

const styles = css`
	.qr-code-container {
		max-width: 400px;
		margin: 0 auto;
		justify-content: center;
		display: flex;
		flex-direction: column;

		gap: 16px;

		button {
			background-color: #1976d2;
		}
	}
`;

const Settings = ({ content, handleChange }: SettingsProps) => {
	const { setContent, userData, bulletinId } = useAppContext();

	const handleCheckboxChange = (e: { target: { name: any; checked: any } }) => {
		setContent({ ...content, [e.target.name]: e.target.checked });
	};

	const qrCodeValue = `https://app.wardprogram.com/?id=${bulletinId}`;
	return (
		<div className="bg-white p-4 mb-4" css={styles}>
			<div className="flex">
				<Typography variant="h6">Testimony Meeting</Typography>
				<Switch
					checked={content.isTestimonyMeeting}
					onChange={handleCheckboxChange}
					name="isTestimonyMeeting"
					inputProps={{ 'aria-label': 'controlled' }}
				/>
			</div>
			<Textfield
				name="title"
				value={content.title}
				onChange={handleChange}
				fullWidth
				label="title"
				sx={{ mb: 2 }}
			/>
			<Textfield
				name="imageUrl"
				value={content.imageUrl}
				onChange={handleChange}
				fullWidth
				label="Image URL"
				sx={{ mb: 2 }}
				helperText="Only images from churchofjesuschrist.org will work"
			/>
			<div className="qr-code-container">
				<QRCode
					value={qrCodeValue}
					id="QRCode"
					style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
				/>
				<Button
					type="button"
					value="Download QR"
					variant="contained"
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
				<a href={qrCodeValue} target="_blank" rel="noreferrer">
					{qrCodeValue}
				</a>
			</div>
		</div>
	);
};

export default Settings;
