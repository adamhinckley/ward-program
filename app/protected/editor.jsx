'use client';
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import Textfield from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import { useAppContext } from '../../context/AppContext';
import Leaders from '@/components/editor/leaders';
import Music from '@/components/editor/music';
import Prayers from '@/components/editor/prayers';
import Block from '@/components/editor/block';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Tiptap from '@/components/editor/Tiptap';
import SaveButton from '@/components/editor/SaveButton';
import TabPanel from '@/components/editor/TabPanel';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { createClient } from '@/utils/supabase/client';
import Settings from '@/components/editor/Settings';

const styles = css`
	.MuiTabs-flexContainer {
		justify-content: space-between;
	}

	.tabs {
		// display none below 750 px
		@media (max-width: 750px) {
			display: none;
		}
	}

	.mobile-menu-container {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;

		@media (min-width: 751px) {
			display: none;
		}
		.hamburger {
			width: 40px;
			height: 40px;
			background-color: transparent;

			.MuiSvgIcon-root {
				fill: #000000;
			}
		}
	}

	.drawer {
		button {
			font-size: 1.5rem;
		}
	}

	.Mui-selected.Mui-selected {
		color: #000000;
	}

	.MuiTabs-indicator {
		background-color: #000000;
	}
`;

const loadingStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Editor = () => {
	const { content, setContent, currentTab, setCurrentTab, userData } = useAppContext();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const supabase = createClient();

	// return loading if content is not available
	// check if content is an empty object
	if (Object.keys(content).length === 0) {
		return (
			<div css={loadingStyles}>
				<CircularProgress />
			</div>
		);
	}
	/**
	 *
	 * @param {*} e
	 * @param {string}
	 * @param {*} index
	 * @returns
	 */

	const handleChange = (e, block, index) => {
		if (block) {
			if (Array.isArray(content[block]) && typeof content[block][0] === 'string') {
				// Check if content[block] is an array of strings
				const newBlock = content[block].map((item, i) => {
					if (i === index) {
						return e.target.value; // Update the string at the specified index
					}
					return item;
				});
				setContent({ ...content, [block]: newBlock });
			} else {
				// Existing logic for an array of objects
				const newBlock = content[block].map((block, i) => {
					if (i === index) {
						return { ...block, [e.target.name]: e.target.value };
					}
					return block;
				});
				setContent({ ...content, [block]: newBlock });
			}
			return;
		}
		setContent({ ...content, [e.target.name]: e.target.value });
	};

	const handleCheckboxChange = (e) => {
		setContent({ ...content, [e.target.name]: e.target.checked });
	};

	const handleAddBlockIndex = (block) => {
		if (block === 'intermediateMusicPerformers') {
			const newPerformer = content.intermediateMusicPerformers.concat('');
			setContent({ ...content, intermediateMusicPerformers: newPerformer });
			return;
		}

		// add block array to content if it doesn't exist
		if (!content[block]) {
			setContent({ ...content, [block]: [{ left: '', right: '' }] });
			return;
		}

		setContent({ ...content, [block]: [...content[block], { left: '', right: '' }] });
	};

	const handleDeleteBlockIndex = (block, index) => {
		if (block === 'intermediateMusicPerformers') {
			const newPerformers = content.intermediateMusicPerformers.filter((_, i) => i !== index);
			setContent({ ...content, intermediateMusicPerformers: newPerformers });
		} else {
			const newBlock = content[block].filter((_, i) => i !== index);
			setContent({ ...content, [block]: newBlock });
		}
	};

	const a11yProps = (index) => {
		return {
			id: `tab-${index}`,
			'aria-controls': `tabpanel-${index}`,
		};
	};

	const handleTabChange = async (_, tabNumber) => {
		setCurrentTab(tabNumber);
		await supabase
			.from('user-settings')
			.update({ currentTab: tabNumber })
			.eq('id', userData.id)
			.select();
	};

	const handleDrawerButtonClick = async (tabNumber) => {
		setIsDrawerOpen(false);
		setCurrentTab(tabNumber);
		await supabase
			.from('user-settings')
			.update({ currentTab: tabNumber })
			.eq('id', userData.id)
			.select();
	};

	return (
		<div className="max-w-4xl flex justify-center flex-col m-auto p-4" css={styles}>
			<div className="mobile-menu-container">
				<IconButton className="hamburger" onClick={() => setIsDrawerOpen((prev) => !prev)}>
					<MenuIcon />
				</IconButton>
				<SaveButton />
			</div>
			<Tabs
				value={currentTab}
				onChange={handleTabChange}
				aria-label="order customizer module tabs"
				className="tabs"
			>
				<Tab label="Settings" {...a11yProps(0)} />
				<Tab label="Leaders" {...a11yProps(1)} />
				<Tab label="Music" {...a11yProps(2)} />
				<Tab label="Prayers" {...a11yProps(3)} />
				<Tab label="Blocks" {...a11yProps(4)} />
				<Tab label="Announcements" {...a11yProps(5)} />
				<SaveButton />
			</Tabs>
			<Drawer
				anchor="left"
				open={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
				className="drawer"
				// add styles to drawer
				sx={{
					'& .MuiDrawer-paper': {},
					button: {
						fontSize: '1.125rem',
						borderRadius: '0',
						margin: '12px 20px',
					},
				}}
			>
				<Button
					variant="text"
					onClick={() => handleDrawerButtonClick(0)}
					sx={{
						borderBottom: currentTab === 0 ? '2px solid #000' : '',
						color: '#000000',
					}}
				>
					Settings
				</Button>
				<Button
					variant="text"
					color="primary"
					onClick={() => handleDrawerButtonClick(1)}
					sx={{
						borderBottom: currentTab === 1 ? '2px solid #000' : '',
						color: '#000000',
					}}
				>
					Leaders
				</Button>
				<Button
					variant="text"
					color="primary"
					onClick={() => handleDrawerButtonClick(2)}
					sx={{
						borderBottom: currentTab === 2 ? '2px solid #000' : '',
						color: '#000000',
					}}
				>
					Music
				</Button>
				<Button
					variant="text"
					color="primary"
					onClick={() => handleDrawerButtonClick(3)}
					sx={{
						borderBottom: currentTab === 3 ? '2px solid #000' : '',
						color: '#000000',
					}}
				>
					Prayers
				</Button>
				<Button
					variant="text"
					color="primary"
					onClick={() => handleDrawerButtonClick(4)}
					sx={{
						borderBottom: currentTab === 4 ? '2px solid #000' : '',
						color: '#000000',
					}}
				>
					Blocks
				</Button>
				<Button
					variant="text"
					color="primary"
					onClick={() => handleDrawerButtonClick(5)}
					sx={{
						borderBottom: currentTab === 5 ? '2px solid #000' : '',
						color: '#000000',
					}}
				>
					Announcements
				</Button>
			</Drawer>
			<TabPanel value={currentTab} index={0}>
				<Settings content={content} handleChange={handleChange} />
			</TabPanel>
			<TabPanel value={currentTab} index={1}>
				<Leaders handleChange={handleChange} />
			</TabPanel>
			<TabPanel value={currentTab} index={2}>
				<Music
					handleChange={handleChange}
					handleDeleteBlockIndex={handleDeleteBlockIndex}
					handleAddBlockIndex={handleAddBlockIndex}
				/>
			</TabPanel>
			<TabPanel value={currentTab} index={3}>
				<Prayers handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} />
			</TabPanel>
			<TabPanel value={currentTab} index={4}>
				<Block
					handleChange={handleChange}
					handleDeleteBlockIndex={handleDeleteBlockIndex}
					handleAddBlockIndex={handleAddBlockIndex}
					blockName="blockOne"
				/>
				<Block
					handleChange={handleChange}
					handleDeleteBlockIndex={handleDeleteBlockIndex}
					handleAddBlockIndex={handleAddBlockIndex}
					blockName="blockTwo"
				/>
				<Block
					handleChange={handleChange}
					handleDeleteBlockIndex={handleDeleteBlockIndex}
					handleAddBlockIndex={handleAddBlockIndex}
					blockName="blockThree"
				/>
				<Block
					handleChange={handleChange}
					handleDeleteBlockIndex={handleDeleteBlockIndex}
					handleAddBlockIndex={handleAddBlockIndex}
					blockName="wardContacts"
				/>
			</TabPanel>
			<TabPanel value={currentTab} index={5}>
				<Tiptap />
			</TabPanel>
		</div>
	);
};

export default Editor;
