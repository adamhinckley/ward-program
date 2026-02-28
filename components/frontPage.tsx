import Image from 'next/image';
import EasterEgg from './EasterEgg';

type FrontPageProps = {
	imageUrl?: string;
};

const FrontPage = ({ imageUrl }: FrontPageProps) => {
	console.log('front');
	return (
		<div>
			<div className="relative mx-auto inline-block w-fit">
				<EasterEgg targetId="front-page-image" />
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt=""
						width={550}
						height={550}
						className="block h-auto"
						loading="eager"
						id="front-page-image"
					/>
				) : null}
			</div>
		</div>
	);
};
export default FrontPage;
