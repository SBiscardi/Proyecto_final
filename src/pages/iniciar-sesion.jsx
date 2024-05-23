import Button from "@mui/material/Button"
import Input from "../components/Input"
import { Link } from "react-router-dom"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useSignIn from "../lib/services/useSignIn"
import CircularProgress from '@mui/material/CircularProgress';

const signInSchema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})
const Login = () => {
  const { isLoading, signIn } = useSignIn()

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(signInSchema),
    })

    const onSubmit = (data) => {
      if (isLoading) return
      signIn(data)
    }

  return (
    <main className="flex" style={{
      minHeight: "calc(100vh - 282px)",
    }}>
      <section className="container flex items-center justify-center px-6 m-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-center mt-6">
           <Link to="/iniciar-sesion" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
              Iniciar sesión
            </Link>

           <Link to="/registrarse"  className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
              Registrarse
            </Link>
          </div>

          <Input
            {...register("email")}
            error={errors.username?.message}
            placeholder="Correo electrónico"
            type="email"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />

          <Input
            {...register("password")}
            error={errors.password?.message}
            type="password"
            placeholder="Contraseña"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />

          <div className="mt-6">
            <Button
              type="submit"
              style={{
              fontWeight: 600
            }} variant="contained" className="w-full font-medium tracking-wide text-white capitalize">
              Iniciar sesión
              {isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Button>

            <div className="mt-6 text-center ">
              <Link to="/registrarse" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                ¿No tienes una cuenta? Regístrate
              </Link>
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Login