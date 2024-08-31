/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TabPanel from '@/components/editor/TabPanel';
import WardContacts from '@/components/WardContacts';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Agenda from '@/components/agenda';
import Announcements from '@/components/announcements';
import FrontPage from '@/components/frontPage';

const styles = css`
	max-width: 550px;
	margin: 0 auto;
	padding: 0 12px 12px;

	.MuiTabs-root {
		margin-bottom: 4px;
		position: sticky;
		top: 0;
		background-color: white;
		z-index: 1;
	}

	.MuiTabs-flexContainer {
		justify-content: space-between;
	}

	.Mui-selected.Mui-selected {
		color: #000000;
	}

	.MuiTabs-indicator {
		background-color: #000000;
	}

	button {
		font-size: 3vw; /* Adjust this value as needed */
		white-space: nowrap; /* Prevent text from wrapping */
		overflow: hidden; /* Hide overflow text */
		text-overflow: ellipsis; /* Add ellipsis for overflow text */
		display: inline-block;

		// above 550px
		@media (min-width: 550px) {
			font-size: 1rem;
		}
	}
`;

const WardFacingProgram = () => {
	const [currentTab, setCurrentTab] = useState(0);
	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setCurrentTab(newValue);
	};

	return (
		<main css={styles}>
			<Tabs
				value={currentTab}
				onChange={handleTabChange}
				aria-label="order customizer module tabs"
				className="tabs"
			>
				<Tab label="Agenda" />
				<Tab label="Announcements" />
				<Tab label="Contacts" />
			</Tabs>
			<TabPanel value={currentTab} index={0}>
				<FrontPage />
				<Agenda />
			</TabPanel>
			<TabPanel value={currentTab} index={1}>
				<Announcements />
			</TabPanel>
			<TabPanel value={currentTab} index={2}>
				<WardContacts />
			</TabPanel>
		</main>
	);
};

export default WardFacingProgram;
