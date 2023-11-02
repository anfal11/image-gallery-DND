import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        background: isOver ? 'lightblue' : 'transparent',
      }}
    >
      {props.children}
    </div>
  );
}
