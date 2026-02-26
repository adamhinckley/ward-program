import { useAppContext } from '../../context/AppContext';

import type { EditorChildren } from '../../utils/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Prayers = ({ handleChange }: EditorChildren) => {
	const { content } = useAppContext();
	return (
		<div className="mt-4 space-y-4">
			<div className="grid gap-2">
				<Label htmlFor="openingPrayer">Opening Prayer</Label>
				<Input
					id="openingPrayer"
					name="openingPrayer"
					value={content.openingPrayer}
					onChange={handleChange}
				/>
			</div>

			<div className="grid gap-2">
				<Label htmlFor="closingPrayer">Closing Prayer</Label>
				<Input
					id="closingPrayer"
					name="closingPrayer"
					value={content.closingPrayer}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default Prayers;
