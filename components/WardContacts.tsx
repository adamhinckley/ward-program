/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAppContext } from '@/context/AppContext';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const styles = css`
	margin-bottom: 12px;
	.agenda-content {
		text-decoration: underline;
		color: var(--program-link);
	}
`;
const WardContacts = () => {
	const { content } = useAppContext();
	const { wardContacts } = content;

	return Array.isArray(wardContacts) && wardContacts.length ? (
		<div css={styles}>
			{wardContacts.map((blockToNarrow, index) => {
				const block = blockToNarrow as { left: string; right: string };
				return (
					<Accordion
						key={index}
						disableGutters
						elevation={0}
						sx={{
							backgroundColor: 'var(--program-card-bg)',
							color: 'var(--program-fg)',
							border: '1px solid var(--program-panel-border)',
							borderRadius: '6px',
							overflow: 'hidden',
							boxShadow: 'none',
							marginBottom: '10px',
							'&:before': {
								display: 'none',
							},
						}}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							sx={{
								backgroundColor: 'var(--program-panel-bg)',
								'& .MuiAccordionSummary-expandIconWrapper': {
									color: 'var(--program-fg)',
								},
							}}
						>
							<Typography>{block.left}</Typography>
						</AccordionSummary>
						<AccordionDetails sx={{ backgroundColor: 'var(--program-card-bg)' }}>
							<Typography sx={{ textAlign: 'center', color: 'var(--program-link)' }}>
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
