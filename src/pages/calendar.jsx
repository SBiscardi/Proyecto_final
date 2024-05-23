import CalendarDnD from "../components/calendar/CalendarDnD"
import UserInfo from "../components/calendar/UserInfo"
import useUser from "../lib/services/useUser"
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const user = useUser()
  const navigate = useNavigate()
  if (user === null) {
    return navigate("/iniciar-sesion", { replace: true })
  }

  return (
    <main>
      <UserInfo />
      <CalendarDnD />
    </main>
  )
}

export default Calendar