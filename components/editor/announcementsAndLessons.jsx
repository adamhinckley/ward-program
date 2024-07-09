'use client';
import { useCallback } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrag, useDrop } from 'react-dnd';

import AnnouncementEditor from './announcement';
import LessonEditor from './lesson';
import { useAppContext } from '@/context/AppContext';

// Note: Drag and drop doesn't work when used in this file for some reason.
// This is a copy of DraggableItem from app/protected/editor.jsx where it does work.

const AnnouncementsAndLessons = ({ data, index }) => {
	console.log('data', data);
	const { content, setContent } = useAppContext();
	const [, drag] = useDrag(() => ({
		type: 'ITEM',
		item: { index },
	}));
	const moveItem = useCallback((dragIndex, hoverIndex) => {
		const items = content.announcementsAndLessons;
		const dragItem = items[dragIndex];
		const newItems = [...items];
		newItems.splice(dragIndex, 1);
		newItems.splice(hoverIndex, 0, dragItem);
		// add the new items to the content
		setContent({ ...content, announcementsAndLessons: newItems });
	}, []);

	const [, drop] = useDrop(() => ({
		accept: 'ITEM',
		hover(item, monitor) {
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			moveItem(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	return (
		<DndProvider backend={HTML5Backend}>
			<div ref={drop}>
				{data.type === 'announcement' ? (
					<div ref={drag}>
						<AnnouncementEditor data={data} index={index} />
					</div>
				) : (
					<div ref={drag}>
						<LessonEditor data={data} index={index} />
					</div>
				)}
			</div>
		</DndProvider>
	);
};

export default AnnouncementsAndLessons;
