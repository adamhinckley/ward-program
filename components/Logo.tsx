import { BookOpenText } from 'lucide-react';

const Logo = () => (
	<div className="flex w-fit items-center gap-2">
		<BookOpenText size={30} aria-hidden="true" />
		<div className="flex flex-col items-center gap-1">
			<p className="mt-1">Ward Program</p>
		</div>
	</div>
);

export default Logo;
