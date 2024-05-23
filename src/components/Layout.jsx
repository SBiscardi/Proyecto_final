import Footer from "./Footer"
import Header from "./Header"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import queryClient from "../lib/services/query"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';

const theme = createTheme(
  esES,
);

const Layout = ({ children }) => {
  return (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <Header />
          {children}
          <Footer />
        </QueryClientProvider >
      </ThemeProvider>
  )
}

export default Layout