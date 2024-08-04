'use client';
import Image from 'next/image';
import { useAppContext } from '../context/AppContext';

const FrontPage = () => {
	const { content } = useAppContext();
	return (
		<>
			<div style={{ width: '100%' }}>
				{content.imageUrl ? (
					<Image src={content.imageUrl as string} alt="" width={550} height={550} />
				) : null}
			</div>
		</>
	);
};
export default FrontPage;
