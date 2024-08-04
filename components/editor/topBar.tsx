'use client';
import Button from '@mui/material/Button';
import { createClient } from '@/utils/supabase/client';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';

const TopBar = () => {
	const supabase = createClient();
	const { content } = useAppContext();
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(false);

	const handleSave = async () => {
		setSaving(true);
		try {
			const { data, error } = await supabase
				.from('ward-bulletin')
				.update({ bulletin: content }) // Assuming 'bulletin' is the column you want to update.
				.eq('id', 2)
				// .eq('id', 6)
				.select();

			if (error) {
				console.error('Error updating data:', error);
				setError(true);
				return;
			}
		} catch (error) {
			console.error('Error caught:', error);
		}
		setSaving(false);
	};

	// const insertData = async () => {
	// 	const { data, error } = await supabase
	// 		.from('ward-bulletin')
	// 		.insert([{ bulletin: content, stake: 'Test', ward: 'test' }]);

	// 	if (error) {
	// 		console.error('Error inserting data:', error);
	// 		setError(true);
	// 		return;
	// 	}
	// };

	return (
		<div className="sticky z-50 bg-gray-300 top-0 flex ">
			<div className="max-w-4xl flex justify-end flex-col m-auto p-4">
				<Button
					variant="contained"
					className="bg-blue-800"
					disabled={saving}
					onClick={handleSave}
				>
					{saving ? 'Saving...' : 'Save'}
				</Button>
				{/* <Button variant="contained" className="bg-blue-800" onClick={insertData}>
					Insert Data
				</Button> */}
				{error && <div className="text-red-500">Error saving data</div>}
			</div>
		</div>
	);
};

export default TopBar;
