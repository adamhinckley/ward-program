const TabPanel = (props: { [x: string]: any; children: any; value: any; index: any }) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`sidebar-tabpanel-${index}`}
			aria-labelledby={`sidebar-tab-${index}`}
			{...other}
		>
			{value === index && <div>{children}</div>}
		</div>
	);
};

export default TabPanel;
