/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAppContext } from '@/context/AppContext';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

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
						type="single"
						collapsible
						className="mb-[10px] rounded-md border border-[var(--program-panel-border)] bg-[var(--program-card-bg)] px-4 text-[var(--program-fg)]"
					>
						<AccordionItem value={`contact-${index}`} className="border-b-0">
							<AccordionTrigger className="bg-[var(--program-panel-bg)] px-3 rounded-md no-underline hover:no-underline">
								{block.left}
							</AccordionTrigger>
							<AccordionContent className="text-center text-[var(--program-link)] px-3 pt-3">
								<a href={`tel:+1-${block.right}`} rel="noopener noreferrer">
									{block.right}
								</a>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				);
			})}
		</div>
	) : null;
};

export default WardContacts;
