import {
  useQuery
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import defaultData from './defaultData'
import getExercises from '../services/getExercises'
import addExercisesToColumns from './addExercisesToColumns'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../services/firebase'
import useUser from '../services/useUser'

const getUserColumns = async (userId) => {
  try {
    const userColumnsQuery = query(collection(db, "ejercicios_usuarios"), where("userId", "==", userId))
    const userColumnsSnapshot = await getDocs(userColumnsQuery)
    const userColumns = userColumnsSnapshot.docs.map((doc) => doc.data())
    return userColumns[0] || null
  } catch (e) {
    console.error("Error adding document: ", e);
    return null
  }
}

const useCalendar = (search = "") => {
  const user = useUser()

  const [columns, setColumns] = useState(defaultData)
  const {
    data: exercisesData,
    isLoading: exercisesLoading
  } = useQuery({
    queryKey: ["exercises", search],
    queryFn: async () => {
      const exercises = await getExercises(search)
      return exercises
    },
    enabled: user !== undefined,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
  useEffect(() => {
    setColumns((currentColumns) => addExercisesToColumns(currentColumns, exercisesData))
  }, [exercisesData])


  const {
    data: userExercisesData,
    isLoading: userExercisesLoading
  } = useQuery({
    queryKey: ["user_exercises"],
    queryFn: async () => {
      if(user === undefined) return
      const exercises = await getUserColumns(user.id)
      return exercises
    },
    enabled: user !== undefined,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
  useEffect(() => {
    if (userExercisesData) {
      setColumns(userExercisesData.columns)
    }
  }, [userExercisesData])

  const isLoading = exercisesLoading || userExercisesLoading || user === undefined

  const onDragEnd = results => {
    const { destination, source, draggableId, type } = results
    console.log(results)
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(columns.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...columns,
        columnOrder: newColumnOrder
      }
      setColumns(newState)
      return
    }

    const start = columns.columnsData[source.droppableId]
    const finish = columns.columnsData[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)

      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
      const newData = {
        ...columns,

        columnsData: {
          ...columns.columnsData,
          [newColumn.id]: newColumn
        }
      }
      setColumns(newData)
      return
    }

    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...columns,
      columnsData: {
        ...columns.columnsData,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    setColumns(newState)
  }

  return {
    columns,
    onDragEnd,
    isLoading
  }
}

export default useCalendar