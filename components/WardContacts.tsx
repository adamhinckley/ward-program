/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAppContext } from '@/context/AppContext';
import { Typography } from '@mui/material';

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
					<div className="agenda-block" key={index}>
						<div className="title-container">
							<p className="agenda-title">{block.left}</p>
							<p className="agenda-content">
								<a href={`tel:+1-${block.right}`} rel="noopener noreferrer">
									{block.right}
								</a>
							</p>
						</div>
					</div>
				);
			})}
		</div>
	) : null;
};

export default WardContacts;
