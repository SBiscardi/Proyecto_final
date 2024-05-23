const getRandomId = () => Math.random().toString(36).substr(2, 9)

const addExercisesToColumns = (columns, exercises = []) => {
  const newColumns = { ...columns }

  const tasks = columns.tasks
  newColumns.columnsData[columns.columnOrder[0]].taskIds = []

  exercises.forEach((exercise) => {
    const taskId = `${exercise.name}-${getRandomId()}`
    tasks[taskId] = { id: taskId, content: exercise }
    newColumns.columnsData[columns.columnOrder[0]].taskIds.push(taskId)
  })
  newColumns.tasks = tasks
  return newColumns
}

export default addExercisesToColumns