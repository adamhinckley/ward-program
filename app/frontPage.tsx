'use client';
import Image from 'next/image';
import { settings } from './settings';

const FrontPage = () => {
	return (
		<>
			<div style={{ width: '100%' }}>
				<Image
					src={settings.imageUrl}
					alt=""
					width={500}
					height={500}
					// objectFit="cover"
				/>
			</div>
		</>
	);
};
export default FrontPage;
