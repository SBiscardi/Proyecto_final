import Button from "@mui/material/Button"
import { Link, } from "react-router-dom"
import useUser from "../lib/services/useUser"
import useSignOut from "../lib/services/useSignOut"
import { ButtonGroup } from "@mui/material"

const Header = () => {
  const user = useUser()
  const signOut = useSignOut()
  const isCalendarPage = window.location.pathname === "/calendario"
  return (
    <header className="py-6 px-12 shadow-lg w-full flex justify-center h-[102px]">
      <div className="flex items-center justify-between w-full max-w-7xl">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Logo gym"
            width={150}
            height={55}
          />
        </Link>
        {!isCalendarPage && user && (
          <div className="flex gap-4 items-center text-white font-semibold text-lg">
            {user.photo && <img
              src={user.photo}
              alt={user.username}
              width={40}
              height={40}
              className="rounded-full"
            />}
            <span className="overflow-hidden text-nowrap text-ellipsis max-w-96">{user.username}</span>
          </div>
        )}
        <div className="flex text-white font-semibold text-lg gap-12 items-center">
          {user ? (
            <>
              <button onClick={signOut} className="cursor-pointer">
                Cerrar sesión
              </button>
              <ButtonGroup variant="contained">
                <Button LinkComponent={Link} variant="contained" to="/calendario" style={{
                  fontWeight: 600,
                }}>
                  Mi rutina
                </Button>
                <Button LinkComponent={Link} variant="contained" to="/reservas" style={{
                  fontWeight: 600,
                }}>
                  Mis reservas
                </Button>
                {user.admin && <Button LinkComponent={Link} variant="contained" to="/reservas-usuarios" style={{
                  fontWeight: 600,
                }}>
                  Reservas de usuarios
                </Button>}
              </ButtonGroup>
            </>
          ) : (<><Link to="/iniciar-sesion">
            Iniciar sesión
          </Link>
            <Button LinkComponent={Link} variant="contained" to="/registrarse" style={{
              fontWeight: 600,
            }}>
              Regístrate
            </Button></>)}
        </div>
      </div>
    </header>
  )
}

export default Header