import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type EasterEggProps = {
	setShowEasterEgg: (value: boolean) => void;
};

const EasterEgg = ({ setShowEasterEgg }: EasterEggProps) => {
	return (
		<div className="fixed inset-0 z-[2147483647] flex h-dvh w-dvw flex-col justify-center overflow-auto bg-[var(--program-bg)] p-3 text-[var(--program-fg)]">
			<p className="text-center text-[2rem]">🎉 Congratulations! 🎉</p>
			<p className="text-center">
				Enter code "Think Celestial" on the church website for a 10% discount on tithing!
			</p>
			<div className="flex justify-center mt-4">
				<Button
					type="button"
					variant="outline"
					size="icon"
					onClick={() => setShowEasterEgg(false)}
				>
					<X className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default EasterEgg;
