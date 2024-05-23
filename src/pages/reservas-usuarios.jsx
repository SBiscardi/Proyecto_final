import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { db } from "../lib/services/firebase"
import { useCallback, useEffect, useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import es from "dayjs/locale/es"
import { Reservation } from "./reservas"
import useUser from "../lib/services/useUser"
import { useNavigation } from "react-router-dom"
dayjs.extend(relativeTime)
dayjs.locale(es)

const getUserEmail = async (userId) => {
  const q = query(collection(db, "usuarios"), where("id", "==", userId))
  const querySnapshot = await getDocs(q)
  const user = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      email: doc.data().email,
    }
  })
  return user[0]?.email
}

const getReservations = async () => {
  const q = query(collection(db, "reservas"))
  const querySnapshot = await getDocs(q)
  const reservations = await Promise.all(querySnapshot.docs.map(async (doc) => {
    const dateTime = doc.data().date_time.toDate()
    const userId = doc.data().userId
    const userEmail = await getUserEmail(userId)
    return {
      id: doc.id,
      dateTime,
      userEmail,
    }
  }))
  return reservations
}

const useGetReservations = () => {
  const [reservations, setReservations] = useState(null)

  const fetchReservations = useCallback(
    async () => {
      const reservations = await getReservations()
      setReservations(reservations)
    },
    [],
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

const ReservasUsuariosPage = () => {
  const user = useUser()
  const navigation = useNavigation()

  const [reservations, refetch] = useGetReservations()
  const deleteReservation = useDeleteReservation(refetch)

  useEffect(() => {
    if (user && user.admin === false) {
      return navigation("/")
    }
  }, [user, navigation])

  return (
    <main className="flex flex-col px-4 items-center" style={{
      minHeight: "calc(100vh - 282px)",
    }}>
      <h1 className="text-center text-2xl text-white font-semibold mt-4">Ultimas reservas</h1>
      <p className="text-center text-white text-opacity-80 mt-2">Aquí puedes ver las reservas que han hecho los usuarios</p>
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
          <Reservation user={reservation.userEmail} key={index} reservation={reservation} onDelete={() => deleteReservation(reservation.id)} />
        ))}
        </ul>
    </main>
  )
}

export default ReservasUsuariosPage