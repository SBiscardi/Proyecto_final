import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ClockIcon, StaticDatePicker } from '@mui/x-date-pickers';
import { esES } from '@mui/x-date-pickers/locales/esES';
import { addDoc, collection, getDocs, query } from "firebase/firestore"
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { db } from '../lib/services/firebase';
import useUser from '../lib/services/useUser';
import { useNavigate } from "react-router-dom";
dayjs.locale('es');

const getReservations = async () => {
  const q = query(collection(db, "reservas"))
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

const createReservation = async (userId, dateTime) => {
  return await addDoc(collection(db, "reservas"), {
    userId,
    date_time: dateTime,
  })
}

const RESERVATION_LIMIT = 3

const ReservaPage = () => {
  const user = useUser()
  const [date, setDate] = useState(null)
  const [hasSelectedTime, setHasSelectedTime] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reservations, setReservations] = useState(null)

  const navigate = useNavigate()

  const createReservationHandler = async () => {
    if (!date) return alert('Selecciona una fecha')
    if (!hasSelectedTime) return alert('Selecciona una hora')
    setLoading(true)
    await createReservation(user.id, date.toDate())
    navigate('/reservas')
  }

  const fetchReservations = useCallback(
    async () => {
      const reservations = await getReservations()
      setReservations(reservations)
    },
    [],
  )
  console.log(">>>", reservations)
  useEffect(() => {
    fetchReservations()
  }, [fetchReservations])
  return (
    <main className="flex flex-col" style={{
      minHeight: "calc(100vh - 282px)",
    }}>
      <h1 className="text-center text-2xl text-white font-semibold mt-4">Reserva</h1>
      <p className="text-center text-white text-opacity-80 mt-2">Reserva tu espacio en el gimnasio</p>
      <section className="m-auto bg-white rounded-lg px-8 py-2 flex min-h-[504px]">
        <div className='max-w-sm flex flex-col gap-4'>
          <h1 className='font-medium text-2xl mt-4'>Gimnasio</h1>
          <span className='font-semibold flex items-center gap-1'><ClockIcon className='text-gray-500' /> 1h </span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in
            sapien nec justo egestas facilisis. Nullam euismod, odio ac
            sollicitudin ultricies, nunc elit ultricies sapien, ac tempus
            libero nunc nec sem
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in
            sapien nec justo egestas facilisis. Nullam euismod, odio ac
            sollicitudin ultricies, nunc elit ultricies sapien, ac tempus
            libero nunc nec sem
          </p>
        </div>
        <div className='flex flex-col'>
          {reservations === null && (
            <div className="m-auto bg-card text-card-foreground shadow-sm relative">
              <div className="p-4 grid gap-2">
                <p className="text-lg font-semibold">
                  Cargando...
                </p>
              </div>
            </div>
          )}
          {reservations && (
            <>
              <div className='flex gap-2'>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='esES'>
                  {reservations && <StaticDatePicker
                    localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
                    ampm
                    value={date}
                    views={['day', 'hours', 'minutes']}
                    autoFocus
                     disablePast
                    shouldDisableDate={(date) => {
                      // if the date has all hours reserved or disabled because it's in the past, disable the date
                      return reservations.filter((r) => dayjs(r.dateTime).isSame(date, 'day')).length >= RESERVATION_LIMIT || date.isBefore(dayjs().startOf('day'))
                    }}
                    onChange={(date) => {
                      setHasSelectedTime(false)
                      setDate(date.startOf('day'))
                    }}
                    slots={{
                      actionBar: () => null
                    }}
                  />}
                  {date && (
                    <ul className='max-h-[320px] w-28 overflow-auto my-auto gap-3 flex flex-col'>
                      {/* hours */}
                      {Array.from({ length: 13 }).map((_, i) => {
                        const time = dayjs(date).startOf('day').hour(i + 9)
                        // is Reserved, if the date has 3 or more reservations, disable the button
                        const isReserved = reservations.filter((r) => dayjs(r.dateTime).isSame(time, 'hour')).length >= RESERVATION_LIMIT

                        const isDisabled = time.isBefore(dayjs()) || isReserved
                        return (
                          <li key={i} className='flex items-center'>
                            <button
                              disabled={isDisabled}
                              onClick={() => {
                                setHasSelectedTime(true)
                                setDate(time)
                              }}
                              className={cn('px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 font-medium transition-colors', {
                                'bg-blue-600 text-white': date.isSame(time, 'hour'),
                                'opacity-50 cursor-not-allowed': isDisabled
                              })}>
                              {time.format('hh:mm A')}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </LocalizationProvider>
              </div>
              <Button variant='contained' className='font-semibold' onClick={createReservationHandler}>
                {loading ? 'Reservando...' : 'Reservar'}
              </Button>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default ReservaPage