/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAppContext } from '@/context/AppContext';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const styles = css`
	h1 {
		font-size: 1.3rem;
		font-weight: bold;
		text-align: center;
	}

	.agenda-content {
		text-decoration: underline;
		color: #1e40af;
	}
`;
const WardContacts = () => {
	const { content } = useAppContext();
	const { wardContacts } = content;

	return Array.isArray(wardContacts) && wardContacts.length ? (
		<div css={styles}>
			<Typography variant="h1">Ward Contacts</Typography>
			{wardContacts.map((blockToNarrow, index) => {
				const block = blockToNarrow as { left: string; right: string };
				return (
					<Accordion key={index}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>{block.left}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography sx={{ textAlign: 'center', color: '#1e40af' }}>
								<a href={`tel:+1-${block.right}`} rel="noopener noreferrer">
									{block.right}
								</a>
							</Typography>
						</AccordionDetails>
					</Accordion>
				);
			})}
		</div>
	) : null;
};

export default WardContacts;
