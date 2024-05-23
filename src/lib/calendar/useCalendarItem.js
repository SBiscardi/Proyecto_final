import { useState } from "react";

const useCalendarItem = ({
  removeCard,
  editCard,
  column,
  task
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = (event) => {
    event.preventDefault();
    const value = event.target[0].value;
    editCard({
      id: task.id,
      content: value
    }, column.id);
    setIsEditing(false);
  };

  const handleDelete = value => {
    removeCard(value, column.id);
  };

  return {
    isEditing,
    handleEdit,
    handleDelete,
    onOpenEdit: () => setIsEditing(true),
    onCloseEdit: () => setIsEditing(false)
  }
}

export default useCalendarItem;