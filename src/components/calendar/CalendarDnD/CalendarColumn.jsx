import { Droppable } from "react-beautiful-dnd";
import CalendarItem from "./CalendarItem";

const CalendarColumn = ({
  column,
  tasks
}) => {
  return (
    <div
      className="min-w-[16rem] w-64 bg-gray-200 rounded-lg mr-4 flex flex-col min-h-80"
    >
      <h2
        className="font-semibold text-xl text-center mx-auto w-full py-2 border-b-2 border-gray-200 text-gray-900"
      >
        {column.title}
      </h2>
      <Droppable droppableId={column.id} type="task">
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <ul className="w-full m-0 p-4 flex flex-col gap-2 min-h-24">
              {tasks.map((task, index) => (
                // task, index, removeCard, column, editCard
                <CalendarItem
                  task={task}
                  index={index}
                  key={task.id}
                  column={column}
                />
              ))}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default CalendarColumn