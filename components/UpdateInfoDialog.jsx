/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { DialogTitle, Dialog, DialogContent } from '@mui/material';
import Textfield from '@mui/material/TextField';

const UpdateInfoDialog = () => {
	const [inputData, setInputData] = useState({ email: '', password: '' });
	return (
		<Dialog open>
			<DialogTitle>Update Info</DialogTitle>
			<DialogContent>
				<Textfield
					label="Email"
					value={inputData.email}
					onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
				/>
				<Textfield
					label="Password"
					value={inputData.password}
					onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateInfoDialog;
