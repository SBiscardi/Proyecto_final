import { Droppable } from "react-beautiful-dnd"
import CalendarItem from "./CalendarItem"
import { allTasksId } from "../../../lib/calendar/defaultData"
import Input from "../../Input"
import { Search } from "@mui/icons-material"
import CircularProgress from '@mui/material/CircularProgress';
import useDebouncedCallback from "../../../lib/useDebouncedCallback"

const ItemList = ({ tasks, isLoading, onSearch }) => {
  const debouncedSearch = useDebouncedCallback(onSearch, 500)
  return (
    <div className="mt-8 mb-12">
      <Input
        placeholder="Buscar ejercicios"
        onChange={(e) => {
          debouncedSearch(e.target.value)
        }}
        className="max-w-lg w-full mx-auto -mb-6 z-10"
        icon={
          <Search className="ml-3 text-white mb-2" />
        }
      />
      <Droppable
        droppableId={allTasksId}
        direction="horizontal"
        type="task">
        {provided => (
          <div
            className="flex w-full mx-auto border rounded p-6 pt-16 flex-wrap gap-4 max-w-5xl bg-[#15151666] justify-center overflow-x-hidden max-h-80"
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {isLoading && (
              <CircularProgress
                size={32}
                sx={{
                  margin: "auto"
                }}
              />
            )}
            {!tasks.length && !isLoading && (
              <p className="text-white text-center w-full font-semibold">
                No se encontraron ejercicios
              </p>
            )}
            {tasks.map((task, index) => (
              <CalendarItem
                task={task}
                index={index}
                key={task.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default ItemList