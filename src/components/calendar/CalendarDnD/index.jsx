import { DragDropContext } from "react-beautiful-dnd"
import useCalendar from "../../../lib/calendar/useCalendar"
import CalendarColumn from "./CalendarColumn"
import ItemsList from "./ItemsList";
import { allTasksId } from "../../../lib/calendar/defaultData";
import { useMemo, useState } from "react";
import SaveButton from "./SaveButton";

const CalendarDnD = () => {
  const [search, setSearch] = useState("")
  const {
    columns,
    onDragEnd,
    isLoading
  } = useCalendar(search)

  const allTasks = useMemo(() => columns.columnsData[allTasksId].taskIds.map(
    taskId => columns.tasks[taskId]
  ), [columns])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ItemsList tasks={allTasks} isLoading={isLoading} onSearch={setSearch} />
      <SaveButton disabled={isLoading} columns={columns} />
      <div className="flex w-fit max-w-[90vw] mx-auto overflow-x-auto">
        <div
          className="mt-8 mb-12 flex w-full mx-auto">
          {columns.columnOrder.map((columnValue) => {
            const column = columns.columnsData[columnValue]
           if(column.id === allTasksId) return null
            const tasks = column.taskIds.map(
              taskId => columns.tasks[taskId]
            )
            return (
              <CalendarColumn
                column={column}
                key={column.id}
                tasks={tasks}
              />
            )
          })}
        </div>
      </div>
    </DragDropContext>
  )
}

export default CalendarDnD