import { useAppContext } from '@/context/AppContext';

import type { EditorChildren } from '@/utils/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Leaders = ({ handleChange }: EditorChildren) => {
	const { content } = useAppContext();
	return (
		<div className="mt-4 space-y-4">
			<div className="grid gap-2">
				<Label htmlFor="presiding">Presiding</Label>
				<Input
					id="presiding"
					name="presiding"
					value={content.presiding}
					onChange={handleChange}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="conducting">Conducting</Label>
				<Input
					id="conducting"
					name="conducting"
					value={content.conducting}
					onChange={handleChange}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="musicLeader">Music Leader</Label>
				<Input
					id="musicLeader"
					name="musicLeader"
					value={content.musicLeader}
					onChange={handleChange}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="accompanist">Accompanist</Label>
				<Input
					id="accompanist"
					name="accompanist"
					value={content.accompanist}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default Leaders;
