import { Button, IconButton } from "@mui/material"
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { Link } from "react-router-dom"
import { db } from "../lib/services/firebase"
import useUser from "../lib/services/useUser"
import { useCallback, useEffect, useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import es from "dayjs/locale/es"
dayjs.extend(relativeTime)
dayjs.locale(es)
export const Reservation = ({ user, reservation: { dateTime }, onDelete }) => {
  return (
    <li className="min-w-[430px] rounded-lg border bg-card text-card-foreground shadow-sm relative">
      <div className="p-4 grid gap-2">
        <p className="text-sm font-medium">{dayjs().to(dateTime)}</p>
        <p className="text-lg font-semibold">
          {dayjs(dateTime).format("dddd, D [de] MMMM [a las] hh:mm A")}
        </p>
        <p className="text-sm text-gray-500">
          {user} - Gimnasio
        </p>
      </div>
      <IconButton className="!absolute right-2 top-2" onClick={onDelete}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </IconButton>
    </li>
  )
}

const getReservationsByUser = async (userId) => {
  const q = query(collection(db, "reservas"), where("userId", "==", userId))
  const querySnapshot = await getDocs(q)
  const reservations = querySnapshot.docs.map((doc) => {
    const dateTime = doc.data().date_time.toDate()
    return {
      id: doc.id,
      dateTime,
    }
  })
  return reservations
}

const useGetReservations = (user) => {
  const [reservations, setReservations] = useState(null)

  const fetchReservations = useCallback(
    async () => {
      if(!user.id) return
      const reservations = await getReservationsByUser(user.id)
      setReservations(reservations)
    },
    [user.id],
  )

  useEffect(() => {
    fetchReservations()
  }, [fetchReservations])
  return [reservations, fetchReservations]
}

const useDeleteReservation = (onSuccess) => {
  const deleteReservation = async (id) => {
    try {
      await deleteDoc(doc(db, "reservas", id))
      onSuccess()
    } catch (e) {
      console.error("Error deleting document: ", e)
    }
  }
  return deleteReservation
}

const ReservasPage = () => {
  const user = useUser()
  const [reservations, refetch] = useGetReservations(user || {})
  const deleteReservation = useDeleteReservation(refetch)
  return (
    <main className="flex flex-col px-4 items-center" style={{
      minHeight: "calc(100vh - 282px)",
    }}>
      <h1 className="text-center text-2xl text-white font-semibold mt-4">Tus reservas</h1>
      <p className="text-center text-white text-opacity-80 mt-2">Aquí puedes ver todas tus reservas</p>
      <Button LinkComponent={Link} to="/reservar" variant="contained" className="mx-auto !my-4 w-fit" style={{
        fontWeight: 600,
      }}>
        Hacer una reserva
      </Button>
      <ul className="grid grid-cols-1 gap-6 bg-white max-w-screen-2xl mx-auto my-4 px-16 py-12 rounded-md">
        {reservations === null && (
          <li className="min-w-[430px] rounded-lg border bg-card text-card-foreground shadow-sm relative">
            <div className="p-4 grid gap-2">
              <p className="text-lg font-semibold">
                Cargando...
              </p>
            </div>
          </li>
        )}
        {reservations && reservations.length === 0 && (
          <li className="min-w-[430px] rounded-lg border bg-card text-card-foreground shadow-sm relative">
            <div className="p-4 grid gap-2">
              <p className="text-lg font-semibold">
                No tienes reservas
              </p>
            </div>
          </li>
        )}
        {reservations && reservations.map((reservation, index) => (
            <Reservation user={user.email} key={index} reservation={reservation} onDelete={() => deleteReservation(reservation.id)} />
        ))}
        </ul>
    </main>
  )
}

export default ReservasPage