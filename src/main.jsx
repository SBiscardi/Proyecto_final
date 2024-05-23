import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Page from './pages/index.jsx';
import Layout from './components/Layout.jsx';
import SignIn from './pages/registrarse.jsx';
import Login from './pages/iniciar-sesion.jsx';
import Calendar from './pages/calendar.jsx';
import ReservaPage from './pages/reservar.jsx';
import ReservasPage from './pages/reservas.jsx';
import ReservasUsuariosPage from './pages/reservas-usuarios.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Page/></Layout>,
  },
  {
    path: "/registrarse",
    element: <Layout><SignIn /></Layout>,
  },
  {
    path: "/iniciar-sesion",
    element: <Layout><Login /></Layout>,
  },
  {
    path: "/calendario",
    element: <Layout><Calendar /></Layout>,
  },
  {
    path: "/reservar",
    element: <Layout><ReservaPage /></Layout>,
  },
  {
    path: "/reservas",
    element: <Layout><ReservasPage /></Layout>,
  },
  {
    path: "/reservas-usuarios",
    element: <Layout><ReservasUsuariosPage /></Layout>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
