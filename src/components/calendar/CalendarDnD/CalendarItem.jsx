import { Draggable } from "react-beautiful-dnd";
import Item from "./Item";

const CalendarItem = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
        <Item
          task={task}
        />
        </div>
      )}
    </Draggable>
  );
}

export default CalendarItem;